import React from 'react'
import { useEffect, useState } from 'react';
import classes from './UpdateComisionModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../../hooks/useAuthorization';
import usePostApiReq from '../../../hooks/usePostApiReq';

const UpdateComisionModal = ({ setIsModalOpen, commission = "", getAllCategories }) => {
    const { res: updateCategoryDataRes, fetchData: updateCategoryData, isLoading: updateCategoryDataLoading } = usePostApiReq();
    const { checkAuthorization } = useAuthorization();
    const [isLoading, setIsLoading] = useState(false);
    const [commissionInfo, setCommissionInfo] = useState({
        comissionRate: commission?.commission || "",
        convienceAmount: commission?.convenience || "",
    });

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setCommissionInfo({ ...commissionInfo, [name]: value });
    }

    useEffect(() => {
        setCommissionInfo({
            comissionRate: commission?.commission,
            convienceAmount: commission?.convenience
        })
    }, [commission])


    console.log("commissionInfo", commissionInfo);
    console.log("commission", commission);


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const { comissionRate, convienceAmount } = commissionInfo;

        const isMissing =
            !comissionRate ||
            !convienceAmount

        if (isMissing) {
            toast.error("All fields are required");
            return;
        }

        updateCategoryData("/admin/update-category-data", {
            categoryId: commission?._id,
            commission: commissionInfo.comissionRate,
            convenience: commissionInfo.convienceAmount
        })
    }

    useEffect(() => {
        if (updateCategoryDataRes?.status === 200 || updateCategoryDataRes?.status === 201) {
            toast.success("Updated successfully");
            getAllCategories();
            setIsModalOpen(false);
        }
    }, [updateCategoryDataRes])

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Update Comision</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="comissionRate">Comission Rate (%)</label>
                        <input className={classes.input} onChange={handleOnChange} value={commissionInfo.comissionRate} type="number" name="comissionRate" id="comissionRate" />
                    </div>

                    <div className={classes.input_container}>
                        <label htmlFor="convienceAmount">Convience Amount</label>
                        <input className={classes.input} onChange={handleOnChange} value={commissionInfo.convienceAmount} type="number" name="convienceAmount" id="convienceAmount" />
                    </div>

                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{updateCategoryDataLoading?"Loading...":"Update"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateComisionModal