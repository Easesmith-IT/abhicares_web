import React, { useState } from 'react';
import { FaEye, FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import classes from "../../pages/AdminPanel/reviews/Reviews.module.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import DeleteModal from '../deleteModal/DeleteModal';
import ReviewDetailsModal from './ReviewDetailsModal';

const Review = ({ review, fetchReviews }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_ADMIN_API_URL}/delete-review/${reviewId}`,
                { withCredentials: true }
            );
            toast.success("Review deleted successfully");
            fetchReviews();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete review");
        }
    };

    return (
        <div className={classes.item}>
            <div className={classes.left}>
                <p>User: {review.userName}</p>
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
            </div>
            <div className={classes.right}>
                <FaEye
                    onClick={() => setIsDetailsModalOpen(true)}
                    cursor="pointer"
                    size={22}
                    color="black"
                />
                <MdDelete
                    onClick={() => setIsDeleteModalOpen(true)}
                    cursor="pointer"
                    size={22}
                    color="red"
                />
            </div>

            {isDeleteModalOpen &&
                <DeleteModal
                    handleDelete={handleDelete}
                    setState={setIsDeleteModalOpen}
                />
            }
            {isDetailsModalOpen &&
                <ReviewDetailsModal
                    setIsModalOpen={setIsDetailsModalOpen}
                    review={review}
                />
            }
        </div>
    )
}

export default Review