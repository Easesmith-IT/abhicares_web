import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./LoginSignupModal.module.css";
import axios from "axios";

import { AiOutlineClose } from "react-icons/ai";


import loader from "../../assets/rolling-white.gif";
import { getCartDetails } from "../../store/slices/cartSlice";
import toast from "react-hot-toast";

const LoginSignupModal = ({ isOpen, handleOnclick }) => {
  const dispatch = useDispatch();


  const [loginSignupInfo, setLoginSignupInfo] = useState({
    name: "",
    phone: "",
  });

  const [error, setError] = useState({
    message: null,
    from: null
  });

  const [successMessage, setSuccessMessage] = useState("");

  const [otp, setOtp] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoginOtp, setIsLoginOtp] = useState(false);
  const [isSignupOtp, setIsSignupOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClose = () => {
    handleOnclick();
    setIsLogin(true);
    setIsLoginOtp(false);
    setIsSignupOtp(false);
    setLoginSignupInfo({
      name: "",
      phone: "",
    });
    setError({
      message: null,
      from: null
    });
    setOtp("");
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginSignupInfo({ ...loginSignupInfo, [name]: value });
  };

  const handleLoginSignupChange = () => {
    setIsLogin(!isLogin);
    setLoginSignupInfo({
      name: "",
      phone: "",
    });
    setError({
      message: null,
      from: null
    });
  }

  const handleSignUp = async () => {
    if (!loginSignupInfo.name) {
      setError({ message: "Enter name", from: 'signup' });
      return;
    }

    if (!loginSignupInfo.phone) {
      setError({ message: "Enter phone number", from: 'signup' });
      return;
    }

    if (loginSignupInfo.phone.length !== 10) {
      setError({ message: "Enter a valid phone number", from: 'signup' });
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup-otp`,
        { ...loginSignupInfo },
        { withCredentials: true }
      );
      setIsLoading(false);
      console.log(data);
      setSuccessMessage(data?.message)
      // setLoginSignupInfo({
      //   name: "",
      //   phone: "",
      // });
      setIsSignupOtp(true);
    } catch (error) {
      setIsLoading(false);
      console.log('NON', error);
      setError({ message: error.response.data.message, from: 'signup' });
    }
  };

  const handleLogin = async () => {
    if (!loginSignupInfo.phone) {
      setError({ message: "Enter phone number", from: 'login' });
      return;
    }
    if (loginSignupInfo.phone.length !== 10) {
      setError({ message: "Enter a valid phone number", from: 'login' });
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate-otp`,
        { phoneNumber: loginSignupInfo.phone },
        { withCredentials: true }
      );
      console.log("login", data);
      setSuccessMessage(data?.message)
      setIsLoading(false);
      setIsLoginOtp(true);
      // setLoginSignupInfo({
      //   name: "",
      //   phone: "",
      // });
    } catch (error) {
      setIsLoading(false);
      console.log("EOEOE", error);
      setError({ message: error.response.data.message, from: "login" });
    }
  };

  const handleOtpVerification = async () => {
    setSuccessMessage("");
    if (!otp) {
      setError({ message: "Enter otp", from: 'login otp verification' });
      return;
    }

    if (otp.length !== 6) {
      setError({ message: "Enter a valid otp", from: 'login otp verification' });
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/verify-otp`,
        { enteredOTP: otp, phoneNumber: loginSignupInfo.phone },
        { withCredentials: true }
      );
      console.log("login otp verification", data);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userPhone", data.userPhone);
      await dispatch(getCartDetails());
      // window.location.reload();
      handleOnClose();

      setIsLoading(false);
      setIsLoginOtp(false);
      setOtp("");
    } catch (error) {
      setIsLoading(false);
      setError({ message: error?.response?.data?.message, from: 'login otp verification' });
      console.log(error);
    }
  };

  const handleSignupOtpVerification = async () => {
    setSuccessMessage("");
    if (!otp) {
      setError({ message: "Enter otp", from: 'signup otp verification' });
      return;
    }

    if (otp.length !== 6) {
      setError({ message: "Enter a valid otp", from: 'signup otp verification' });
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/verify-signup`,
        { enteredOTP: otp, phone: loginSignupInfo.phone },
        { withCredentials: true }
      );
      console.log("signup otp verification", data);
      await dispatch(getCartDetails());
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userPhone", data.userPhone);
      window.location.reload();
      handleOnClose();

      setIsLoading(false);
      setIsLoginOtp(false);
      setOtp("");
    } catch (error) {
      setError({ message: error?.response?.data?.message, from: 'signup otp verification' });
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close
        }`}
    >
      <div className={classes.modal_wrapper}>
        <button onClick={handleOnClose} className={classes.modal_close}>
          <AiOutlineClose size={20} />
        </button>
        <div className={classes.modal}>
          {!isSignupOtp && !isLoginOtp &&
            (isLogin ? (
              <>
                <p className={classes.login_signup_p}>Login</p>
                {!isLoading && error.from === 'login' && (
                  <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>
                )}
                <div className={classes.input_box}>
                  <input
                    onChange={handleOnChange}
                    value={loginSignupInfo.phone}
                    className={classes.input}
                    name="phone"
                    id="phone"
                    type="number"
                    placeholder="Enter mobile number"
                  />
                </div>

                <p className={classes.p}>
                  New user?
                  <button onClick={handleLoginSignupChange}>Sign up</button>
                </p>
                <button onClick={handleLogin} className={classes.button}>
                  {!isLoading && <span>Proceed</span>}
                  {isLoading && (
                    <span>
                      <img className={classes.img} src={loader} alt="loader" />
                      Processing...
                    </span>
                  )}
                </button>
              </>
            ) : (
              <>
                <p className={classes.login_signup_p}>Sign up</p>
                {!isLoading && error.from === 'signup' && (
                  <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>
                )}
                <div className={classes.input_box}>
                  <input
                    onChange={handleOnChange}
                    value={loginSignupInfo.name}
                    className={classes.input}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                  />
                </div>
                <div className={classes.input_box}>
                  <input
                    onChange={handleOnChange}
                    value={loginSignupInfo.phone}
                    className={classes.input}
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Enter mobile number"
                  />
                </div>
                <p className={classes.p}>
                  Already account?
                  <button onClick={handleLoginSignupChange}>Login</button>
                </p>
                <button onClick={handleSignUp} className={classes.button}>
                  {!isLoading && <span>Proceed</span>}
                  {isLoading && (
                    <span>
                      <img className={classes.img} src={loader} alt="loader" />
                      Processing...
                    </span>
                  )}
                </button>
              </>
            ))}

          {isLoginOtp && (
            <>
              <p className={classes.login_signup_p}>Verify Otp</p>
              {!isLoading && error.from === 'login otp verification' && (
                <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>
              )}

              {successMessage && (
                <p style={{ color: "green", textAlign: "center", marginTop: "8px" }}>{successMessage}</p>
              )}
              <div className={classes.input_box}>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  maxLength={6}
                  className={classes.input}
                  type="number"
                  placeholder="Enter Otp"
                />
              </div>
              <div className={classes.btn_wrapper}>
                <button onClick={handleLogin} className={classes.link}>Resend OTP</button>
              </div>
              <button
                onClick={handleOtpVerification}
                className={classes.button}
              >
                {!isLoading && <span>Proceed</span>}
                {isLoading && (
                  <span>
                    <img className={classes.img} src={loader} alt="loader" />
                    Processing...
                  </span>
                )}
              </button>
            </>
          )}

          {isSignupOtp && (
            <>
              <p className={classes.login_signup_p}>Verify Otp</p>
              {!isLoading && error.from === 'signup otp verification' && (
                <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>
              )}

              {successMessage && (
                <p style={{ color: "green", textAlign: "center", marginTop: "8px" }}>{successMessage}</p>
              )}

              <div className={classes.input_box}>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  className={classes.input}
                  type="number"
                  placeholder="Enter Otp"
                />
              </div>
              <div className={classes.btn_wrapper}>
                <button onClick={handleSignUp} className={classes.link}>Resend OTP</button>
              </div>
              <button
                onClick={handleSignupOtpVerification}
                className={classes.button}
              >
                {!isLoading && <span>Proceed</span>}
                {isLoading && (
                  <span>
                    <img className={classes.img} src={loader} alt="loader" />
                    Processing...
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
