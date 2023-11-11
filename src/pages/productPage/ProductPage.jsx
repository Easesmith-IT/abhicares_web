import classes from "./ProductPage.module.css";

import SubService from "../../components/productPage/SubService";
import Service from "../../components/productPage/Service";

import { BsStarFill } from "react-icons/bs";
import { AiOutlinePercentage } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import Modal from "../../components/productInfoModal/Modal";
import { useState } from "react";
import CartItem from "../../components/checkout/CartItem";

const ProductPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOnclick = async () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <section className={classes.product_page}>
                <div className={classes.container}>
                    <h1 className={classes.heading}>Salon Classic</h1>
                    <div className={classes.booking}>
                        <div className={classes.star_container}>
                            <BsStarFill color="white" size={15} />
                        </div>
                        <span className={classes.booking_span}>4.83 (4.0 M bookings)</span>
                    </div>

                    <div className={classes.min_lg_hidden}>
                        <div className={classes.offer}>
                            <div className={classes.offer_left_div}>
                                <div className={classes.offer_img_outer_div}>
                                    <AiOutlinePercentage color="white" size={20} />
                                </div>
                            </div>
                            <div className={""}>
                                <p className={classes.offer_left_div_p}>20% of on Kotak Silk cards</p>
                                <p className={`${classes.offer_left_div_p} ${classes.offer_left_div_first_p}`}>20% of up to INR 350</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.wrapper}>
                        <Service />
                        <div className={classes.selected_service}>
                            <h2 className={classes.selected_service_h2}>Bestseller Packages</h2>
                            <div className={classes.sub_services_container}>
                                <SubService
                                    handleOnclick={handleOnclick}
                                />
                                <SubService
                                    handleOnclick={handleOnclick}
                                />
                            </div>
                        </div>
                        <div className={classes.sm_cart}>
                            <span className={classes.sm_cart_span}>₹669</span>
                            <button className={`${classes.button} ${classes.view_cart_button}`}>
                                View Cart
                            </button>
                        </div>
                        <div className={`${classes.right_section} ${classes.max_lg_hidden}`}>
                            <div className={classes.cart_detail_box}>
                                <button className={`${classes.button} ${classes.view_cart_button}`}>
                                    <span>₹669</span>
                                    <span>View Cart</span>
                                </button>
                                <CartItem />
                                <button className={`${classes.button} ${classes.right_section_common_button}`}>Edit</button>
                            </div>
                            <div className={classes.offer_container}>
                                <div className={classes.offer}>
                                    <div className={classes.offer_left_div}>
                                        <div className={classes.offer_img_outer_div}>
                                            <AiOutlinePercentage color="white" size={20} />
                                        </div>
                                    </div>
                                    <div className={""}>
                                        <p className={classes.offer_left_div_p}>20% of on Kotak Silk cards</p>
                                        <p className={`${classes.offer_left_div_p} ${classes.offer_left_div_first_p}`}>20% of up to INR 350</p>
                                    </div>
                                </div>
                                <button className={`${classes.button} ${classes.right_section_common_button}`}>
                                    View More Offers
                                    <FiChevronDown size={21} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={isOpen}
                handleOnclick={handleOnclick}
            />
        </>
    );
};

export default ProductPage;