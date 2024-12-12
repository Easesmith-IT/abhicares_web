import { AiOutlineClose } from 'react-icons/ai';
import classes from './AddEmailModal.module.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddEmailModal = ({ isAddEmailModalOpen, setIsAddEmailModalOpen, getProfileDetails }) => {
    const [email, setEmail] = useState("");

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

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_APP_API_URL}/update-email`, { email }, { withCredentials: true });
            console.log(data);
            toast.success("Email added successfully");
            setIsAddEmailModalOpen(false);
            getProfileDetails();
        } catch (error) {
            console.log(error);
        }
    }

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
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEmailModal