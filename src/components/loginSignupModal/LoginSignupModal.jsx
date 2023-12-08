import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserStatus } from "../../store/slices/userSlice";
import classes from "./LoginSignupModal.module.css";
import axios from "axios";

import { AiOutlineClose } from "react-icons/ai";

import loader from "../../assets/rolling-white.gif";
import { getCartDetails } from "../../store/slices/cartSlice";

const LoginSignupModal = ({ isOpen, handleOnclick }) => {
    const dispatch = useDispatch();

    const [loginSignupInfo, setLoginSignupInfo] = useState({
        name: "",
        phone: "",
    })

    const [otp, setOtp] = useState("");
    const [isLogin, setIsLogin] = useState(true)
    const [isOtp, setIsOtp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginSignupInfo({ ...loginSignupInfo, [name]: value })
    }

    const handleSignUp = async () => {
        if (!loginSignupInfo.phone
            || !loginSignupInfo.name
        ) {
            return;
        }
        try {
            setIsLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-user  `, { ...loginSignupInfo }, { withCredentials: true });
            setIsLoading(false);
            console.log(data);
            setLoginSignupInfo({});
            setIsOtp(true);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const handleLogin = async () => {
        if (!loginSignupInfo.phone) {
            return;
        }
        try {
            setIsLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/generate-otp`, { phoneNumber: loginSignupInfo.phone }, { withCredentials: true });
            // console.log()
            console.log('gener', data);
            setIsLoading(false);
            setIsOtp(true);
            setLoginSignupInfo({});

        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const handleOtpVerification = async () => {
        if (!otp) {
            return;
        }
        try {
            setIsLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/verify-otp`, { enteredOTP: otp }, { withCredentials: true });
            console.log("verify otp", data);
            localStorage.setItem("userId", data.data);
            // dispatch(changeUserStatus({ status: true, userId: data.data }));
            dispatch(getCartDetails())
            handleOnclick();

            setIsLoading(false);
            setIsOtp(false);
            setOtp("");
        } catch (error) {
            setIsLoading(false);
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
                    {!isOtp && (isLogin ?
                        <>
                            <p className={classes.login_signup_p}>Login</p>
                            <div className={classes.input_box}>
                                <input onChange={handleOnChange} value={loginSignupInfo.phone} className={classes.input} name="phone" id="phone" type="text" placeholder="Enter mobile number" />
                            </div>
                            <p className={classes.p}>
                                New user?
                                <button onClick={() => setIsLogin(!isLogin)}>Sign up</button>
                            </p>
                            <button onClick={handleLogin} className={classes.button}>
                                {!isLoading && <span>Proceed</span>}
                                {isLoading && <span>
                                    <img className={classes.img} src={loader} alt="loader" />
                                    Processing...
                                </span>}
                            </button>
                        </>
                        : <>
                            <p className={classes.login_signup_p}>Sign up</p>
                            <div className={classes.input_box}>
                                <input onChange={handleOnChange} value={loginSignupInfo.name} className={classes.input} type="text" name="name" id="name" placeholder="Enter name" />
                            </div>
                            <div className={classes.input_box}>
                                <input onChange={handleOnChange} value={loginSignupInfo.phone} className={classes.input} type="text" name="phone" id="phone" placeholder="Enter mobile number" />
                            </div>
                            <p className={classes.p}>
                                Already account?
                                <button onClick={() => setIsLogin(!isLogin)}>Login</button>
                            </p>
                            <button onClick={handleSignUp} className={classes.button}>
                                {!isLoading && <span>Proceed</span>}
                                {isLoading && <span>
                                    <img className={classes.img} src={loader} alt="loader" />
                                    Processing...
                                </span>}
                            </button>
                        </>)
                    }

                    {isOtp &&
                        <>
                            <p className={classes.login_signup_p}>Verify Otp</p>
                            <div className={classes.input_box}>
                                <input onChange={(e) => setOtp(e.target.value)} value={otp} className={classes.input} type="text" placeholder="Enter Otp" />
                            </div>
                            <button onClick={handleOtpVerification} className={classes.button}>
                                {!isLoading && <span>Proceed</span>}
                                {isLoading && <span>
                                    <img className={classes.img} src={loader} alt="loader" />
                                    Processing...
                                </span>}
                            </button>
                        </>
                    }
                </div>
            </div>
        </div >
    );
};

export default LoginSignupModal;