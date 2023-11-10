import { AiOutlineClose } from "react-icons/ai";
import classes from "./LoginSignupModal.module.css";

const LoginSignupModal = ({ isOpen, handleOnclick }) => {

    return (
        <div className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close}`}>
            <div className={classes.modal_wrapper}>
                <button onClick={handleOnclick} className={classes.modal_close}>
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal}>
                    <p className={classes.login_signup_p}>Login/Sign up</p>
                    <div className={classes.input_box}>
                        <input className={classes.input} type="text" placeholder="Enter mobile number" />
                    </div>
                    <div className={classes.checkbox_wrapper}>
                        <input className={classes.checkbox} type="checkbox" name="" id="" />
                        <p className={classes.checkbox_p}>Get order updates on Whatsapp</p>
                    </div>
                    <button className={classes.button}>Proceed</button>
                </div>
            </div>
        </div>
    );
};

export default LoginSignupModal;