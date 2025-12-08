import { useEffect, useState } from 'react';
import classes from './UpdateCashoutReqModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import usePatchApiReq from '../../hooks/usePatchApiReq';

const UpdateCashoutReqModal = ({
  setIsUpdateModalOpen,
  cashOutReq = "",
  getSellerWallet,
}) => {
  const { checkAuthorization } = useAuthorization();
  const [cashOutInfo, setCashOutInfo] = useState({
    status: cashOutReq?.status || "",
    description: cashOutReq?.description || "",
    paymentId: cashOutReq?.accountDetails?.paymentId || "",
    date: cashOutReq?.accountDetails?.date || "",
  });

  console.log("cashOutReq", cashOutReq);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCashOutInfo({ ...cashOutInfo, [name]: value });
  };
  const { res: updateCashoutRes, fetchData: updateCashoutFetchData } = usePatchApiReq()

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      cashOutInfo.status === "cancelled" &&
      (!cashOutInfo.description || !cashOutInfo.status)
    ) {
      toast.error("All Fields are required");
      return;
    }

    if (
      cashOutInfo.status === "completed" &&
      (!cashOutInfo.description ||
        !cashOutInfo.status ||
        !cashOutInfo.date ||
        !cashOutInfo.paymentId)
    ) {
      toast.error("All Fields are required");
      return;
    }

    await updateCashoutFetchData(`/admin/approve-cashout/${cashOutReq._id}`, { ...cashOutInfo })
  };

  useEffect(() => {
    if (updateCashoutRes?.status === 200 || updateCashoutRes?.status === 201) {
        console.log("updateCashoutRes", updateCashoutRes);
        toast.success("Cashout request updated successfully");
      setIsUpdateModalOpen(false);
      getSellerWallet();
    }
}, [updateCashoutRes])
  return (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <div className={classes.heading_container}>
          <h4>Update CashOut Request</h4>
          <div className={classes.d_flex}>
            <RxCross2
              onClick={() => setIsUpdateModalOpen(false)}
              cursor={"pointer"}
              size={26}
            />
          </div>
        </div>
        <form onSubmit={handleOnSubmit} className={classes.form}>
          <div className={classes.input_container}>
            <label htmlFor="status">Status</label>
            <select
              onChange={handleOnChange}
              value={cashOutInfo.status}
              className={classes.input}
              name="status"
              id="status"
            >
              <option value="">Select</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          {cashOutInfo.status !== "cancelled" && (
            <>
              <div className={classes.input_container}>
                <label htmlFor="paymentId">Payment Id</label>
                <input
                  className={classes.input}
                  onChange={handleOnChange}
                  value={cashOutInfo.paymentId}
                  type="text"
                  name="paymentId"
                  id="paymentId"
                />
              </div>
              <div className={classes.input_container}>
                <label htmlFor="date">Date</label>
                <input
                  className={classes.input}
                  onChange={handleOnChange}
                  value={cashOutInfo.date}
                  type="date"
                  name="date"
                  id="date"
                />
              </div>
            </>
          )}
          <div className={classes.input_container}>
            <label htmlFor="description">Description</label>
            <input
              className={classes.input}
              onChange={handleOnChange}
              value={cashOutInfo.description}
              type="text"
              name="description"
              id="description"
            />
          </div>
          <div className={classes.button_wrapper}>
            <button className={classes.button}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCashoutReqModal