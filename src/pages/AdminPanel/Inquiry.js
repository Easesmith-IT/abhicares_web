import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import classes from "../AdminPanel/Shared.module.css";
import axios from 'axios';
import toast from 'react-hot-toast';


import DeleteModal from '../../components/deleteModal/DeleteModal';
import Loader from '../../components/loader/Loader';

import { MdDelete } from 'react-icons/md';
import Wrapper from '../Wrapper';
import useAuthorization from '../../hooks/useAuthorization';

const Enquiry = () => {
    const { checkAuthorization } = useAuthorization();
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [allInquiries, setAllInquiries] = useState([]);
    const [enquiryId, setEnquiryId] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const handleDeleteModal = (e, id) => {
        e.stopPropagation();
        setEnquiryId(id);
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };



    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_ADMIN_API_URL}/delete-enquiry/${enquiryId}`, { withCredentials: true });
            console.log(data);
            toast.success("Enquiry deleted successfully");
            getAllInquiries();
            setIsDeleteModalOpen(!isDeleteModalOpen);
        } catch (error) {
            console.log(error);
            setIsDeleteModalOpen(false);
            checkAuthorization(error);
        }
    };

    const getAllInquiries = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-all-enquiry`, { withCredentials: true });
            console.log(data);
            setAllInquiries(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllInquiries()
    }, [])


    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Enquiries</h1>
                    </div>

                    <div className={classes["report-body"]}>
                        <div className={classes.enquiries}>
                            <h3 className={classes["t-op"]}>Name</h3>
                            <h3 className={classes["t-op"]}>Phone</h3>
                            <h3 className={classes["t-op"]}>City</h3>
                            <h3 className={classes["t-op"]}>State</h3>
                            <h3 className={classes["t-op"]}>Service Type</h3>
                            <h3 className={classes["t-op"]}>Delete</h3>
                        </div>

                        <div className={classes.items}>
                            {!isLoading
                                && allInquiries.length === 0
                                && <p>No inquiries found</p>
                            }

                            {isLoading
                                && allInquiries.length === 0
                                && <Loader />
                            }
                            {allInquiries?.map((inquiry) => (
                                <div key={inquiry._id} className={classes.enquiries}>
                                    <h3 className={classes["t-op-nextlvl"]}>{inquiry.name}</h3>
                                    <h3 className={classes["t-op-nextlvl"]}>{inquiry.phone}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{inquiry.city}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{inquiry.state}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{inquiry.serviceType}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>
                                        <MdDelete onClick={(e) => handleDeleteModal(e, inquiry._id)} cursor={"pointer"} size={22} color='red' />
                                    </h3>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </Wrapper >

            {isDeleteModalOpen &&
                <DeleteModal
                    setState={setIsDeleteModalOpen}
                    handleDelete={handleDelete}
                />
            }
        </>
    )
}

export default Enquiry