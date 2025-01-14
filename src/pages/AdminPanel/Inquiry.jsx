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
import { FaSearch } from 'react-icons/fa';

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
            const { data } = await axios.delete(`${import.meta.env.VITE_APP_ADMIN_API_URL}/delete-enquiry/${enquiryId}`, { withCredentials: true });
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
            const { data } = await axios.get(`${import.meta.env.VITE_APP_ADMIN_API_URL}/get-all-enquiry`, { withCredentials: true });
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


    const handleSerach = async (e) => {
        const value = e.target.value;

        console.log("value", value);

        if (!value) {
            getAllInquiries();
            return;
        }

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_ADMIN_API_URL}/search-enquiries?query=${value}`, { withCredentials: true });
            console.log("search", data);
            setAllInquiries(data.data);
        } catch (error) {
            console.log(error);
        }
    }


    function debounce(fx, time) {
        let id = null;
        return function (data) {
            if (id) {
                clearTimeout(id);
            }
            id = setTimeout(() => {
                fx(data);
                // id = null;
            }, time);
        };
    }

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Enquiries</h1>
                        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                            <div className="d-flex" style={{ position: "relative" }}>
                                <FaSearch
                                    onClick={() => { }}
                                    style={{
                                        position: "absolute",
                                        left: "8px",
                                        top: "10px",
                                        cursor: "pointer",
                                    }}
                                />
                                <input
                                    onChange={debounce(handleSerach, 1000)}
                                    style={{
                                        width: "400px",
                                        padding: "5px 10px",
                                        paddingLeft: "30px",
                                        borderRadius: "5px",
                                    }}
                                    type="search"
                                    placeholder="search enquiry by name, phone and city"
                                />
                            </div>
                        </div>
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