import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import classes from './UpdateCashoutReqModal.module.css';

import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import usePatchApiReq from '../../hooks/usePatchApiReq';

const AddCashoutReqModal = ({
  setIsUpdateModalOpen,
  getSellerWallet,
}) => {
  const [cashOutInfo, setCashOutInfo] = useState({
    date: "",
    amount: "",
    description: "",
    paymentId: "",
  });


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
          <h4>Add CashOut Request</h4>
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
          <div className={classes.input_container}>
            <label htmlFor="amount">Amount</label>
            <input
              className={classes.input}
              onChange={handleOnChange}
              value={cashOutInfo.amount}
              type="number"
              name="amount"
              id="amount"
            />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="description">Description</label>
            <textarea
              className={classes.input}
              onChange={handleOnChange}
              value={cashOutInfo.description}
              name="description"
              id="description"
            />
          </div>
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
          <div className={classes.button_wrapper}>
            <button className={classes.button}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCashoutReqModal