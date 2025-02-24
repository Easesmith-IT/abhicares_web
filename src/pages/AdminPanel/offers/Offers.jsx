import axios from 'axios'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import classes from '../Shared.module.css'
import offersClasses from './Offers.module.css'

import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

import AddBtn from "../../../assets/add-icon-nobg.png"
import AddOfferModal from '../../../components/add-offer-modal/AddOfferModal'
import DeleteModal from '../../../components/deleteModal/DeleteModal'
import Loader from '../../../components/loader/Loader'
import useDeleteApiReq from '../../../hooks/useDeleteApiReq'
import useGetApiReq from '../../../hooks/useGetApiReq'
import Wrapper from '../../Wrapper'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import { format } from 'date-fns'

const Offers = () => {
    const { res: deleteCouponRes, fetchData: deleteCoupon, isLoading: deleteCouponLoading } = useDeleteApiReq();
    const { res: getCouponsRes, fetchData: getCoupons, isLoading } = useGetApiReq();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [offer, setOffer] = useState({});
    const [allOffers, setAllOffers] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);

    const handlePageClick = async (page) => {
        setPage(page);
    };

    const [filterdResults, setFilterdResults] = useState([]);
    // const [status, setStatus] = useState("all")

    const [statusFilter, setStatusFilter] = useState("all");


    useEffect(() => {
        const filteredCoupons = allOffers.filter((coupon) => coupon.status === statusFilter);
        setFilterdResults(statusFilter === "all" ? allOffers : filteredCoupons);
    }, [statusFilter, allOffers])


    console.log("filteredCoupons", filterdResults);



    const getAllOffers = async () => {
        getCoupons(`/admin/get-coupons?page=${page}`)
    };
    useEffect(() => {
        getAllOffers();
    }, [page])

    useEffect(() => {
        if (getCouponsRes?.status === 200 || getCouponsRes?.status === 201) {
            console.log("getCouponsRes", getCouponsRes);
            setPageCount(getCouponsRes?.data?.pagination?.totalPages);
            setAllOffers(getCouponsRes?.data.data);
        }
    }, [getCouponsRes])

    const handleUpdateModal = (city) => {
        setOffer(city);
        setIsUpdateModalOpen(!isDeleteModalOpen);
    };

    const handleDeleteModal = (id) => {
        setOffer(id);
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleDelete = async () => {
        deleteCoupon(`/admin/delete-coupon/${offer}`)
    };

    useEffect(() => {
        if (deleteCouponRes?.status === 200 || deleteCouponRes?.status === 201) {
            toast.success("Offer deleted successfully");
            getAllOffers();
            setIsDeleteModalOpen(!isDeleteModalOpen);
        }
    }, [deleteCouponRes])

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Offers</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <select className={classes.input} onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                                {/* <option value="">Select Staus</option> */}
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button onClick={() => setIsModalOpen(true)} className={classes.services_add_btn}>
                                <img src={AddBtn} alt="add" />
                            </button>
                        </div>
                    </div>

                    {isLoading
                        && <Loader />
                    }
                    <div className={offersClasses.container}>
                        {!isLoading
                            && filterdResults?.length === 0
                            && <p>No offers found</p>
                        }


                        {filterdResults?.map((offer) => (
                            <div key={offer._id} className={offersClasses.city}>
                                <div className={offersClasses.city_left}>
                                    <h5>{offer.name}</h5>
                                    <div className={offersClasses.d_flex}>
                                        {/* <p>{format(new Date(offer.date), "dd-MM-yyyy")}</p> */}
                                        {offer?.discountType === "fixed" ?
                                            <p>₹{offer.couponFixedValue}</p>
                                            : <p>{offer.offPercentage}%</p>}
                                        <p className={`${classes.status} ${offer.status === "active" ? classes.active : classes.inactive}`}>{offer.status}</p>
                                    </div>
                                    <p><b>Type:</b> {offer?.discountType}</p>
                                    <p><b>Expiry Date:</b> {offer?.expiryDate && format(new Date(offer?.expiryDate),"dd-MM-yyyy")}</p>
                                    <p className={offersClasses.p}>{parse(offer.description)}</p>
                                </div>
                                <div className={offersClasses.city_right}>
                                    <FiEdit onClick={() => handleUpdateModal(offer)} cursor={"pointer"} size={20} />
                                    <MdDelete onClick={() => handleDeleteModal(offer._id)} cursor={"pointer"} size={22} color='red' />
                                </div>
                            </div>
                        ))}

                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <PaginationControl
                            changePage={handlePageClick}
                            limit={10}
                            page={page}
                            total={pageCount + "0"}
                        />
                    </div>
                </div>
            </Wrapper>
            {isModalOpen &&
                <AddOfferModal
                    setIsModalOpen={setIsModalOpen}
                    getAllOffers={getAllOffers}
                />
            }

            {isUpdateModalOpen &&
                <AddOfferModal
                    setIsModalOpen={setIsUpdateModalOpen}
                    getAllOffers={getAllOffers}
                    offer={offer}
                />
            }

            {isDeleteModalOpen &&
                <DeleteModal
                    handleDelete={handleDelete}
                    setState={setIsDeleteModalOpen}
                />
            }
        </>
    )
}

export default Offers