import { useEffect, useState } from 'react';
import classes from './UpdateReferEarnModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';

const UpdateReferEarnModal = ({ setIsModalOpen, subAdmin }) => {
   const [amount, setAmount] = useState("");

    const { checkAuthorization } = useAuthorization();

    const referAndEarnData =async ()=>{
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-refer-and-earn-amount`, { withCredentials: true })
            console.log('amount',data)
            setAmount(data?.doc?.amount);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      referAndEarnData();
    }, [])
    

    const handleOnChange = async (e) => {
        const { name, value } = e.target;
        setAmount(value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!amount) {
            return;
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_ADMIN_API_URL}/update-refer-and-earn-amount`, { amount }, { withCredentials: true });
            console.log("update refer and earn", res);
            if (res.status === 201) {
                toast.success(res?.data.message);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            setIsModalOpen(false);
            checkAuthorization(error);
        }
    }



    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Update Refer and Earn</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="amount">Amount</label>
                        <input className={classes.input} onChange={handleOnChange} value={amount} type="number" name="amount" id="amount" placeholder="enter amount" />
                    </div>
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateReferEarnModal