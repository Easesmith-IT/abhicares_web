import { AiOutlineClose } from "react-icons/ai";
import classes from "./AddressModal.module.css";

import { FaPlus } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import AddAddressModal from "../addAddressModal/AddAddressModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Address from "./Address";

const AddressModal = ({ isOpen, setIsAddressModalOpen }) => {
    const user = useSelector(state => state.user);
    const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
    const [allAddress, setAllAddress] = useState([]);

    const getAllAddress = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/get-user-address/${user?.userId}`,
                { withCredentials: true }
            );
            setAllAddress(data.data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllAddress();
    }, [])


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
                        <div className={classes.container}>
                            {allAddress?.map((data) => (
                                <Address
                                    key={data._id}
                                    data={data}
                                    getAllAddress={getAllAddress}
                                />
                            ))}
                        </div>

                        <button className={classes.button}>Proceed</button>
                    </div>
                </div>
            </div>
            {isAddAddressModalOpen &&
                <AddAddressModal
                    setIsAddAddressModalOpen={setIsAddAddressModalOpen}
                    isOpen={isAddAddressModalOpen}
                    getAllAddress={getAllAddress}
                />
            }
        </>
    );
};

export default AddressModal;