import React, { useState } from 'react'
import classes from './BookingDetails.module.css'
import AddReviewModal from '../../components/reviewModal/AddReviewModal';

const SingleBooking = ({ item }) => {
    const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

    console.log("singleBooking", item);

    return (
        <>
            <div className={classes.product}>
                <div>
                    <img
                        className={classes.img}
                        src={`${process.env.REACT_APP_IMAGE_URL}/${item.package
                            ? item.package.imageUrl[0]
                            : item.product.imageUrl[0]
                            }`}
                        alt=""
                    />
                    <small>Type:{item.package ? "Package" : "Product"}</small>
                </div>
                <div className={classes.info}>
                    <h5>
                        {item.package ? item.package.name : item.product.name}
                    </h5>
                    <p>
                        {item.package
                            ? item.package.bookingDate
                            : item.product.bookingDate}
                    </p>
                    <p>
                        {item.package
                            ? item.package.bookingTime
                            : item.product.bookingTime}
                    </p>
                    <p>Qty: {item.quantity}</p>
                    <p>
                        ₹
                        {Number(
                            item.package
                                ? item.package.offerPrice
                                : item.product.offerPrice
                        ) * Number(item.quantity)}
                    </p>
                    <button
                        onClick={() => setIsAddReviewModalOpen(true)}
                        className={classes.button}
                    >
                        Add Review
                    </button>
                </div>
            </div>

            {isAddReviewModalOpen &&
                <AddReviewModal
                    isReviewModalOpen={isAddReviewModalOpen}
                    setIsReviewModalOpen={setIsAddReviewModalOpen}
                    isBooking
                    bookingId={item?._id}
                    serviceId={item.package ? item.package._id : item.product._id}
                    serviceType={item.package ? "package" : "product"}
                    getAllReviewsOfUser={() => { }}
                />
            }
        </>
    )
}

export default SingleBooking