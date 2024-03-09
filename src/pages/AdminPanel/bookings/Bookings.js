import axios from 'axios';
import Wrapper from '../../Wrapper'
// import classes from './Bookings.module.css'
import classes from "../Shared.module.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../../components/loader/Loader';
import { format } from 'date-fns';
import MonthlyOrderModal from '../../../components/monthly-order-modal/MonthlyOrderModal';

const Bookings = () => {
    const [allBookings, setAllBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    const getAllBookings = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_ADMIN_API_URL}/get-booking-list`,
                { withCredentials: true }
            );

            setAllBookings(data.data);
            console.log("allBookings", data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllBookings();
    }, [])


    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Bookings</h1>
                        {/* <div className={classes.d_flex}>
                            <input onChange={handleOnChange} type="month" name="month" id="month" />
                            <button onClick={handleOnSubmit}>Submit</button>
                        </div> */}
                    </div>

                    <div className={classes["report-body"]}>
                        <div className={classes["report-topic-heading"]}>
                            <h3 className={classes["t-op"]}>Booking Date</h3>
                            <h3 className={`${classes["t-op"]}`}>Status</h3>
                            <h3 className={`${classes["t-op"]}`}>Booking Value</h3>
                            <h3 className={classes["t-op"]}>Details</h3>
                        </div>

                        <div className={classes.items}>
                            {!isLoading && allBookings?.length === 0 && <p>No bookings found</p>}

                            {isLoading && allBookings?.length === 0 && <Loader />}

                            {allBookings?.map((order, i) => (
                                <div key={i} className={`${classes.item1} ${classes.cursor}`}>
                                    <h3 className={classes["t-op-nextlvl"]}><span style={{color:'green'}}>{order.autoAssigned && 'auto'}</span> {format(new Date(order.createdAt), "dd-MM-yyyy")}</h3>
                                    
                                    <h3 className={`${classes["t-op-nextlvl"]} ${classes.status} ${order.status === "cancelled" ? classes.Cancelled : order.status === "completed" ? classes.Completed : order.status === "alloted" ? classes.alloted : classes.OutOfDelivery}`}>{order.status}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{order.orderValue}</h3>
                                    <h3 className={classes["t-op-nextlvl"]}>
                                        <button onClick={() => navigate(`/admin/bookings/${order._id}`, { state: order })} className={classes.button}>View Details</button>
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Wrapper >
        </>
    )
}

export default Bookings