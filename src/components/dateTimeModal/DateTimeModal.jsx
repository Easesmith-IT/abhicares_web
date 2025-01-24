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
                            {/* <select onChange={handleOnChange} value={info.bookingTime} className={`${classes.input_box} ${classes.padding}`} name='bookingTime' id='bookingTime'>
                                <option value="">Select time (08:00AM - 08:00PM)</option>
                                <option value="08:00AM">08:00 AM</option>
                                <option value="09:00AM">09:00 AM</option>
                                <option value="10:00AM">10:00 AM</option>
                                <option value="11:00AM">11:00 AM</option>
                                <option value="12:00PM">12:00 PM</option>
                                <option value="01:00PM">01:00 PM</option>
                                <option value="02:00PM">02:00 PM</option>
                                <option value="03:00PM">03:00 PM</option>
                                <option value="04:00PM">04:00 PM</option>
                                <option value="05:00PM">05:00 PM</option>
                                <option value="06:00PM">06:00 PM</option>
                                <option value="07:00PM">07:00 PM</option>
                                <option value="08:00PM">08:00 PM</option>
                            </select> */}
                            <div className={classes.input_box}>
                                <input className={classes.input} onChange={handleOnChange} value={info.bookingTime} type="time" name="bookingTime" id="bookingTime" placeholder="Enter booking time" />
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