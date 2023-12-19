import { useDispatch } from 'react-redux';
import classes from './LogoutModal.module.css'

import { MdOutlineWarning } from "react-icons/md";
import { changeUserStatus } from "../../store/slices/userSlice";
import { getCartDetails } from "../../store/slices/cartSlice";
import axios from 'axios';


function LogoutModal({ setIsLogoutModalOpen,handleLogout }) {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();


    return (
        <div className={classes.modal_wrapper}>
            <div className={classes.modal}>
                <p><MdOutlineWarning color='red' size={20} />Are you sure to logout ?</p>
                <div className={classes.button_wrapper}>
                    <button onClick={handleLogout} className={classes.button}>Yes</button>
                    <button onClick={() => setIsLogoutModalOpen(false)} className={classes.button}>No</button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal