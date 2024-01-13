import { MdCancel } from 'react-icons/md'
import classes from './OrderInfoModal.module.css'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import axios from 'axios'
import InvoiceModal from '../invoiceModal/InvoiceModal'
import LazyImage from '../react-lazyload-image/LazyImage'

const OrderInfoModal = ({ setIsInfoModalOpen, order }) => {
    console.log(order._id);
    const [invoice, setInvoice] = useState({});
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

    const getOrderInvoice = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-product-invoice/${order._id}`, { withCredentials: true });
            console.log("invoice", data);
            setInvoice(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrderInvoice();
    }, [])


    return (
        <>
            <div className={classes.modal_overlay}>
                <div className={classes.modal}>
                    <div className={classes.heading_container}>
                        <h2>Booking Info</h2>
                        <MdCancel onClick={() => setIsInfoModalOpen(false)} size={22} cursor={"pointer"} />
                    </div>
                    <div className={classes.heading_container}>
                        <h3>Order1</h3>
                        <button onClick={() => setIsInvoiceModalOpen(true)} className={classes.button}>View Invoice</button>
                    </div>
                    <div className={classes.p_container}>
                        <p className={classes.qty}>Qty: 1</p>
                        {/* <p>booking date: {format(new Date(product.bookingDate), "dd-MM-yyyy")}</p>
                        <p>booking time: {order.bookingTime}</p>
                        <p>appointment date: 05/12/2023</p>
                        <p>status: {order.status}</p> */}
                    </div>
                    <h3>Products</h3>
                    <div className={classes.product_contaner}>
                        {order?.products?.map((product) => (
                            <div key={product._id} className={classes.product}>
                                <LazyImage>
                                    <img className={classes.img} src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${product.product.imageUrl[0]}`} alt="" />
                                </LazyImage>
                                <div className={classes.info}>
                                    <h4>{product?.product?.name}</h4>
                                    <p>Qty: {product?.quantity}</p>
                                    <p>₹{product?.product?.offerPrice}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h4>Track Order</h4>
                    <div>
                        <div className={classes.progress}></div>
                        <div className={classes.d_flex}>
                            <p></p>
                            <p>Out for delivary</p>
                            <p>Delivered</p>
                        </div>
                    </div>
                    <hr />
                    {/* <p className={classes.p}>Total Price: ₹{order.orderValue}</p> */}
                </div>
            </div>
            {isInvoiceModalOpen &&
                <InvoiceModal
                    setIsInvoiceModalOpen={setIsInvoiceModalOpen}
                />

            }
        </>
    )
}

export default OrderInfoModal