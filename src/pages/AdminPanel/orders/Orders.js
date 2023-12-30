import axios from 'axios';
import Wrapper from '../../Wrapper'
// import classes from './Bookings.module.css'
import classes from "../Shared.module.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../../components/loader/Loader';
import { format } from 'date-fns';
import MonthlyOrderModal from '../../../components/monthly-order-modal/MonthlyOrderModal';

const Orders = () => {
    const [allOrders, setAllOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [dateYearInfo, setDateYearInfo] = useState("");
    const [monthlyOrders, setMonthlyOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("adUx");
    const headers = {
        Authorization: token,
    };

    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_ADMIN_API_URL}/get-all-orders`,
                { headers }
            );
            setAllOrders(data.data);
            console.log("allOrders",data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        getAllOrders();
    }, [])


    const handleOnChange = (e) => {
        console.log("month-year", e.target.value);
        setDateYearInfo(e.target.value);
    }

    const handleOnSubmit = async () => {
        if (!dateYearInfo) {
            return;
        }
        try {
            const arr = dateYearInfo.split("-");
            const { data } = await axios.post(
                `${process.env.REACT_APP_ADMIN_API_URL}/get-monthly-orders`,
                {
                    month: arr[1],
                    year: arr[0]
                },
                { headers }
            );
            if (data.data.length > 0) {
                setIsModalOpen(true);
            }
            setMonthlyOrders(data.data);
            console.log('orders-month', data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Orders</h1>
                        <div className={classes.d_flex}>
                            <input onChange={handleOnChange} type="month" name="month" id="month" />
                            <button onClick={handleOnSubmit}>Submit</button>
                        </div>
                    </div>

                    <div className={classes["report-body"]}>
                        <div className={classes["report-topic-heading"]}>
                            <h3 className={classes["t-op"]}>Order Date</h3>
                            <h3 className={`${classes["t-op"]}`}>Status</h3>
                            <h3 className={`${classes["t-op"]}`}>Order Value</h3>
                            <h3 className={classes["t-op"]}>Details</h3>
                        </div>

                        <div className={classes.items}>
                            {!isLoading && allOrders?.length === 0 && <p>No orders found</p>}

                            {isLoading && allOrders?.length === 0 && <Loader />}

                            {allOrders?.map((order, i) => (
                                <div key={i} className={`${classes.item1} ${classes.cursor}`}>
                                    <h3 className={classes["t-op-nextlvl"]}>{format(new Date(order.createdAt), "dd-MM-yyyy")}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{order.status}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{order.orderValue}</h3>
                                    <h3 className={classes["t-op-nextlvl"]}>
                                        <button onClick={() => navigate(`/admin/Orders/${order._id}`, { state: order })} className={classes.button}>View Details</button>
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Wrapper >

            {isModalOpen &&
                <MonthlyOrderModal
                    setIsModalOpen={setIsModalOpen}
                    monthlyOrders={monthlyOrders}
                />
            }
        </>
    )
}

export default Orders