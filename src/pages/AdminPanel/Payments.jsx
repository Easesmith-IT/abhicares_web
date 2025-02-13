import React, { useState, useEffect } from "react";
import Wrapper from "../Wrapper";
import classes from "./Shared.module.css";
import { PaginationControl } from "react-bootstrap-pagination-control";

import axios from "axios";
import useGetApiReq from "../../hooks/useGetApiReq";
const Payments = () => {
  const { res: getPaymentsRes, fetchData: getPayments, isLoading: getPaymentsLoading } = useGetApiReq();
  const [allPayments, setAllPayments] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);



  const getAllPayments = async () => {
    getPayments(`/admin/get-all-payments?page=${page}`);
  }

  useEffect(() => {
    getAllPayments();
  }, [page]);

  useEffect(() => {
    if (getPaymentsRes?.status === 200 || getPaymentsRes?.status === 201) {
      setAllPayments(getPaymentsRes?.data.payments);
      setPageCount(getPaymentsRes?.data.docsLength);
    }
  }, [getPaymentsRes])

  const handlePageClick = async (page) => {
    setPage(page);
  };

  return (
    <Wrapper>
      <div className={classes["report-container"]}>
        <div className={classes["report-header"]}>
          <h1 className={classes["recent-Articles"]}>Payments</h1>
          {/* <button className={classes.view}>View All</button> */}
        </div>

        <div className={classes["report-body"]}>
          <div className={classes["report-topic-heading"]}>
            <h3 className={classes["t-op"]}>Payment Id</h3>
            <h3 className={classes["t-op"]}>Order Id</h3>
            <h3 className={classes["t-op"]}>Amount</h3>
          </div>

          {allPayments.length === 0 && <h5 style={{ textAlign: 'center', marginTop: '30px' }}>No payments available</h5>}
          <div className={classes.items}>
            {allPayments.length > 0 &&
              allPayments.map((payment) => (
                <div className={classes.item1}>
                  <p className={classes["t-op-nextlvl"]}>
                    {payment.razorpay_payment_id}
                  </p>
                  <p className={classes["t-op-nextlvl"]}>{payment.orderId}</p>
                  <p className={classes["t-op-nextlvl"]}>{payment.amount.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </div>

        <div style={{ marginTop: "100px" }}>
          <PaginationControl
            changePage={handlePageClick}
            limit={10}
            page={page}
            total={pageCount + "0"}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Payments
