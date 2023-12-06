import { AiOutlineClose } from "react-icons/ai";
import classes from "./AddAddressModal.module.css";

import { MdMyLocation } from "react-icons/md";
import { useState } from "react";

const AddAddressModal = ({ isOpen, setIsAddAddressModalOpen }) => {
    const [addressInfo, setAddressInfo] = useState({
        addressLine1: "",
        pincode: "",
        mobile: "",
        defaultAddress: true,
        userId: "6569afcdb623de5228b7832d"
    })
    return (
        <>
            <div className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close}`}>
                <div className={classes.modal_wrapper}>
                    <button onClick={() => setIsAddAddressModalOpen()} className={classes.modal_close}>
                        <AiOutlineClose size={20} />
                    </button>
                    <div className={classes.modal}>
                        <p className={classes.p}>Add address</p>
                        <div className={classes.input_box}>
                            <input className={classes.input} type="text" placeholder="Enter address line" />
                        </div>
                        <div className={classes.input_box}>
                            <input className={classes.input} type="number" placeholder="Enter pincode" />
                        </div>
                        <div className={classes.input_box}>
                            <input className={classes.input} type="text" placeholder="Enter number" />
                        </div>
                        {/* <div className={classes.radio_wrapper}>
                            <div>
                                <input className={classes.radio} type="radio" name="" id="" />
                                <div>
                                    <h4>Home</h4>
                                    <p>address</p>
                                </div>
                            </div>
                            <CiMenuKebab />
                        </div> */}
                        <button className={classes.button}><MdMyLocation />use my current location</button>
                        <button className={classes.button}>Proceed</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAddressModal;