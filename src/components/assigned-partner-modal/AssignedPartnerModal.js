import { useEffect, useState } from 'react';
import classes from './AssignedPartnerModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const AssignedPartnerModal = ({ setIsModalOpen, serviceId = "", bookingId, getBooking }) => {
    const [allSeller, setAllSeller] = useState([]);

    const navigate = useNavigate()

    const getAllSeller = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-seller-list/${serviceId}`, { withCredentials: true });
            setAllSeller(data.data)
            console.log("seller to assign", data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllSeller()
    }, [])


    const handleAssign = async (sellerId) => {
        try {
            const { data } = await axios.patch(`${process.env.REACT_APP_ADMIN_API_URL}/allot-seller-order/${sellerId}`, { bookingId }, { withCredentials: true });
            console.log(data);
            toast.success("Order assigned to seller successfully");
            getBooking()
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    }


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