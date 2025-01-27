import { format } from 'date-fns';
import classes from './DateTimeModal.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const DateTimeModal = ({ setIsModalOpen, isModalOpen, setInfo, info, handleOnSubmit }) => {
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    }


    const getMaxDate = () => {
        const today = new Date();
        today.setDate(today.getMonth() + 30);
        return format(today, "yyyy-MM-dd");
    }

    const getTodaysDate = () => format(new Date(), "yyyy-MM-dd");

    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5); // Format as HH:mm
    };


    return (
        <div className={`${classes.modal_overlay} ${isModalOpen ? classes.modal_open : classes.modal_close}`}>
            <div className={classes.modal_wrapper}>
                <button onClick={() => setIsModalOpen(false)} className={classes.modal_close}>
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal}>
                    <form onSubmit={handleOnSubmit}>
                        <p className={classes.p}>Select Time and Date</p>
                        <div className={classes.mt}>
                            <label htmlFor="bookingDate">Booking Date</label>
                            <div className={classes.input_box}>
                                <input className={classes.input} onChange={handleOnChange} value={info.bookingDate} type="date" max={getMaxDate()} min={format(new Date(), "yyyy-MM-dd")} name="bookingDate" id="bookingDate" placeholder="Enter booking date" />
                            </div>
                        </div>
                        <div className={classes.mt}>
                            <label htmlFor="bookingTime">Booking Time</label>
                            <div className={classes.input_box}>
                                <input
                                    className={classes.input}
                                    onChange={handleOnChange}
                                    value={info.bookingTime}
                                    type="time"
                                    name="bookingTime"
                                    id="bookingTime"
                                    placeholder="Enter booking time"
                                    min={info.bookingDate === getTodaysDate() ? getCurrentTime() : "00:00"}
                                />
                            </div>
                        </div>
                        <button className={classes.button}>Proceed</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DateTimeModal