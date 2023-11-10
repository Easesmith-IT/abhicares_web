/* eslint-disable react/prop-types */
import classes from "./Modal.module.css";

import { AiOutlineClose } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsStarFill } from "react-icons/bs";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Faqs from "./Faqs";
import CustomerReview from "./CustomerReview";
import SpecificStarRating from "./SpecificStarRating";
import HowItWorks from "./HowItWorks";

const Modal = ({isOpen,handleOnclick}) => {

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

    return (
        <div className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close}`}>
            <div className={classes.modal_wrapper}>
                <button onClick={handleOnclick} className={classes.modal_close}>
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal_wrapper_overflow}>
                    <div className={classes.modal}>
                        <Carousel responsive={responsive} arrows={false} showDots className={classes.carousel} customButtonGroup={<ButtonGroup />} >
                            <img className={classes.carousel_img} src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_520,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1682674566217-2c8752.jpeg" alt="" />
                            <img className={classes.carousel_img} src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_520,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1682674566217-2c8752.jpeg" alt="" />
                        </Carousel>
                        <div className={classes.modal_body}>
                            <div className={classes.border_bottom}>
                                <div className={classes.modal_header}>
                                    <div className={classes.modal_header_left}>
                                        <h4 className={classes.modal_header_left_h4}>Deep clean AC service (split)</h4>
                                        <div className={classes.rating}>
                                            <BsStarFill color="gray" size={11} />
                                            <span className={classes.rating_span}>4.83 (1.2M)</span>
                                        </div>
                                        <div className={classes.price_time_container}>
                                            <div className={classes.price}>₹669</div>
                                            <div className={classes.dot_time_container}>
                                                <div className={classes.dot}></div>
                                                <span className={classes.time}>45 mins</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.modal_header_right}>
                                        <button className={classes.button}>Add</button>
                                    </div>
                                </div>
                                <div className={classes.box}>
                                    <div className={classes.box_left}>
                                        <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_94,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/customer-subscription/1693221423328-595820.jpeg" alt="" />
                                        <p className={classes.box_left_p}>Standard rate card</p>
                                    </div>
                                    <FiChevronRight size={23} />
                                </div>
                            </div>

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