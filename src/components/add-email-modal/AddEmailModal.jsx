import { AiOutlineClose } from 'react-icons/ai';
import classes from './AddEmailModal.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import usePostApiReq from '../../hooks/usePostApiReq';

const AddEmailModal = ({ isAddEmailModalOpen, setIsAddEmailModalOpen, getProfileDetails }) => {
    const [email, setEmail] = useState("");
    const { res: addEmailRes, fetchData: addEmail, isLoading } = usePostApiReq();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };

    const handleEmailUpdate = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter email address");
            return;
        }

        addEmail(`/shopping/update-email`, { email });
    }

    useEffect(() => {
        if (addEmailRes?.status === 200 || addEmailRes?.status === 201) {
            toast.success("Email added successfully");
            setIsAddEmailModalOpen(false);
            getProfileDetails();
        }
    }, [addEmailRes])

    return (
        <div
            className={`${classes.modal_overlay} ${isAddEmailModalOpen ? classes.modal_open : classes.modal_close
                }`}
        >
            <div className={classes.modal_wrapper}>
                <button
                    onClick={() => setIsAddEmailModalOpen(false)}
                    className={classes.modal_close}
                >
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal}>
                    <form onSubmit={handleEmailUpdate}>
                        <p className={classes.p}>Add Email</p>
                        <div className={classes.mt}>
                            <label htmlFor="email">Email</label>
                            <div className={classes.input_box}>
                                <input
                                    className={classes.input}
                                    onChange={handleOnChange}
                                    value={email}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>
                        <button type="submit" className={classes.button}>
                            {isLoading ? "Loading..." : "Add"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEmailModal