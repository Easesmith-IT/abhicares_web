import React from 'react'
import classes from "./DeleteAccountModal.module.css";
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const DeleteAccountModal = ({ isOpen, setIsDeleteModalOpen }) => {
    const navigate = useNavigate();
    const handleClose = () => {
        setIsDeleteModalOpen(false);
        navigate("/")
    }
    return (
        <div
            className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close
                }`}
        >
            <div className={classes.modal_wrapper}>
                <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className={classes.modal_close}
                >
                    <AiOutlineClose color='black' size={20} />
                </button>
                <div className={classes.modal}>
                    <h4>Account will be delete in 24 hours</h4>
                    <button onClick={handleClose} className={classes.btn}>Ok</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountModal