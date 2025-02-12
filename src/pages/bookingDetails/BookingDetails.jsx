import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import InvoiceModal from '../../components/invoiceModal/InvoiceModal';
import usePostApiReq from '../../hooks/usePostApiReq';
import WebsiteWrapper from '../WebsiteWrapper';
import classes from './BookingDetails.module.css';
import SingleBooking from './SingleBooking';
const BookingDetails = () => {
  const { res: changeOrderStatusRes, fetchData: changeOrderStatus, isLoading: changeOrderStatusLoading } = usePostApiReq();
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  console.log("state", state);
  const [invoice, setInvoice] = useState({});
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false);
  const [totalTaxRs, setTotalTaxRs] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const getOrderInvoice = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/get-product-invoice/${state._id}`, { withCredentials: true });
      setInvoice(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCancelOrder = async () => {
    changeOrderStatus(`/shopping/change-order-status/${state._id}`, { status: "Cancelled" })
  }

  useEffect(() => {
    if (changeOrderStatusRes?.status === 200 || changeOrderStatusRes?.status === 201) {
      toast.success("Your order cancelled successfully");
      navigate("/my_bookings");
    }
  }, [changeOrderStatusRes])

  useEffect(() => {
    getOrderInvoice();
    let value = 0;
    for (const item of state.items) {
      if (item?.product) {
        value = value + Number(item.quantity * item.product.offerPrice);
      }
      else if (item?.package) {
        value = value + Number(item.quantity * item.package.offerPrice);
      }
    }
    const taxRs = (Number(value) * 18) / 100;
    setTotalTaxRs(taxRs);
    setSubTotal(() => value);

    const { discountType, couponFixedValue, offPercentage, maxDiscount } = state.couponId || {};

    if (state.couponId) {
      if (discountType === "fixed") {
        setDiscount(couponFixedValue);
        setSubTotal((prev) => prev - Number(couponFixedValue));
      }
      else {
        let offerTotal = Math.ceil(value * (Number(offPercentage) / 100));
        offerTotal = offerTotal > maxDiscount ? maxDiscount : offerTotal;
        console.log("offerTotal", offerTotal);
        setDiscount(offerTotal);
        setSubTotal((prev) => prev - Number(offerTotal));
      }
    }
  }, [state.orderValue, state.couponId]);


  return (
    <WebsiteWrapper>
      <section className={classes.booking_details}>
        <div className={classes.booking_details_left}>
          <div className={classes.order_details}>
            <h4 className={classes.h4}>Order Details</h4>
            <div className={classes.d_flex}>
              <div>
                <p>
                  Order Date: {format(new Date(state.createdAt), "dd-MM-yyyy")}
                </p>
                <p>Order ID: {state.orderId}</p>
                <p>Order Status: {state.status}</p>
              </div>
              <div className={classes.buttons_container}>
                <button
                  onClick={() => setIsInvoiceModalOpen(true)}
                  className={classes.button}
                >
                  View Invoice
                </button>
                {state.status !== "Cancelled" && (
                  <button
                    onClick={() => setIsCancelledModalOpen(true)}
                    className={`${classes.button} ${classes.red}`}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={classes.delivery_details}>
            {/* <h4 className={classes.h4}>Delivery Details</h4>
            <div className={classes.d_flex}>
              <h5>Order Status: {state.status}</h5>
              <div>
                <div className={classes.progress}></div>
                <div className={classes.status_container}>
                  <p></p>
                  <p>Out for delivery</p>
                  <p>Delivered</p>
                </div>
              </div>
            </div> */}
            <div className={classes.product_contaner}>
              {state?.items?.map((item, i) => (
                <SingleBooking item={item} booking={state} />
              ))}
            </div>
          </div>
        </div>
        <div className={classes.booking_details_right}>
          <div className={classes.booking_details_right_top}>
            <h4 className={classes.h4}>Order Total</h4>
            <div className={classes.d_flex}>
              <div>
                <p>Subtotal: </p>
                <p>Tax(18%): </p>
                {state.discount > 0 && <p>Discount: </p>}
                {state.referalDiscount && <p>Referal Discount: </p>}
                <p>
                  <b>Total: </b>
                </p>
              </div>
              <div>
                <p>₹{state.itemTotal}</p>
                <p> + ₹{state.tax}</p>
                {state.discount > 0 && <p> - ₹{state.discount}</p>}
                {state.referalDiscount && <p> - ₹{state.referalDiscount}</p>}
                <p>
                  <b>₹{state.orderValue}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        {isInvoiceModalOpen && (
          <InvoiceModal
            state={state}
            invoice={invoice}
            setIsInvoiceModalOpen={setIsInvoiceModalOpen}
          />
        )}


        {isCancelledModalOpen && (
          <div className={classes.modal_wrapper}>
            <div className={classes.modal}>
              <p>Are you sure to cancel ?</p>
              <div className={classes.button_wrapper}>
                <button
                  onClick={handleCancelOrder}
                  className={`${classes.button} ${classes.yes}`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsCancelledModalOpen(false)}
                  className={`${classes.button} ${classes.no}`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </WebsiteWrapper>
  );
}
export default BookingDetails