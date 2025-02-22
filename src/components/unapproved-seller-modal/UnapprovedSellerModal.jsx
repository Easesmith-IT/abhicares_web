import unapprovedSellerModalClasses from './UnapprovedSellerModal.module.css';
import classes from '../../pages/AdminPanel/Shared.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import Loader from '../loader/Loader';
import usePatchApiReq from '../../hooks/usePatchApiReq';
import useGetApiReq from '../../hooks/useGetApiReq';
import { FaTrash } from 'react-icons/fa';
import DeleteModal from '../deleteModal/DeleteModal';
import usePostApiReq from '../../hooks/usePostApiReq';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const UnapprovedSellerModal = ({ setIsUnapprovedSellerModalOpen, getSellers }) => {
    const { res: getInReviewSellerRes, fetchData: getInReviewSeller, isLoading } = useGetApiReq();
    const { res, fetchData, isLoading: isLoading2 } = usePostApiReq();
    const [allSellers, setAllSellers] = useState([]);
    const [isUnapprovedSellerDeleteModalOpen, setIsUnapprovedSellerDeleteModalOpen] = useState(false);
    const [sellerId, setSellerId] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);

    const handlePageClick = async (page) => {
        setPage(page);
    };

    const handleDeleteModal = (id) => {
        setIsUnapprovedSellerDeleteModalOpen(true)
        setSellerId(id)
    }

    const handleDelete = () => {
        console.log("handleDelete function called");
        fetchData(`/admin/delete-seller/${sellerId}`)
    }

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            setIsUnapprovedSellerDeleteModalOpen(false);
            getAllSellers();
        }
    }, [res])

    const getAllSellers = async () => {
        getInReviewSeller(`/admin/in-review-seller?page=${page}`)
    };

    useEffect(() => {
        if (getInReviewSellerRes?.status === 200 || getInReviewSellerRes?.status === 201) {
            console.log("getInReviewSellerRes", getInReviewSellerRes);
            setPageCount(getInReviewSellerRes?.data?.pagination?.totalPages);
            setAllSellers(getInReviewSellerRes?.data.data);
        }
    }, [getInReviewSellerRes])

    const { res: unapprovedSellerRes, fetchData: unapprovedSellerFetchData } = usePatchApiReq()

    const handleOnChange = async (id) => {
        await unapprovedSellerFetchData(`/admin/update-seller-status/${id}`, { status: "APPROVED" })

    }

    useEffect(() => {
        getAllSellers();
    }, [page])

    useEffect(() => {
        if (unapprovedSellerRes?.status === 200 || unapprovedSellerRes?.status === 201) {
            console.log("unapprovedSellerRes", unapprovedSellerRes);
            toast.success("Seller approved");
            getAllSellers();
            getSellers();
        }
    }, [unapprovedSellerRes])
    return (
        <div className={unapprovedSellerModalClasses.wrapper}>
            <div className={unapprovedSellerModalClasses.modal}>
                <div className={unapprovedSellerModalClasses.heading_container}>
                    <h4>Unapproved Partners</h4>
                    <div className={unapprovedSellerModalClasses.d_flex}>
                        <RxCross2 onClick={() => setIsUnapprovedSellerModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <div className={unapprovedSellerModalClasses["report-body"]}>
                    <div className={unapprovedSellerModalClasses["report-topic-heading"]}>
                        <h3 className={classes["t-op"]} style={{ width: "150px" }}>Partner Name</h3>
                        <h3 className={classes["t-op"]} style={{ width: "200px" }}>Service</h3>
                        <h3 className={classes["t-op"]} style={{ width: "150px" }}>Category</h3>
                        <h3 className={classes["t-op"]} style={{ width: "150px" }}>Phone</h3>
                        <h3 className={classes["t-op"]} style={{ width: "150px" }}>Approve</h3>
                    </div>

                    {isLoading
                        && <Loader />
                    }
                    <div className={classes.items}>
                        {!isLoading && allSellers.length === 0 &&
                            <p>No unapproved Partner found.</p>
                        }

                        {allSellers?.map((seller) => (
                            <div key={seller._id} className={unapprovedSellerModalClasses.item1}>
                                <h3 className={classes["t-op-nextlvl"]} style={{ width: "150px" }}>{seller.name}</h3>
                                <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "200px" }}>{seller.services.map((service) => service.name).join(", ")}</h3>
                                <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "150px" }}>{seller.category}</h3>
                                <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "150px" }}>{seller.phone}</h3>
                                <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "150px" }}>
                                    {seller.status === "IN-REVIEW" ?
                                        <>
                                            <button onClick={() => handleOnChange(seller._id)} className={unapprovedSellerModalClasses.button}>Approve</button>
                                            <FaTrash onClick={() => handleDeleteModal(seller._id)} style={{ marginLeft: "10px", cursor: "pointer" }} size={22} color='red' />
                                        </>
                                        : <p>Approved</p>
                                    }
                                </h3>
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
            </div>

            {isUnapprovedSellerDeleteModalOpen &&
                <DeleteModal
                    handleDelete={handleDelete}
                    setState={setIsUnapprovedSellerDeleteModalOpen}
                />
            }
        </div>
    )
}

export default UnapprovedSellerModal