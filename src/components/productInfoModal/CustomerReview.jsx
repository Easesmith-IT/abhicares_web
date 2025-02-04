import classes from "./Modal.module.css";
import { format } from "date-fns";
import { BsStarFill } from "react-icons/bs";
import { MdDelete, MdModeEdit } from "react-icons/md";
import AddReviewModal from "../reviewModal/AddReviewModal";
import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal";
import axios from "axios";
import toast from "react-hot-toast";
import { readCookie } from "../../utils/readCookie";

const CustomerReview = ({ review, isUser = false, getAllReviews }) => {
    const [isUpdateReviewModalOpen, setIsUpdateReviewModalOpen] = useState(false);
    const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(false);
    const token = readCookie("userInfo");
    const userName = token?.name;
    const userId = token?.id;
    console.log("review", review);

    const handleDelete = async () => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/delete-product-review/${review._id}`,
                {
                    withCredentials: true,
                }
            );
            toast.success("Review deleted successfully");
            console.log("review res", res.data);
            setIsDeleteReviewModalOpen(false);
            getAllReviews();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={classes.customer_review}>
                <div className={classes.customer_review_left}>
                    <div className={classes.customer_info}>
                        <img className={classes.customer_img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&usqp=CAU" alt="customer" />
                        <div className={classes.customer_info_right}>
                            <p className={classes.customer_name}>{review?.userId?.name ? review.userId.name : userName}</p>
                            <p className={classes.review_date}>{format(new Date(review.createdAt), "MMMM yyyy")}</p>
                        </div>
                    </div>
                    <h5 className={classes.h5}>{review.title}</h5>
                    <p className={classes.customer_review_p}>{review.content}</p>
                </div>
                <div className={classes.customer_review_right}>
                    <div className={classes.rating_staricon_num_container}>
                        <BsStarFill color="black" size={10} />
                        <span className={classes.rating_star_num}>{review.rating}</span>
                    </div>
                    {userId === review?.userId?._id &&
                        <div className={classes.d_flex}>
                            <MdModeEdit onClick={() => setIsUpdateReviewModalOpen(true)} cursor={"pointer"} color="black" size={15} />
                            <MdDelete onClick={() => setIsDeleteReviewModalOpen(true)} cursor={"pointer"} color="black" size={15} />
                        </div>}
                </div>
            </div>

            {isUpdateReviewModalOpen &&
                <AddReviewModal
                    isReviewModalOpen={isUpdateReviewModalOpen}
                    setIsReviewModalOpen={setIsUpdateReviewModalOpen}
                    id={review._id}
                    review={review}
                    getAllReviewsOfUser={getAllReviews}
                />
            }

            {isDeleteReviewModalOpen &&
                <DeleteModal
                    handleDelete={handleDelete}
                    setState={setIsDeleteReviewModalOpen}
                />
            }
        </>

    );
};

export default CustomerReview;