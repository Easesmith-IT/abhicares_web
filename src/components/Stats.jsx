import React, { useEffect, useState } from 'react'
import classes from "../pages/AdminPanel/Shared.module.css";
import useGetApiReq from '../hooks/useGetApiReq';
import { HiStatusOnline } from "react-icons/hi";
import { TbTargetArrow } from "react-icons/tb";

const Stats = ({ setAllSellers }) => {
    const { res, fetchData, isLoading } = useGetApiReq();
    const { res: getOnlinePartnersRes, fetchData: getOnlinePartners, isLoading: getOnlinePartnersLoading } = useGetApiReq();
    const [onlinePartners, setOnlinePartners] = useState(0);
    const [fulfillingSellers, setFulfillingSellers] = useState(0);

    const getOnlineSellers = () => {
        getOnlinePartners("/admin/get-online-seller")
    }

    const getFulfillingPartners = () => {
        fetchData("/admin/get-current-fullfiling-seller")
    }

    useEffect(() => {
        getOnlineSellers();
    }, [])

    useEffect(() => {
        getFulfillingPartners();
    }, [])

    useEffect(() => {
        if (getOnlinePartnersRes?.status === 200 || getOnlinePartnersRes?.status === 201) {
            console.log("getOnlinePartnersRes", getOnlinePartnersRes);
            setOnlinePartners(getOnlinePartnersRes?.data?.pagination?.count)
        }
    }, [getOnlinePartnersRes])

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("res", res);
            setFulfillingSellers(res?.data?.pagination?.count)
        }
    }, [res])


    return (
        <div className={classes.main}>
            <div className={classes["box-container"]}>
                <div onClick={() => setAllSellers(getOnlinePartnersRes?.data?.onlineSellers)} className={`${classes.box} ${classes.box1}`}>
                    <div className={classes.text}>
                        <h2 className={classes["topic-heading"]}>{onlinePartners}</h2>
                        <h2 className={classes.topic}>Online Partners</h2>
                    </div>
                    <HiStatusOnline color='white' size={50} />
                </div>
                <div onClick={() => setAllSellers(res?.data?.fulfillingSellers)} className={`${classes.box} ${classes.box1}`}>
                    <div className={classes.text}>
                        <h2 className={classes["topic-heading"]}>{fulfillingSellers}</h2>
                        <h2 className={classes.topic}>Fulfilling Sellers</h2>
                    </div>
                    <TbTargetArrow color='white' size={50} />
                </div>
            </div>
        </div>
    )
}

export default Stats