import React, { useEffect, useState } from 'react'
import classes from './ReviewDetailsModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import ReactStars from 'react-stars'
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { format } from 'date-fns';

const ReviewDetailsModal = ({ setIsModalOpen, review }) => {
    const [reviewDetails, setReviewDetails] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getReviews = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_ADMIN_API_URL}/review-detail?reviewId=${review._id}`, { withCredentials: true }
            );
            console.log("details reviews", data);
            setReviewDetails(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getReviews();
    }, [])


    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Review Details</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <div>

                    <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>Rating:
                        <ReactStars
                            count={5}
                            edit={false}
                            value={review.rating}
                            size={24}
                            color2={'#ffd700'} />
                    </p>
                    <p><b>Date:</b> {review.date}</p>
                    <p><b>Review Type:</b> {reviewDetails?.reviewType}</p>
                    <p><b>Review:</b> {review.content}</p>

                    <div className={classes.reviewGrid}>
                        <div>
                            <div className={classes.heading_container}>
                                <h5 className={classes.heading}>User Details</h5>
                                {/* <button onClick={() => navigate(`/admin/customers`, { state: reviewDetails?.userId })} className={classes.viewBtn}>View</button> */}
                            </div>
                            <p><b>Name:</b> {reviewDetails?.userId?.name}</p>
                            <p><b>Phone:</b> {reviewDetails?.userId?.phone}</p>
                            {/* <p>Address  : {reviewDetails?.userId?.name}</p> */}
                        </div>
                        <div>
                            <div className={classes.heading_container}>
                                <h5 className={classes.heading}>Service Details</h5>
                                {/* <button onClick={() => navigate(`/admin/services/${reviewDetails?.productId ? reviewDetails?.productId?.serviceId?.categoryId : reviewDetails?.packageId?.serviceId?.categoryId}/product/${reviewDetails?.productId ? reviewDetails?.productId?.serviceId?._id : reviewDetails?.packageId?.serviceId?._id}`)} className={classes.viewBtn}>View</button> */}
                            </div>
                            <p><b>Name:</b> {reviewDetails?.productId ? reviewDetails?.productId?.name : reviewDetails?.packageId?.name}</p>
                            <p><b>Type:</b> {reviewDetails?.productId ? "Product" : "Package"}</p>
                            <p>
                                <b>Description:</b>
                                {reviewDetails?.productId ?
                                    <p>{parse(reviewDetails?.productId?.description)}</p>
                                    : <p>{reviewDetails?.packageId?.description && parse(reviewDetails?.packageId?.description)}</p>
                                }
                            </p>
                            <div className={classes.price}>
                                <span>₹{reviewDetails?.productId ? reviewDetails?.productId?.price : reviewDetails?.packageId?.price}</span>
                                <span>₹{reviewDetails?.productId ? reviewDetails?.productId?.offerPrice : reviewDetails?.packageId?.offerPrice}</span>
                            </div>
                        </div>
                        {reviewDetails?.bookingId?.sellerId
                            && <div>
                                <div className={classes.heading_container}>
                                    <h5 className={classes.heading}>Partner Details</h5>
                                    <button onClick={() => navigate(`/admin/partners/${reviewDetails?.bookingId?.sellerId?._id}`, { state: reviewDetails?.bookingId?.sellerId })} className={classes.viewBtn}>View</button>
                                </div>
                                <p><b>Name:</b> {reviewDetails?.bookingId?.sellerId?.name}</p>
                                <p><b>Phone:</b> {reviewDetails?.bookingId?.sellerId?.phone}</p>
                                {/* <p>Email : {reviewDetails?.bookingId?.sellerId?.name}</p> */}
                            </div>}
                        {reviewDetails?.bookingId
                            && <div>
                                <div className={classes.heading_container}>
                                    <h5 className={classes.heading}>Booking Details</h5>
                                    <button onClick={() => navigate(`/admin/bookings/${reviewDetails?.bookingId?._id}`, { state: reviewDetails?.bookingId })} className={classes.viewBtn}>View</button>
                                </div>
                                <p><b>Order Value:</b> {reviewDetails?.bookingId?.orderValue}</p>
                                <p><b>Booking Date:</b> {reviewDetails?.bookingId?.bookingDate && format(new Date(reviewDetails?.bookingId?.bookingDate),"dd-MM-yyyy")}</p>
                                <p><b>Booking Time:</b> {reviewDetails?.bookingId?.bookingTime}</p>
                                {/* <p>Email : {reviewDetails?.bookingId?.sellerId?.name}</p> */}
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewDetailsModal