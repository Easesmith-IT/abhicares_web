import classes from './SellerOrderInfoModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import parse from 'html-react-parser';
import { format } from 'date-fns';

const SellerOrderInfoModal = ({ setSellerOrderInfoModal, sellerOrder }) => {
    console.log(sellerOrder);
    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Seller Order Info</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setSellerOrderInfoModal(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <div className={classes.contianer}>
                    <p><b>Order Id:</b> {sellerOrder?._id}</p>
                    <p><b>Booking Date:</b> {format(new Date(sellerOrder.bookingDate), "dd-MM-yyyy")}</p>
                    <p><b>Booking Time:</b> {sellerOrder?.bookingTime}</p>
                    <p><b>Order Total:</b> ₹{sellerOrder?.orderValue}</p>
                    <p><b>Status: </b>{sellerOrder?.status}</p>
                </div>
                <h5>{sellerOrder.package ? "Package" : "Product"}</h5>
                <div className={classes.item}>
                    <div>
                        <img
                            className={classes.img}
                            src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${sellerOrder.product.imageUrl[0]}`}
                            alt="product"
                        />
                        <div>
                            <h6>
                                {sellerOrder.product.name}
                            </h6>
                            <p>{sellerOrder.package ? "Package" : "Product"}</p>
                        </div>
                    </div>
                    <p>Qty: {sellerOrder.quantity}</p>
                    <p>
                        ₹{sellerOrder.product.offerPrice}
                    </p>
                </div>
                <div style={{ marginTop: "10px" }}>
                    <h5>User Info</h5>
                    <p><b>Name:</b> {sellerOrder?.userId?.name}</p>
                    <p><b>Phone:</b> {sellerOrder?.userId?.phone}</p>
                    <p><b>Address Line:</b></p>
                    <p>{sellerOrder?.userAddress?.addressLine}</p>
                    <p><b>Landmark:</b> {sellerOrder?.userAddress?.landmark}</p>
                    <p><b>Pincode:</b> {sellerOrder?.userAddress?.pincode}</p>
                </div>
            </div>
        </div>
    )
}

export default SellerOrderInfoModal