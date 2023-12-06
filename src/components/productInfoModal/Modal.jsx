/* eslint-disable react/prop-types */
import classes from "./Modal.module.css";

import { AiOutlineClose } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsStarFill } from "react-icons/bs";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import parse from "html-react-parser";

import Faqs from "./Faqs";
import CustomerReview from "./CustomerReview";
import SpecificStarRating from "./SpecificStarRating";
import HowItWorks from "./HowItWorks";
import axios from "axios";
import { useEffect, useState } from "react";
import { addItemToCart, createCart, getCartDetails } from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product";

const Modal = ({ isOpen, handleOnclick, Data, }) => {
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const [isProductInCart, setIsProductInCart] = useState(false);

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
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-package-product/${Data._id}`);
            console.log(data.data[0].productObjects);
            setAllProducts(data.data[0].productObjects);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllProducts();
        (async () => {
            await dispatch(getCartDetails());
        })()
        const filtered = cart.items.find((item) => item.productId === Data._id)
        setIsProductInCart(filtered)
    }, [])


    const handleAddToCart = async () => {
        if (!cart.isCart) {
            await dispatch(createCart(
                "656967d8f6f027570817cdef",
                [
                    {
                        productId: Data._id,
                        quantity: 1
                    },
                ],
                Data.price
            ));

            await dispatch(getCartDetails());
        }
        else {
            const filtered = cart.items.find((item) => item.productId === Data._id)
            console.log(filtered);
            if (filtered) {
                let updatedQuantity = filtered.quantity + 1;
                await dispatch(addItemToCart(Data._id, updatedQuantity))
                await dispatch(getCartDetails());
            }
            else {
                await dispatch(addItemToCart(Data._id, 1))
                await dispatch(getCartDetails());
            }
        }
    }



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
                                <img key={image} className={classes.carousel_img} src={`${process.env.REACT_APP_DOMAIN}/uploads/${image}`} alt="" />
                            ))}
                        </Carousel>}
                        <div className={classes.modal_body}>
                            <div className={classes.border_bottom}>
                                <div className={classes.modal_header}>
                                    <div className={classes.modal_header_left}>
                                        <h4 className={classes.modal_header_left_h4}>{Data.name}</h4>
                                        <div className={classes.rating}>
                                            <BsStarFill color="gray" size={11} />
                                            <span className={classes.rating_span}>4.83 (1.2M)</span>
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
                                <div className={classes.box}>
                                    <div className={classes.box_left}>
                                        <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_94,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/customer-subscription/1693221423328-595820.jpeg" alt="" />
                                        <p className={classes.box_left_p}>Standard rate card</p>
                                    </div>
                                    <FiChevronRight size={23} />
                                </div>
                            </div>

                            {allProducts.length !== 0 && <div className={classes.products_cotainer}>
                                <h2>Products</h2>
                                {allProducts?.map((product) => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>}

                            <div className={classes.border_bottom}>
                                <img className={classes.uc_cover_img} src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_1232,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1682683348153-32c1cf.jpeg" alt="" />
                            </div>

                            <div className={classes.border_bottom}>
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
                            </div>

                            <div className={classes.border_bottom}>
                                <img className={classes.brands_img} src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_1232,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1682596517581-ec0422.jpeg" alt="" />
                            </div>

                            <div className={classes.customer_reviews_section}>
                                <h3 className={classes.customer_reviews_h3}>Customer reviews</h3>
                                <div className={classes.rating}>
                                    <BsStarFill color="black" size={15} />
                                    <span className={classes.rating_span}>4.83</span>
                                </div>
                                <p className={classes.reviews}>1.2M reviews</p>

                                <div className={classes.rating_stars_container}>
                                    <SpecificStarRating />
                                </div>
                                <div className={classes.customer_reviews_container}>
                                    <CustomerReview />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;