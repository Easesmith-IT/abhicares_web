import { AiOutlineClose } from "react-icons/ai";
import classes from "./LoginSignupModal.module.css";
import { useDispatch } from "react-redux";
import { changeUserStatus } from "../../store/slices/userSlice";
import axios from "axios";
import { useState } from "react";

const LoginSignupModal = ({ isOpen, handleOnclick }) => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true)
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    const handleLogin = async () => {
        if (!phone) {
            return;
        }
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/generate-otp`, { phoneNumber:phone },{withCredentials:true});
            console.log(data);
            setIsLogin(false);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleOtpVerification = async () => {
        if (!otp) {
            return;
        }
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/verify-otp`,{otp},{withCredentials:true});
            dispatch(changeUserStatus(true));
            handleOnclick();
            console.log(data);
            setIsLogin(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close}`}>
            <div className={classes.modal_wrapper}>
                <button onClick={handleOnclick} className={classes.modal_close}>
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal}>
                    {isLogin ?
                        <>
                            <p className={classes.login_signup_p}>Login/Sign up</p>
                            <div className={classes.input_box}>
                                <input onChange={(e) => setPhone(e.target.value)} value={phone} className={classes.input} type="text" placeholder="Enter mobile number" />
                            </div>
                            <div className={classes.checkbox_wrapper}>
                                <input className={classes.checkbox} type="checkbox" name="" id="" />
                                <p className={classes.checkbox_p}>Get order updates on Whatsapp</p>
                            </div>
                            <button onClick={handleLogin} className={classes.button}>Proceed</button>
                        </>
                        : <>
                            <p className={classes.login_signup_p}>Verify Otp</p>
                            <div className={classes.input_box}>
                                <input onChange={(e) => setOtp(e.target.value)} value={otp} className={classes.input} type="text" placeholder="Enter Otp" />
                            </div>
                            <button onClick={handleOtpVerification} className={classes.button}>Proceed</button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default LoginSignupModal;