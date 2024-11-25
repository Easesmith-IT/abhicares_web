import React, { useState } from 'react';
import { FaEye, FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import classes from "../../pages/AdminPanel/reviews/Reviews.module.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import DeleteModal from '../deleteModal/DeleteModal';
import ReviewDetailsModal from './ReviewDetailsModal';
import ReactStars from 'react-stars'

const Review = ({ review, fetchReviews }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_ADMIN_API_URL}/delete-review/${review?._id}`,
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
        <>
            <div className={classes.item}>
                <div className={classes.left}>
                    {/* <p>User: {review.userName}</p> */}
                    <p>Title: {review.title}</p>
                    <p style={{display:"flex",alignItems:"center", gap:"10px"}}>Rating:
                        <ReactStars
                            count={5}
                            edit={false}
                            value={review.rating}
                            size={24}
                            color2={'#ffd700'} />
                    </p>
                    <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
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
        </>
    )
}

export default Review