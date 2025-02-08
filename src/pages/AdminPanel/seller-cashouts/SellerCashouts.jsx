import axios from 'axios';
import Wrapper from '../../Wrapper';
// import classes from './Bookings.module.css'
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import classes from "../Shared.module.css";

const SellerCashouts = () => {
    const [allSellerCashouts, setAllSellerCashouts] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const navigate = useNavigate();
    const searchRef = useRef();

    const getAllSellerCashouts = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-seller-cashout`,
                { withCredentials: true }
            );

            setAllSellerCashouts(data.data);
            console.log("SellerCashouts", data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllSellerCashouts();
    }, [])

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Seller Cashouts</h1>
                    </div>

                    <div className={classes["report-body"]}>
                        <div className={classes["report-topic-heading"]}>
                            <h3 className={classes["t-op"]} style={{ width: "170px" }}>Cashout Id</h3>
                            <h3 className={classes["t-op"]}>Amount</h3>
                            <h3 className={`${classes["t-op"]}`}>Date</h3>
                            <h3 className={`${classes["t-op"]}`}>Status</h3>
                        </div>

                        <div className={classes.items}>
                            {!isLoading && allSellerCashouts?.length === 0 && <p>No Seller Cashouts found</p>}

                            {isLoading && allSellerCashouts?.length === 0 && <Loader />}

                            {allSellerCashouts?.map((cashout, i) => (
                                <div key={i} className={`${classes.item1} ${classes.cursor}`}>
                                    <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "170px" }}>{cashout.cashoutId}</h3>
                                    <h3 className={classes["t-op-nextlvl"]}>₹{cashout.value}</h3>

                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{cashout?.createdAt && format(new Date(cashout?.createdAt), "dd-MM-yyyy")}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{cashout.status}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Wrapper >
        </>
    )
}

export default SellerCashouts