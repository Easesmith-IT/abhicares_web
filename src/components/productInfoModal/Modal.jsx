/* eslint-disable react/prop-types */
import classes from "./Modal.module.css";

import { AiOutlineClose } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import parse from "html-react-parser";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import axios from "axios";
import { useEffect, useState } from "react";
import useGetApiReq from "../../hooks/useGetApiReq";
import { readCookie } from "../../utils/readCookie";
import Loader from "../loader/Loader";
import ReviewModal from "../reviewModal/AddReviewModal";
import CustomerReview from "./CustomerReview";
import SpecificStarRating from "./SpecificStarRating";

const Modal = ({ isOpen, handleOnclick, Data, isProduct, features = [] }) => {
    const { res: getProductReviewRes, fetchData: getProductReview, isLoading: isReviewLoading } = useGetApiReq();
    const [allProducts, setAllProducts] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isReviewBtn, setIsReviewBtn] = useState(false);
    const [isImgLoading, setIsImgLoading] = useState(true);

    const token = readCookie("userInfo");
    const userId = token?.id;

    const { rating, ratingDistribution, totalReviews } = Data || {}

    console.log("modal open", Data);
    useEffect(() => {
        const reviewObj = allReviews.find((review) => userId === review?.userId?._id)
        console.log("review obj", reviewObj);
        if (!reviewObj) {
            setIsReviewBtn(true);
        } else {
            setIsReviewBtn(false);
        }
    }, [allReviews])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 550 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 550, min: 0 },
            items: 1
        }
    };

    const ButtonGroup = ({ next, previous }) => {
        return (
            <>
                <button className={`${classes.carousel_button} ${classes.carousel_button_left}`} onClick={() => previous()} ><IoIosArrowBack size={35} /></button>
                <button className={`${classes.carousel_button} ${classes.carousel_button_right}`} onClick={() => next()} ><IoIosArrowForward size={35} /></button>
            </>
        );
    };

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/get-package-product/${Data._id}`);
            console.log("package products", data);
            setAllProducts(data?.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };


    const getAllReviews = async () => {
        getProductReview(`/shopping/get-product-review/${Data._id}?type=${isProduct ? "product" : "package"}`)
    };


    useEffect(() => {
        !isProduct && getAllProducts();
        getAllReviews();
        // getAllReviewsOfUser();
    }, [])

    useEffect(() => {
        if (getProductReviewRes?.status === 200 || getProductReviewRes?.status === 201) {
            setAllReviews(getProductReviewRes?.data.reviews);
        }
    }, [getProductReviewRes])


    return (
        <div className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close}`}>
            <div className={classes.modal_wrapper}>
                <button onClick={handleOnclick} className={classes.modal_close}>
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal_wrapper_overflow}>
                    <div className={classes.modal}>
                        {Data.imageUrl && <Carousel responsive={responsive} arrows={false} showDots className={classes.carousel} customButtonGroup={<ButtonGroup />} >
                            {Data?.imageUrl?.map((image) => (
                                <img key={image} className={classes.carousel_img} src={`${import.meta.env.VITE_APP_IMAGE_URL}/${image}`} alt="product" />
                            ))}
                        </Carousel>}
                        <div className={classes.modal_body}>
                            <div className={classes.border_bottom}>
                                <div className={classes.modal_header}>
                                    <div className={classes.modal_header_left}>
                                        <h3 className={classes.modal_header_left_h4}>{Data.name}</h3>
                                        <div className={classes.rating}>
                                            <BsStarFill color="rgb(255, 138, 0)" size={20} />
                                            <span className={classes.rating_span}>{Data?.rating} ({Data?.totalReviews})</span>
                                        </div>
                                        <div className={classes.price_time_container}>
                                            <div className={classes.price_cotainer}>
                                                <span className={classes.price}>₹{Data.price}</span>
                                                <span className={classes.price}>₹{Data.offerPrice}</span>
                                            </div>
                                            {/* <div className={classes.dot_time_container}>
                                                <div className={classes.dot}></div>
                                                <span className={classes.time}>45 mins</span>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className={classes.modal_header_right}>
                                        {/* {!isProductInCart && <button onClick={handleAddToCart} className={classes.button}>Add</button>} */}
                                    </div>
                                </div>
                                {Data?.description && <p>{parse(Data?.description)}</p>}
                                {/* <div className={classes.box}>
                                    <div className={classes.box_left}>
                                        <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_94,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/customer-subscription/1693221423328-595820.jpeg" alt="" />
                                        <p className={classes.box_left_p}>Standard rate card</p>
                                    </div>
                                    <FiChevronRight size={23} />
                                </div> */}
                            </div>


                            {!isProduct && <div className={classes.products_cotainer}>
                                <h4 style={{ marginBottom: "20px" }}>Included  Services</h4>
                                {allProducts?.map((product) => (
                                    <div className={classes.singleProduct} key={product._id}>
                                        <div className={classes.singleProduct_left}>
                                            <img
                                                style={{ display: !isImgLoading ? "block" : "none" }}
                                                onLoad={() => setIsImgLoading(false)}
                                                className={classes.img}
                                                src={`${import.meta.env.VITE_APP_IMAGE_URL}/${product?.imageUrl[0]}`}
                                                alt="product"
                                            />
                                        </div>
                                        <div className={classes.singleProduct_right}>
                                            <h5>{product?.name}</h5>
                                            <p>{parse(product.description)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>}
                            {!isProduct && !isLoading
                                && allProducts.length === 0
                                && <p>No product found</p>
                            }

                            {!isProduct && isLoading
                                && allProducts.length === 0
                                && <Loader />
                            }

                            {/* <div className={classes.border_bottom}>
                                <HowItWorks />
                            </div>
                            <div className={classes.border_bottom}>
                                <div className={classes.note}>
                                    <img className={classes.note_img} src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQZM9xEO3-0kYcg6PSQQhiKpbK7-3G7nLMhmzQ1TTuTsFZCBglB" alt="" />
                                    <div>
                                        <p className={classes.note_heading}>Note</p>
                                        <p className={classes.note_message}>
                                            Our technicians do not carry a ladder,
                                            please arrange for one if the AC is at a
                                            height
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.border_bottom}>
                                <Faqs />
                            </div> */}

                            {/* <div className={classes.border_bottom}>
                                <img className={classes.brands_img} src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_1232,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1682596517581-ec0422.jpeg" alt="" />
                            </div> */}

                            <div className={classes.customer_reviews_section}>
                                <h4>Customer reviews</h4>
                                <div className={classes.d_flex}>
                                    <div className={classes.rating}>
                                        <BsStarFill color="black" size={15} />
                                        <span className={classes.rating_span}>{rating}</span>
                                    </div>
                                    {isReviewBtn && <button onClick={() => setIsReviewModalOpen(true)} className={classes.button}>Add Review</button>}
                                </div>
                                <p className={classes.reviews}>{totalReviews} reviews</p>

                                <div className={classes.rating_stars_container}>
                                    <SpecificStarRating
                                        ratingStar={5}
                                        ratingValue={ratingDistribution["5"]}
                                        maxRating={totalReviews}
                                    />
                                    <SpecificStarRating
                                        ratingStar={4}
                                        ratingValue={ratingDistribution["4"]}
                                        maxRating={totalReviews}
                                    />
                                    <SpecificStarRating
                                        ratingStar={3}
                                        ratingValue={ratingDistribution["3"]}
                                        maxRating={totalReviews}
                                    />
                                    <SpecificStarRating
                                        ratingStar={2}
                                        ratingValue={ratingDistribution["2"]}
                                        maxRating={totalReviews}
                                    />
                                    <SpecificStarRating
                                        ratingStar={1}
                                        ratingValue={ratingDistribution["1"]}
                                        maxRating={totalReviews}
                                    />
                                </div>
                                <div className={classes.customer_reviews_container}>
                                    {/* {userReviews?.map((review) => (
                                        <CustomerReview
                                            key={review._id}
                                            review={review}
                                            isUser={true}
                                        />
                                    ))} */}
                                    {!isReviewLoading
                                        && allReviews.length === 0
                                        && <p>No reviews found</p>
                                    }

                                    {isReviewLoading
                                        && allReviews.length === 0
                                        && <Loader />
                                    }

                                    {allReviews?.map((review) => (
                                        <CustomerReview
                                            key={review._id}
                                            review={review}
                                            getAllReviews={getAllReviews}
                                        />
                                    ))}
                                </div>
                                <div className={classes.features_container}>
                                    <h4>We Offer</h4>
                                    {features?.length === 0 &&
                                        <p>No features found</p>
                                    }

                                    {features?.map((feature) => (
                                        <div className={classes.feature}>
                                            <div className={classes.feature_img}>
                                                <img src={`${import.meta.env.VITE_APP_IMAGE_URL}/${feature?.image}`} alt="feature" />
                                            </div>
                                            <div className={classes.feature_content}>
                                                <h5>{feature?.title}</h5>
                                                <p>{feature?.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {isReviewModalOpen &&
                                <ReviewModal
                                    isReviewModalOpen={isReviewModalOpen}
                                    setIsReviewModalOpen={setIsReviewModalOpen}
                                    id={Data._id}
                                    getAllReviewsOfUser={getAllReviews}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;