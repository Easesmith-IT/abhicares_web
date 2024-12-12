import { useState } from 'react';
import classes from './SendNotificationModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { generateTimeOptions } from '../../utils/generateTimeOptions';

const SendNotificationModal = ({ setIsModalOpen, getNotifications }) => {
    const [notificationInfo, setNotificationInfo] = useState({
        image: "",
        imagePrev: "",
        title: "",
        desc: "",
        timingType: "",
        time: "",
        date: "",
    });

    const timeOptions = generateTimeOptions();

    const imageChangeHandler = (e) => {
        const file = e.target.files[0];
        console.log(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
            console.log(this.result);
            setNotificationInfo({ ...notificationInfo, image: file, imagePrev: this.result });
        });
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setNotificationInfo({ ...notificationInfo, [name]: value });
    }
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    console.log("notificationInfo", notificationInfo);
    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!notificationInfo.title
                || !notificationInfo.desc
            ) {
                console.log("error");

                return;
            }

            const formData = new FormData();
            formData.append("title", notificationInfo.title);
            formData.append("description", notificationInfo.desc);
            formData.append("date", notificationInfo.date);
            formData.append("time", notificationInfo.time);
            formData.append("image", notificationInfo.image);

            setIsLoading(true)
            const { data } = await axios.post(`${import.meta.env.VITE_APP_ADMIN_API_URL}/send-notification`, formData);
            setIsLoading(false)
            console.log(data);
            toast.success("Notification sent successfully");
            getNotifications();
            setIsModalOpen(false);
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Send Notification</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.imageWrapper}>
                        {notificationInfo.imagePrev && (
                            <img
                                className={classes.image}
                                src={notificationInfo.imagePrev}
                                alt=""
                            />
                        )}
                        <div>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={imageChangeHandler}
                            />
                        </div>
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="title">Title</label>
                        <input className={classes.input} onChange={handleOnChange} value={notificationInfo.title} type="text" name="title" id="title" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="desc">Description</label>
                        <textarea className={classes.input} onChange={handleOnChange} value={notificationInfo.desc} name="desc" id="desc" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="timing">Timing</label>
                        <select
                            className={classes.input}
                            onChange={handleOnChange}
                            value={notificationInfo.timingType}
                            name="timingType"
                            id="timingType"
                        >
                            <option value="now">Now</option>
                            <option value="select">Choose Time</option>
                        </select>
                        {notificationInfo.timingType === "select" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <input className={classes.input} onChange={handleOnChange} value={notificationInfo.date} type="date" name="date" id="date" />
                            <input className={classes.input} onChange={handleOnChange} value={notificationInfo.time} type="time" name="time" id="time" />
                        </div>}

                    </div>
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{isLoading ? "Sending..." : "Send"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SendNotificationModal