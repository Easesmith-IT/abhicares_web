import { MdCancel } from 'react-icons/md'
import classes from './OrderInfoModal.module.css'
import { format } from 'date-fns'

const OrderInfoModal = ({ setIsInfoModalOpen, order }) => {
    return (
        <div className={classes.modal_overlay}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h2>Booking Info</h2>
                    <MdCancel onClick={() => setIsInfoModalOpen(false)} size={22} cursor={"pointer"} />
                </div>
                <h3>Order1</h3>
                <div className={classes.p_container}>
                    <p className={classes.qty}>Qty: 1</p>
                    <p>booking date: {format(new Date(order.bookingDate), "dd-MM-yyyy")}</p>
                    <p>booking time: {order.bookingTime}</p>
                    <p>appointment date: 05/12/2023</p>
                    <p>status: {order.status}</p>
                </div>
                <h3>Products</h3>
                <div className={classes.product_contaner}>
                    {/* {order?.products?.map((product) => ( */}
                        <div className={classes.product}>
                            <img className={classes.img} src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${order.product.imageUrl[0]}`} alt="" />
                            <div className={classes.info}>
                                <h4>{order.product?.name}</h4>
                                <p>Qty: {order?.quantity}</p>
                                <p>₹{order.product.offerPrice}</p>
                            </div>
                        </div>
                    {/* ))} */}
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
                <p className={classes.p}>Total Price: ₹{order.orderValue}</p>
            </div>
        </div>
    )
}

export default OrderInfoModal