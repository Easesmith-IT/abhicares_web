import React, { useEffect, useState } from 'react'
import classes from './ReviewDetailsModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import ReactStars from 'react-stars'

const ReviewDetailsModal = ({ setIsModalOpen, review }) => {
    const [reviewDetails, setReviewDetails] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
                    <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                    <p>Review: {review.content}</p>

                    <div className={classes.reviewGrid}>
                        <div>
                            <div className={classes.heading_container}>
                                <h5 className={classes.heading}>User Details</h5>
                                <button className={classes.viewBtn}>View</button>
                            </div>
                            <p>Name: {review.userName}</p>
                            <p>Phone : 1234561236</p>
                            <p>Address  : Harraiya Mishra - Byotahra Rd ,Basti,272002</p>
                        </div>
                        <div>
                            <div className={classes.heading_container}>
                                <h5 className={classes.heading}>Service Details</h5>
                                <button className={classes.viewBtn}>View</button>
                            </div>
                            <p>Name: {review.userName}</p>
                            <p>Type: Package</p>
                        </div>
                        <div>
                            <div className={classes.heading_container}>
                                <h5 className={classes.heading}>Partner Details</h5>
                                <button className={classes.viewBtn}>View</button>
                            </div>
                            <p>Name: {review.userName}</p>
                            <p>Phone : 1234561236</p>
                            <p>Email : email@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewDetailsModal