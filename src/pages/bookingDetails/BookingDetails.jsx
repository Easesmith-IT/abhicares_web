import { useLocation, useNavigate, useParams } from 'react-router-dom'
import classes from './BookingDetails.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceModal from '../../components/invoiceModal/InvoiceModal';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import WebsiteWrapper from '../WebsiteWrapper';

const BookingDetails = () => {
    const { state } = useLocation();
    const params = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    console.log(state);

    const [invoice, setInvoice] = useState({});
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false);
    const [totalTaxRs, setTotalTaxRs] = useState(0);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);

    const getOrderInvoice = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-product-invoice/${state._id}`, { headers: { Authorization: token }, withCredentials: true });
            setInvoice(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelOrder = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/change-order-status/${state._id}`, { status: "Cancelled" }, { headers: { Authorization: token }, withCredentials: true });
            toast.success("Your order cancelled successfully");
            navigate("/my_bookings");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        getOrderInvoice();
        setTotalTaxRs((state.orderValue * 18) / 100)
        setTotal(Number(totalTaxRs) + Number(state.orderValue));
        if (state.couponId) {
            setDiscount((state.orderValue * 18) / 100)
        }
    }, [])


    return (
        <WebsiteWrapper>
            <section className={classes.booking_details}>
                <div className={classes.booking_details_left}>
                    <div className={classes.order_details}>
                        <h4 className={classes.h4}>Order Details</h4>
                        <div className={classes.d_flex}>
                            <div>
                                <p>Order Date: {format(new Date(state.createdAt), "dd-MM-yyyy")}</p>
                                <p>Order ID: {params.id}</p>
                                <p>Order Status: {state.status}</p>
                            </div>
                            <div className={classes.buttons_container}>
                                <button onClick={() => setIsInvoiceModalOpen(true)} className={classes.button}>View Invoice</button>
                                {state.status !== "Cancelled" && <button onClick={() => setIsCancelledModalOpen(true)} className={`${classes.button} ${classes.red}`}>Cancel Order</button>}
                            </div>
                        </div>
                    </div>
                    <div className={classes.delivery_details}>
                        <h4 className={classes.h4}>Delivery Details</h4>
                        <div className={classes.d_flex}>
                            {/* <h5>Order Status: {state.status}</h5> */}
                            <div>
                                <div className={classes.progress}></div>
                                <div className={classes.status_container}>
                                    <p></p>
                                    <p>Out for delivery</p>
                                    <p>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.product_contaner}>
                            {state?.items?.map((item, i) => (
                                <div key={i} className={classes.product}>
                                    <div>
                                        <img className={classes.img} src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${item.package ? item.package.imageUrl[0] : item.product.imageUrl[0]}`} alt="" />
                                        <small>Type:{item.package ? "Package" : "Product"}</small>
                                    </div>
                                    <div className={classes.info}>
                                        <h5>{item.package ? item.package.name : item.product.name}</h5>
                                        <p>{item.package ? item.package.bookingDate : item.product.bookingDate}</p>
                                        <p>{item.package ? item.package.bookingTime : item.product.bookingTime}</p>
                                        <p>Qty: {item.quantity}</p>
                                        <p>₹{Number(item.package ? item.package.offerPrice : item.product.offerPrice) * Number(item.quantity)}</p>
                                    </div>
                                </div>
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
                                <p>Discount: </p>
                                <p><b>Total: </b></p>
                            </div>
                            <div>
                                <p>₹{state.orderValue}</p>
                                <p> + ₹{totalTaxRs}</p>
                                <p> - { }</p>
                                <p><b>₹{total}</b></p>
                            </div>
                        </div>
                    </div>
     
                </div>
              </div>
            </div>
            <div className={classes.delivery_details}>
              <h4 className={classes.h4}>Delivery Details</h4>
              <div className={classes.d_flex}>
                {/* <h5>Order Status: {state.status}</h5> */}
                <div>
                  <div className={classes.progress}></div>
                  <div className={classes.status_container}>
                    <p></p>
                    <p>Out for delivery</p>
                    <p>Delivered</p>
                  </div>
                </div>
              </div>
              <div className={classes.product_contaner}>
                {state?.products?.map((product) => (
                  <div key={product._id} className={classes.product}>
                    <img
                      className={classes.img}
                      src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${product.product.imageUrl[0]}`}
                      alt=""
                    />
                    <div className={classes.info}>
                      <h4>{product?.product?.name}</h4>
                      <p>{product.bookingDate}</p>
                      <p>{product.bookingTime}</p>
                      <p>Qty: {product?.quantity}</p>
                      <p>₹{product?.product?.offerPrice * product.quantity}</p>
                    </div>
                  </div>
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
                  <p>Shipping: </p>
                  <p>Tax and Fee(18% GST): </p>
                  <p>
                    <b>Total: </b>
                  </p>
                </div>
                <div>
                  <p>₹{state.orderValue}</p>
                  <p>Free</p>
                  <p>₹{total}</p>
                  <p>
                    <b>₹{Number(total) + Number(state.orderValue)}</b>
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