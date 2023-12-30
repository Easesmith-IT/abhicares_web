import { useEffect, useState } from 'react';
import classes from './AssignedPartnerModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const AssignedPartnerModal = ({ setIsModalOpen, serviceId = "",bookingId }) => {
    const [allSeller, setAllSeller] = useState([]);

    const navigate = useNavigate()
    const token = localStorage.getItem("adUx")

    const getAllSeller = async () => {
        try {
            if (!token) {
                navigate('/admin/login');
                return;
            }
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-seller-list/${serviceId}`, { headers });
            setAllSeller()
            console.log("seller to assign",data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllSeller()
    }, [])

    const headers = {
        Authorization: token
    }

    const handleAssign = async (sellerId) => {
        try {
            if (!token) {
                navigate('/admin/login');
                return;
            }
            const { data } = await axios.post(`${process.env.REACT_APP_ADMIN_API_URL}/allot-seller-order/${sellerId}`, { bookingId }, { headers });
            console.log(data);
            toast.success("Order assigned to seller successfully");
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (!token) {
        navigate('/admin/login');
        return;
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
                    <div className={classes.partner}>
                        <div className={classes.partner_left}>
                            <p>Seller Name: name</p>
                            <p>Seller Phone: phone</p>
                            <button onClick={()=>handleAssign()} className={classes.button}>Assign</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignedPartnerModal