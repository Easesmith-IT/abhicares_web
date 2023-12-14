import { useLocation, useParams } from 'react-router-dom'
import classes from './BookingDetails.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceModal from '../../components/invoiceModal/InvoiceModal';
import { format } from 'date-fns';

const BookingDetails = () => {
    const { state } = useLocation();
    const params = useParams();
    const token = localStorage.getItem("token");

    const [invoice, setInvoice] = useState({});
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

    const getOrderInvoice = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-product-invoice/${state._id}`, { headers: { Authorization: token }, withCredentials: true });
            setInvoice(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrderInvoice();
    }, [])

    return (
        <section className={classes.booking_details}>
            <div className={classes.booking_details_left}>
                <div className={classes.order_details}>
                    <h4 className={classes.h4}>Order Details</h4>
                    <div className={classes.d_flex}>
                        <div>
                            <p>Order Date: {format(new Date(state.createdAt), "dd-MM-yyyy")}</p>
                            <p>Order ID: {params.id}</p>
                        </div>
                        <button onClick={() => setIsInvoiceModalOpen(true)} className={classes.button}>View Invoice</button>
                    </div>
                </div>
                <div className={classes.delivery_details}>
                    <h4 className={classes.h4}>Delivery Details</h4>
                    <div className={classes.d_flex}>
                        <h5>Order Status: {state.status}</h5>
                        <div>
                            <div className={classes.progress}></div>
                            <div className={classes.status_container}>
                                <p></p>
                                <p>Out for delivary</p>
                                <p>Delivered</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.product_contaner}>
                        {state?.products?.map((product) => (
                            <div key={product._id} className={classes.product}>
                                <img className={classes.img} src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${product.product.imageUrl[0]}`} alt="" />
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
                            <p>Tax: </p>
                            <p><b>Total: </b></p>
                        </div>
                        <div>
                            <p>₹{state.orderValue}</p>
                            <p>Free</p>
                            <p>₹0</p>
                            <p><b>₹{state.orderValue}</b></p>
                        </div>
                    </div>
                </div>
            </div>
            {isInvoiceModalOpen &&
                <InvoiceModal
                state={state}
                    invoice={invoice}
                    setIsInvoiceModalOpen={setIsInvoiceModalOpen}
                />

            }
        </section>
    )
}

export default BookingDetails