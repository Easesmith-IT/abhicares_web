import { AiOutlineClose } from "react-icons/ai";
import classes from "./AddAddressModal.module.css";

import { MdMyLocation } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddAddressModal = ({ isOpen, setIsAddAddressModalOpen, getAllAddress, Data = "" }) => {
    console.log("data", Data);
    const token = localStorage.getItem("token");
    // const user = useSelector(state => state.user);
    const userId = useSelector(state => state.user.userId);

    const [addressInfo, setAddressInfo] = useState({
        addressLine: Data.addressLine || "",
        pincode: Data.pincode || "",
        mobile: Data.mobile || "",
        landmark: Data.landmark,
        defaultAddress: Data.defaultAddress || false,
        // userId: userId,
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo({ ...addressInfo, [name]: value });
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!addressInfo.addressLine
            || !addressInfo.mobile
            || !addressInfo.pincode
        ) {
            return;
        }
        if (Data) {
            try {
                const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/update-user-address/${Data._id}`, { ...addressInfo }, { headers: { Authorization: token } });
                toast.success("Address updated successfully");
                getAllAddress();
                setIsAddAddressModalOpen(false);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-user-address`, { ...addressInfo }, { headers: { Authorization: token }, withCredentials: true });
                toast.success("Address created successfully");
                getAllAddress();
                setIsAddAddressModalOpen(false);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <>
            <div className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close}`}>
                <div className={classes.modal_wrapper}>
                    <button onClick={() => setIsAddAddressModalOpen(false)} className={classes.modal_close}>
                        <AiOutlineClose size={20} />
                    </button>
                    <div className={classes.modal}>
                        <form onSubmit={handleOnSubmit}>
                            <p className={classes.p}>{Data ? "Update" : "Add"} address</p>
                            <div className={classes.mt}>
                                <label htmlFor="addressLine">Address Line</label>
                                <div className={classes.input_box}>
                                    <input className={classes.input} onChange={handleOnChange} value={addressInfo.addressLine} type="text" name="addressLine" id="addressLine" placeholder="Enter address line" />
                                </div>
                            </div>
                            <div className={classes.mt}>
                                <label htmlFor="pincode">Pincode</label>
                                <div className={classes.input_box}>
                                    <input className={classes.input} onChange={handleOnChange} value={addressInfo.pincode} type="number" name="pincode" id="pincode" placeholder="Enter pincode" />
                                </div>
                            </div>
                            <div className={classes.mt}>
                                <label htmlFor="mobile">Mobile</label>
                                <div className={classes.input_box}>
                                    <input className={classes.input} onChange={handleOnChange} value={addressInfo.mobile} type="text" name="mobile" id="mobile" placeholder="Enter number" />
                                </div>
                            </div>
                            <div className={classes.mt}>
                                <label htmlFor="landmark">Landmark</label>
                                <div className={classes.input_box}>
                                    <input className={classes.input} onChange={handleOnChange} value={addressInfo.landmark} type="text" name="landmark" id="landmark" placeholder="Enter landmark" />
                                </div>
                            </div>
                            <div className={classes.mt}>
                                <label htmlFor="defaultAddress">Default Address</label>
                                <select className={`${classes.input_box} ${classes.defaultAddress}`} onChange={handleOnChange} value={addressInfo.defaultAddress} name="defaultAddress" id="defaultAddress">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                            <button className={classes.button}><MdMyLocation />use my current location</button>
                            <button type="submit" className={classes.button}>
                                {Data ? "Update" : "Proceed"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAddressModal;