import { useEffect, useState } from 'react';
import classes from './UpdateReferEarnModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import usePostApiReq from '../../hooks/usePostApiReq';
import useGetApiReq from '../../hooks/useGetApiReq';

const UpdateReferEarnModal = ({ setIsModalOpen, subAdmin }) => {
    const { res: updateReferAmountRes, fetchData: updateReferAmount, isLoading: updateReferAmountLoading } = usePostApiReq();
    const { res: getReferAmountRes, fetchData: getReferAmount, isLoading: getReferAmountLoading } = useGetApiReq();
    const [amount, setAmount] = useState("");


    const referAndEarnData = async () => {
        getReferAmount(`/admin/get-refer-and-earn-amount`)
    }

    useEffect(() => {
        referAndEarnData();
    }, [])

    useEffect(() => {
        if (getReferAmountRes?.status === 200 || getReferAmountRes?.status === 201) {
            setAmount(getReferAmountRes?.data?.doc[0]?.amount);
        }
    }, [getReferAmountRes])

    const handleOnChange = async (e) => {
        const { name, value } = e.target;
        setAmount(value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!amount) {
            return;
        }
        updateReferAmount("/admin/update-refer-and-earn-amount", { amount });
    }

    useEffect(() => {
        if (updateReferAmountRes?.status === 200 || updateReferAmountRes?.status === 201) {
            toast.success(updateReferAmountRes?.data.message);
            setIsModalOpen(false);
        }
    }, [updateReferAmountRes])


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
                        <button className={classes.button}>{updateReferAmountLoading ? "Loading..." : "Update"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateReferEarnModal