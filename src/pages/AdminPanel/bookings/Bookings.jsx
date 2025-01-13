import axios from 'axios';
import Wrapper from '../../Wrapper'
// import classes from './Bookings.module.css'
import classes from "../Shared.module.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../../components/loader/Loader';
import { format } from 'date-fns';
import MonthlyOrderModal from '../../../components/monthly-order-modal/MonthlyOrderModal';
import { FaSearch } from 'react-icons/fa';

const Bookings = () => {
    const [allBookings, setAllBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        date: "",
        status: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const navigate = useNavigate();
    const searchRef = useRef();

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-booking-list`,
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

    const getOrderById = () => { }

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Bookings</h1>
                        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                            <div className="d-flex" style={{ position: "relative" }}>
                                <input
                                    ref={searchRef}
                                    // className={classes.input}
                                    style={{
                                        width: "300px",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                    }}
                                    type="text"
                                    placeholder="search booking by id"
                                />
                                <FaSearch
                                    onClick={getOrderById}
                                    style={{
                                        position: "absolute",
                                        right: "8px",
                                        top: "10px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>

                            <input
                                type="date"
                                name="date"
                                value={filters.date}
                                onChange={handleFilterChange}
                                className={classes.filter_input}
                            />

                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className={classes.filter_input}
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="OutOfDelivery">OutOfDelivery</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className={classes["report-body"]}>
                        <div className={classes["report-topic-heading"]}>
                            <h3 className={classes["t-op"]} style={{ width: "200px" }}>Booking Id</h3>
                            {/* <h3 className={classes["t-op"]} style={{ width: "200px" }}>Order Id</h3> */}
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
                                    <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "200px" }}>{order.bookingId}</h3>
                                    {/* <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "200px" }}>{order.orderId}</h3> */}
                                    <h3 className={classes["t-op-nextlvl"]}><span style={{ color: 'green' }}>{order.autoAssigned && 'auto'}</span> {format(new Date(order.createdAt), "dd-MM-yyyy")}</h3>

                                    <h3 className={`${classes["t-op-nextlvl"]} ${classes.status} ${order.status === "cancelled" ? classes.Cancelled : order.status === "completed" ? classes.Completed : order.status === "alloted" ? classes.alloted : classes.OutOfDelivery}`}>{order.status}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>₹{order.orderValue}</h3>
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