import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import classes from './UpdateCashoutReqModal.module.css';

import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import usePostApiReq from '../../hooks/usePostApiReq';

const AddCashoutReqModal = ({
  setIsUpdateModalOpen,
  getCashOutRequests,
  walletId
}) => {
  console.log("walletId", walletId);

  const [cashOutInfo, setCashOutInfo] = useState({
    amount: "",
    description: "",
    paymentId: "",
  });


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCashOutInfo({ ...cashOutInfo, [name]: value });
  };
  const { res, fetchData, isLoading } = usePostApiReq()

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      !cashOutInfo.amount
    ) {
      toast.error("Amount is required");
      return;
    }

    fetchData(`/admin/add-seller-cashout`, { sellerWalletId: walletId, value: cashOutInfo.amount, payId: cashOutInfo.paymentId, description: cashOutInfo.description })
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      // toast.success("Cashout request updated successfully");
      setIsUpdateModalOpen(false);
      getCashOutRequests(walletId);
    }
  }, [res])

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
            <button disabled={isLoading} className={classes.button}>{isLoading ? "Adding..." : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCashoutReqModal