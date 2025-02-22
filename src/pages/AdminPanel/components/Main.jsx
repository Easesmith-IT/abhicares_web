import React, { useEffect, useState } from "react";
import TotalOrdersIcn from "../../../assets/admin-panel/total-orders-icon.png";
import PendingOrdersIcn from "../../../assets/admin-panel/pending-orders.png";
import CancelledOrdersIcn from "../../../assets/admin-panel/cancelled-orders.png";

import classes from "../Shared.module.css";
import axios from "axios";
import useGetApiReq from "../../../hooks/useGetApiReq";

const Shared = () => {
  const { res: getOrderCountByStatusRes, fetchData: getOrderCountByStatus, isLoading: getOrderCountByStatusLoading } = useGetApiReq();
  const [orderCount, setOrderCount] = useState({
    completed: 0,
    cancelled: 0,
    pending: 0,
    total: 0,
  });

  const getOrderCount = async () => {
    getOrderCountByStatus("/admin/get-order-count-by-status")
  }

  useEffect(() => {
    getOrderCount();
  }, [])

  useEffect(() => {
    if (getOrderCountByStatusRes?.status === 200 || getOrderCountByStatusRes?.status === 201) {
      let totalval = 0;
      getOrderCountByStatusRes?.data?.data?.forEach(element => {
        totalval += element.count
      });

      setOrderCount({
        cancelled: getOrderCountByStatusRes?.data?.data?.find((item) => item.status === "Cancelled")?.count || 0,
        completed: getOrderCountByStatusRes?.data?.data?.find((item) => item.status === "Completed")?.count || 0,
        pending: getOrderCountByStatusRes?.data?.data?.find((item) => item.status === "Pending")?.count || 0,
        total: totalval || 0,
      })
    }
  }, [getOrderCountByStatusRes])

  return (
    <div className={classes.main}>
      <div className={classes["box-container"]}>
        <div className={`${classes.box} ${classes.box1}`}>
          <div className={classes.text}>
            <h2 className={classes["topic-heading"]}>{orderCount.total}</h2>
            <h2 className={classes.topic}>Total Orders</h2>
          </div>
          <img src={TotalOrdersIcn} alt="total-orders" />
        </div>

        <div className={`${classes.box} ${classes.box2}`}>
          <div className={classes.text}>
            <h2 className={classes["topic-heading"]}>{orderCount.completed}</h2>
            <h2 className={classes.topic}>Completed Orders</h2>
          </div>

          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
            alt="completed-orders"
          />
        </div>

        <div className={`${classes.box} ${classes.box3}`}>
          <div className={classes.text}>
            <h2 className={classes["topic-heading"]}>{orderCount.pending}</h2>
            <h2 className={classes.topic}>Pending Orders</h2>
          </div>

          <img src={PendingOrdersIcn} alt="pending-orders" />
        </div>

        <div className={`${classes.box} ${classes.box4}`}>
          <div className={classes.text}>
            <h2 className={classes["topic-heading"]}>{orderCount.cancelled}</h2>
            <h2 className={classes.topic}>Cancelled Orders</h2>
          </div>

          <img src={CancelledOrdersIcn} alt="cancelled-orders" />
        </div>
      </div>
    </div>
  );
};

export default Shared;
