import { AiOutlineClose } from 'react-icons/ai'
import classes from './ReviewModal.module.css'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddReviewModal = ({ isReviewModalOpen, setIsReviewModalOpen, review, id, getAllReviewsOfUser }) => {

    const [reviewInfo, setReviewInfo] = useState({
        title: review?.title || "",
        content: review?.content || "",
        rating: review?.rating || ""
    });
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setReviewInfo({ ...reviewInfo, [name]: value });
    }

    const handleClick = (value) => {
        setReviewInfo({ ...reviewInfo, rating: value });
    }

    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    }

    const handleAddReview = async () => {
        if (!reviewInfo.title || !reviewInfo.content || !reviewInfo.rating) {
            return;
        }
        if (review) {
            try {
                const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/update-product-review/${id}`, { ...reviewInfo }, { withCredentials: true });
                setIsReviewModalOpen(false);
                toast.success("Review updated successfully");
                getAllReviewsOfUser();
                console.log(data);
            } catch (error) {
                // setIsReviewModalOpen(false);
                toast.error(error?.response?.data?.message);
                console.log(error);
            }
        }
        else {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/add-product-review/${id}`, { ...reviewInfo }, { withCredentials: true });
                setIsReviewModalOpen(false);
                toast.success("Review added successfully");
                getAllReviewsOfUser();
                console.log(data);
            } catch (error) {
                // setIsReviewModalOpen(false);
                toast.error(error?.response?.data?.message);
                console.log(error);
            }
        }
    }

    console.log(reviewInfo);


    return (
        <div
            className={`${classes.modal_overlay} ${isReviewModalOpen ? classes.modal_open : classes.modal_close
                }`}
        >
            <div className={classes.modal_wrapper}>
                <button
                    onClick={() => setIsReviewModalOpen()}
                    className={classes.modal_close}
                >
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal}>
                    <p className={classes.p}>Add Review</p>
                    <div className={classes.mt}>
                        <label htmlFor="title">Title</label>
                        <div className={classes.input_box}>
                            <input className={classes.input} onChange={handleOnChange} value={reviewInfo.title} type="text" name="title" id="title" placeholder="Enter your review title" />
                        </div>
                    </div>
                    <div className={classes.mt}>
                        <label htmlFor="content">Description</label>
                        <div className={classes.input_box}>
                            <input className={classes.input} onChange={handleOnChange} value={reviewInfo.content} type="text" name="content" id="content" placeholder="Enter your review description" />
                        </div>
                    </div>
                    <div className={classes.mt}>
                        <label htmlFor="rating">Select Rating</label>
                        <div className={classes.rating_container}>
                            {stars.map((_, index) => {
                                return (
                                    <li key={index}>
                                        <FaStar
                                            size={20}
                                            onClick={() => handleClick(index + 1)}
                                            onMouseOver={() => handleMouseOver(index + 1)}
                                            onMouseLeave={handleMouseLeave}
                                            color={(hoverValue || reviewInfo.rating) > index ? 'yellow' : 'gray'}
                                        />
                                    </li>
                                )
                            })}
                        </div>
                    </div>

                    <button onClick={handleAddReview} className={classes.button}>
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddReviewModal