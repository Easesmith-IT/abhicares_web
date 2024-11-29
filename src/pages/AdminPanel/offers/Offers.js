import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import classes from '../Shared.module.css'
import parse from 'html-react-parser'
import offersClasses from './Offers.module.css'
import toast from 'react-hot-toast'
import axios from 'axios'

import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

import AddBtn from "../../../assets/add-icon-nobg.png";
import Loader from '../../../components/loader/Loader'
import Wrapper from '../../Wrapper'
import DeleteModal from '../../../components/deleteModal/DeleteModal'
import AddOfferModal from '../../../components/add-offer-modal/AddOfferModal'
import useAuthorization from '../../../hooks/useAuthorization'

const Offers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [offer, setOffer] = useState({});
    const [allOffers, setAllOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { checkAuthorization } = useAuthorization();

    const [filterdResults, setFilterdResults] = useState([]);
    // const [status, setStatus] = useState("all")

    const [statusFilter, setStatusFilter] = useState("all");


    useEffect(() => {
        const filteredCoupons = allOffers.filter((coupon) => coupon.status === statusFilter);
        setFilterdResults(statusFilter === "all" ? allOffers : filteredCoupons);
    }, [statusFilter,allOffers])


    console.log("filteredCoupons", filterdResults);



    const getAllOffers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-coupons`, { withCredentials: true });
            console.log(data);
            setAllOffers(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getAllOffers();
    }, [])


    const handleUpdateModal = (city) => {
        setOffer(city);
        setIsUpdateModalOpen(!isDeleteModalOpen);
    };

    const handleDeleteModal = (id) => {
        setOffer(id);
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_ADMIN_API_URL}/delete-coupon/${offer}`, { withCredentials: true });
            toast.success("Offer deleted successfully");
            getAllOffers();
            setIsDeleteModalOpen(!isDeleteModalOpen);
        } catch (error) {
            console.log(error);
            setIsDeleteModalOpen(false);
            checkAuthorization(error);
        }
    };

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Offers</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <select className={classes.input} onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                                <option value="">Select Staus</option>
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button onClick={() => setIsModalOpen(true)} className={classes.services_add_btn}>
                                <img src={AddBtn} alt="add" />
                            </button>
                        </div>
                    </div>

                    <div className={offersClasses.container}>
                        {!isLoading
                            && filterdResults?.length === 0
                            && <p>No offers found</p>
                        }

                        {isLoading
                            && filterdResults?.length === 0
                            && <Loader />
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
                                    <p className={offersClasses.p}>{parse(offer.description)}</p>
                                </div>
                                <div className={offersClasses.city_right}>
                                    <FiEdit onClick={() => handleUpdateModal(offer)} cursor={"pointer"} size={20} />
                                    <MdDelete onClick={() => handleDeleteModal(offer._id)} cursor={"pointer"} size={22} color='red' />
                                </div>
                            </div>
                        ))}

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