import classes from "../../pages/productPage/ProductPage.module.css";

import { BsStarFill } from "react-icons/bs";
import { BiMinus, BiPackage, BiPlus } from "react-icons/bi";
import { useState } from "react";
import Modal from "../productInfoModal/Modal";

const SubService = ({ singlePackage, serviceId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnclick = async () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <div className={classes.sub_service}>
                <button className={classes.badge}>
                    <BiPackage color="#12acac" />
                    <span className={classes.badge_span}>Package</span>
                </button>
                <div className={classes.info_container}>
                    <div className={classes.info_container_left}>
                        <h4 className={classes.sub_service_h4}>{singlePackage.name}</h4>
                        <div className={classes.booking}>
                            <div className={`${classes.star_container} ${classes.sub_service_star_container}`}>
                                <BsStarFill color="white" size={10} />
                            </div>
                            <span className={`${classes.booking_span} ${classes.sub_service_booking_span}`}>4.81 (1M reviews)</span>
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
                        <button className={classes.button}>
                            <BiMinus cursor="pointer" />
                            <span>1</span>
                            <BiPlus cursor="pointer" />
                        </button>
                    </div>
                </div>
                <div className={classes.dashed_underline}></div>
                <ul className={classes.list_container}>
                    <li className={classes.list}>
                        <span className={classes.list_first_span}>Facial: </span>
                        <span className={classes.list_second_span}>Crave beauty hydrating banana facial</span>
                    </li>
                    <li className={classes.list}>
                        <span className={classes.list_first_span}>Facial: </span>
                        <span className={classes.list_second_span}>Crave beauty hydrating banana facial</span>
                    </li>
                </ul>
                <button onClick={handleOnclick} className={classes.package_button}>View details</button>
            </div>
            {isOpen && <Modal
                isOpen={isOpen}
                handleOnclick={handleOnclick}
                Data={singlePackage}
                serviceId={serviceId}
            />}
        </>
    );
};

export default SubService;