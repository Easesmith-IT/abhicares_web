import React, { useEffect, useState } from 'react';
import { FaEye, FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import classes from "../../pages/AdminPanel/reviews/Reviews.module.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import DeleteModal from '../deleteModal/DeleteModal';
import ReviewDetailsModal from './ReviewDetailsModal';
import ReactStars from 'react-stars'
import useDeleteApiReq from '../../hooks/useDeleteApiReq';
import { format } from 'date-fns';

const Review = ({ review, fetchReviews }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const { res: deleteReviewRes, fetchData: deleteReview, isLoading: deleteReviewLoading } = useDeleteApiReq();

    const handleDelete = async () => {
        deleteReview(`/admin/delete-review?reviewId=${review?._id}`)
    };

    useEffect(() => {
        if (deleteReviewRes?.status === 200 || deleteReviewRes?.status === 201) {
            toast.success("Review deleted successfully");
            fetchReviews();
        }
    }, [deleteReviewRes])

    return (
      <>
        <div className={classes.item}>
          <div className={classes.left}>
            {/* <p>User: {review.userName}</p> */}
            <div className={classes.flex}>
              <p>Title: {review.title}</p>
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
            <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              Rating:
              <ReactStars
                count={5}
                edit={false}
                value={review.rating}
                size={24}
                color2={"#ffd700"}
              />
            </p>
            <p>
              Date:{" "}
              {review?.createdAt &&
                format(new Date(review.createdAt), "dd-MM-yyyy")}
            </p>
            <p>Review: {review.content}</p>
          </div>
        </div>

        {isDeleteModalOpen && (
          <DeleteModal
            handleDelete={handleDelete}
            setState={setIsDeleteModalOpen}
          />
        )}
        {isDetailsModalOpen && (
          <ReviewDetailsModal
            setIsModalOpen={setIsDetailsModalOpen}
            review={review}
          />
        )}
      </>
    );
}

export default Review