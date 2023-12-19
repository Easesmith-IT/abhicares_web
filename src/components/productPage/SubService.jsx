import classes from "../../pages/productPage/ProductPage.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { BsStarFill } from "react-icons/bs";
import { BiMinus, BiPackage, BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import loaderClasses from '../loader/Loader.module.css'
import loader from "../../assets/rolling-white.gif"
import Modal from "../productInfoModal/Modal";
import {
    addItemToCart,
    deleteItemFromCart,
    getCartDetails,
} from "../../store/slices/cartSlice";
const SubService = ({ singlePackage, serviceId,setIsCartLoading }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [productInCart, setProductInCart] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getCartDetails());
        })()
    }, [])

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        const filtered = cart?.items?.find((item) => item?.packageId?._id === singlePackage._id);
        setProductInCart(filtered);
    }, [getCartDetails, cart])

    const handleOnclick = async () => {
        setIsOpen(!isOpen);
    };

    const handleAddToCart = async () => {
        setIsLoading(true);
        setIsCartLoading(true);
        await dispatch(addItemToCart({ id: singlePackage._id,type:"package" }))
        await dispatch(getCartDetails());
        setIsLoading(false);
        setIsCartLoading(false);
    }

    const handleOnPlusClick = async () => {
        await dispatch(
            addItemToCart({ id: productInCart?.packageId?._id,type:"package" })
        );
        await dispatch(getCartDetails());
    }

    const handleOnMinusClick = async () => {
        await dispatch(
            deleteItemFromCart({ itemId: productInCart.packageId._id,type:"package" })
        );
        await dispatch(getCartDetails());
    }
    return (
        <>
            <div className={classes.sub_service}>
                <button className={classes.badge} style={{ marginBottom: '20px' }}>
                    <BiPackage color="#12ACAC" />
                    <span className={classes.badge_span}>Packages</span>
                </button>
                <div className={classes.info_container}>
                    <div className={classes.info_container_left}>
                        <h5 className={classes.sub_service_h4}>{singlePackage.name}</h5>
                        <div className={classes.booking}>
                            {/* <div className={`${classes.star_container} ${classes.sub_service_star_container}`}>
                                <BsStarFill color="white" size={10} />
                            </div> */}
                            {/* <span className={`${classes.booking_span} ${classes.sub_service_booking_span}`}>4.81 (1M reviews)</span> */}
                        </div>
                        <p className={classes.price_time_container}>
                            <div className={classes.price_cotainer}>
                                <span className={classes.price}>₹{singlePackage.price}</span>
                                <span className={classes.price}>₹{singlePackage.offerPrice}</span>
                            </div>
                            {/* <div className={classes.dot_time_container}>
                            <div className={classes.dot}></div>
                            <span className={classes.time}>1 hr 20 mins</span>
                        </div> */}
                        </p>
                    </div>
                    <div>
                        {/* <button className={classes.button}>
                            <BiMinus cursor="pointer" />
                            <span>1</span>
                            <BiPlus cursor="pointer" />
                        </button> */}
                        {cart?.items?.find((item) => item?.packageId?._id === singlePackage?._id) ?
                            <button className={classes.button}>
                                <BiMinus size={20} onClick={handleOnMinusClick} />
                                <span className={classes.quantity}>{productInCart?.quantity}</span>
                                <BiPlus size={20} onClick={handleOnPlusClick} />
                            </button>
                            : <button 
                            onClick={handleAddToCart} 
                            className={`${classes.addToCartBtn}`}>{isLoading ?
                                <div className={loaderClasses.img_container}>
                                    <img src={loader} alt="loader" />
                                    Adding...
                                </div>: "Add"}</button>
                        }

                    </div>
                </div>
                {/* <div className={classes.dashed_underline}></div> */}
                {/* <ul className={classes.list_container}>
                    <li className={classes.list}>
                        <span className={classes.list_first_span}>Facial: </span>
                        <span className={classes.list_second_span}>Crave beauty hydrating banana facial</span>
                    </li>
                    <li className={classes.list}>
                        <span className={classes.list_first_span}>Facial: </span>
                        <span className={classes.list_second_span}>Crave beauty hydrating banana facial</span>
                    </li>
                </ul> */}
                <button onClick={handleOnclick} className={classes.package_button}>View details</button>
            </div>
            {isOpen && <Modal
                isProduct={false}
                isOpen={isOpen}
                handleOnclick={handleOnclick}
                Data={singlePackage}
                serviceId={serviceId}
            />}
        </>
    );
};
export default SubService;