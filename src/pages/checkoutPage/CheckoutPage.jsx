import { useEffect, useState } from "react";

import classes from "./CheckoutPage.module.css";

import logo from "../../assets/Main Logo V1-02.png";

import { AiOutlinePercentage } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Carousel from "react-multi-carousel";

import CartItem from "../../components/checkout/CartItem";
import FrequentlyAddedItems from "../../components/checkout/FrequentlyAddedItems";
import LoginSignupModal from "../../components/loginSignupModal/LoginSignupModal";
import { useDispatch, useSelector } from "react-redux";
import AddressModal from "../../components/addressModal/AddressModal";
import { getCartDetails } from "../../store/slices/cartSlice";

const CheckoutPage = () => {
    const { isUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getCartDetails());
        })()
    }, [])

    const cart = useSelector(state => state.cart);
    console.log(cart);

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

    const [isOpen, setIsOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const handleOnclick = () => {
        setIsOpen(!isOpen);
    };

    console.log('cart==',cart)

    return (
        <>
            <div>
                {/* <div className={classes.header}>
                    <div className={classes.container}>
                        <img src={logo} alt="logo" className={classes.logo_img} />
                    </div>
                </div> */}

                <div className={`${classes.container} ${classes.checkout_container}`}>
                    <div className={classes.login_button_container}>
                        {!isUser &&
                            <>
                                <p className={classes.heading}>Account</p>
                                <p className={classes.p}>To book the service, please login or sign up</p>
                                <button onClick={handleOnclick} className={classes.button}>Login</button>
                            </>
                        }
                        {isUser &&
                            <button onClick={() => setIsAddressModalOpen(true)} className={`${classes.button}`}>Select an address</button>
                        }
                    </div>

                    <div className={classes.cart_checkout_container}>
                        <div className={classes.cart}>
                            <div className={classes.cart_items_container}>
                                {cart?.items?.map((item) => (
                                    <CartItem
                                        key={item._id}
                                        item={item}
                                    />
                                ))}
                            </div>
                            <div className={classes.frequently_added}>
                                <h4 className={classes.frequently_added_heading}>Frequently added together</h4>
                                <Carousel responsive={responsive} arrows={false} className={classes.carousel} customButtonGroup={<ButtonGroup />} >
                                    <FrequentlyAddedItems />
                                </Carousel>
                            </div>

                            <div className={classes.checkbox_wrapper}>
                                <input className={classes.checkbox} type="checkbox" name="" id="" />
                                <p className={classes.checkbox_p}>Avoid calling before reaching the location</p>
                            </div>
                        </div>

                        <div className={classes.offer_box}>
                            <div className={classes.logo_box}>
                                <AiOutlinePercentage size={20} />
                            </div>
                            <div>
                                <p className={classes.offer_p}>Coupons and offers</p>
                                <p className={classes.offer_p}>Login/Sign up to view offers</p>
                            </div>
                        </div>
                        <div className={classes.payment_summary}>
                            <h4 className={classes.payment_summary_h4}>Payment Summary</h4>
                            <div className={classes.payment_summary_div}>
                                <p className={classes.payment_summary_p}>Item total</p>
                                <p className={classes.payment_summary_p}>₹299</p>
                            </div>
                            <div className={classes.payment_summary_div}>
                                <p className={classes.payment_summary_p}>Tax and Fee</p>
                                <p className={classes.payment_summary_p}>₹59</p>
                            </div>
                            <div className={classes.payment_summary_div}>
                                <p className={classes.payment_summary_p}>Total</p>
                                <p className={classes.payment_summary_p}>₹358</p>
                            </div>
                        </div>

                        <div className={classes.amount_to_pay_box}>
                            <h4 className={classes.amount_to_pay_box_h4}>
                                Amount to pay
                            </h4>
                            <div>
                                <p className={classes.amount_to_pay}>₹{cart.totalPrice}</p>
                                <button className={classes.view_break_up_button}>View breakup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoginSignupModal
                isOpen={isOpen}
                handleOnclick={handleOnclick}
            />
            {isAddressModalOpen &&
                <AddressModal
                    isOpen={isAddressModalOpen}
                    setIsAddressModalOpen={setIsAddressModalOpen}
                />}
        </>
    );
};

export default CheckoutPage;