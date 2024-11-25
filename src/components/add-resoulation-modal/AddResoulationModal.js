import { useState } from 'react';
import classes from './AddResoulationModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';

const AddResoulationModal = ({ setIsModalOpen, id, getAllIssues }) => {
    const [resoulationInfo, setResoulationInfo] = useState({
        status: "",
        resolution: "",
        ticketId: id,
    });
    const { checkAuthorization } = useAuthorization();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setResoulationInfo({ ...resoulationInfo, [name]: value });
    }
    const navigate = useNavigate()


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!resoulationInfo.resolution || !resoulationInfo.status) {
            return;
        }
        try {
            const { data } = await axios.patch(`${process.env.REACT_APP_ADMIN_API_URL}/update-ticket`, { ...resoulationInfo }, { withCredentials: true });
            toast.success("Ticket updated successfully");
            getAllIssues();
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            setIsModalOpen(false);
            checkAuthorization(error);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Add Resoulation</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="status">Status</label>
                        {/* <input className={classes.input} onChange={handleOnChange} value={resoulationInfo.resolution} type="text" name="resolution" id="resolution" /> */}
                        <select
                        name='status'
                            value={resoulationInfo.status}
                            onChange={handleOnChange}
                            className={classes.input}
                        >
                            <option value="">Select status</option>
                            <option value="raised">Raised</option>
                            <option value="in-progress">In progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className={classes.input_container}>
                        <label htmlFor="resolution">Resolution</label>
                        <input className={classes.input} onChange={handleOnChange} value={resoulationInfo.resolution} type="text" name="resolution" id="resolution" />
                    </div>
                    <div className={classes.button_wrapper}>
                        <button onClick={handleOnSubmit} className={classes.button}>Resolve</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddResoulationModal