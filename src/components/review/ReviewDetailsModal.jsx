import React from 'react'
import classes from './ReviewDetailsModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { FaStar } from 'react-icons/fa';

const ReviewDetailsModal = ({ setIsModalOpen, review }) => {
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

                    <p>Rating:
                        <FaStar size={20} color="#ffc422" />
                        <FaStar size={20} color="#ffc422" />
                        <FaStar size={20} color="#ffc422" />
                        <FaStar size={20} color="#ffc422" />
                        <FaStar size={20} color="#ffc422" />
                    </p>
                    <p>Service: {review.serviceType}</p>
                    <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                    <p>Review: {review.content}</p>

                    <h5 className={classes.heading}>User Details</h5>
                    <p>Name: {review.userName}</p>
                    <p>Phone : 1234561236</p>
                    <p>Address  : Harraiya Mishra - Byotahra Rd ,Basti,272002</p>

                    <h5 className={classes.heading}>Service Details</h5>
                    <p>Name: {review.userName}</p>
                    <p>Type: Package</p>

                    <h5 className={classes.heading}>Partner Details</h5>
                    <p>Name: {review.userName}</p>
                    <p>Phone : 1234561236</p>
                    <p>Email : email@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewDetailsModal