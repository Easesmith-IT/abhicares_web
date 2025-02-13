import { useEffect, useState } from 'react';
import classes from './AssignedPartnerModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import Loader from '../loader/Loader';

import usePatchApiReq from '../../hooks/usePatchApiReq';

import useGetApiReq from '../../hooks/useGetApiReq';


const AssignedPartnerModal = ({ setIsModalOpen, serviceId = "", bookingId, getBooking }) => {
    const [allSeller, setAllSeller] = useState([]);
    const { res: getSellerListRes, fetchData: getSellerList, isLoading } = useGetApiReq();

    const { checkAuthorization } = useAuthorization();

    const getAllSeller = async () => {
        getSellerList(`/admin/get-seller-list/${serviceId}`)
    }

    useEffect(() => {
        getAllSeller()
    }, [])

    useEffect(() => {
        if (getSellerListRes?.status === 200 || getSellerListRes?.status === 201) {
            setAllSeller(getSellerListRes?.data.data)
        }
    }, [getSellerListRes])

    const { res: assignPartnerRes, fetchData: assignPartnerFetchData } = usePatchApiReq()

    const handleAssign = async (sellerId) => {
        await assignPartnerFetchData(`/admin/allot-seller-order/${sellerId}`, {bookingId })

    }

    useEffect(() => {
        if (assignPartnerRes?.status === 200 || assignPartnerRes?.status === 201) {
            console.log("assignPartnerRes", assignPartnerRes);
            toast.success("Order assigned to seller successfully");
            getBooking()
            setIsModalOpen(false);
        }
    }, [assignPartnerRes])
    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Assigne Partner</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <div className={classes.partner_container}>
                    {!isLoading && allSeller.length === 0 &&
                        <p>No seller found for selected service.</p>
                    }

                    {isLoading
                        && allSeller.length === 0
                        && <Loader />
                    }
                    {allSeller && allSeller.map((seller) => (
                        <div className={classes.partner}>
                            <div className={classes.partner_left}>
                                <p>Seller Name: {seller.name}</p>
                                <p>Seller Phone: {seller.phone}</p>
                                <button onClick={() => handleAssign(seller._id)} className={classes.button}>Assign</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AssignedPartnerModal