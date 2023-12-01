import { AiOutlineClose } from "react-icons/ai";
import classes from "./AddressModal.module.css";

import { FaPlus } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import AddAddressModal from "../addAddressModal/AddAddressModal";

const AddressModal = ({ isOpen, setIsAddressModalOpen }) => {
    const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

    return (
        <>
            <div className={`${classes.modal_overlay} ${isOpen ? classes.modal_open : classes.modal_close}`}>
                <div className={classes.modal_wrapper}>
                    <button onClick={() => setIsAddressModalOpen()} className={classes.modal_close}>
                        <AiOutlineClose size={20} />
                    </button>
                    <div className={classes.modal}>
                        <p className={classes.p}>Saved address</p>
                        <button onClick={() => setIsAddAddressModalOpen(true)} className={classes.button}>
                            <FaPlus />
                            Add another address
                        </button>
                        <div className={classes.radio_wrapper}>
                            <div>
                                <input className={classes.radio} type="radio" name="" id="" />
                                <div>
                                    <h4>Home</h4>
                                    <p>address</p>
                                </div>
                            </div>
                            <CiMenuKebab />
                        </div>
                        <button className={classes.button}>Proceed</button>
                    </div>
                </div>
            </div>
            {isAddAddressModalOpen &&
                <AddAddressModal
                    setIsAddAddressModalOpen={setIsAddAddressModalOpen}
                    isOpen={isAddAddressModalOpen}
                />
            }
        </>
    );
};

export default AddressModal;