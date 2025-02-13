import Wrapper from '../../Wrapper';
// import classes from './Bookings.module.css'
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Loader from '../../../components/loader/Loader';
import useGetApiReq from '../../../hooks/useGetApiReq';
import classes from "../Shared.module.css";

const SellerCashouts = () => {
    const { res: getSellerCashoutsRes, fetchData: getSellerCashouts, isLoading } = useGetApiReq();
    const [allSellerCashouts, setAllSellerCashouts] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const getAllSellerCashouts = async () => {
        getSellerCashouts(`/admin/get-seller-cashout?cashoutId=${searchQuery}`)
    };

    useEffect(() => {
        getAllSellerCashouts();
    }, [searchQuery])

    useEffect(() => {
        if (getSellerCashoutsRes?.status === 200 || getSellerCashoutsRes?.status === 201) {
            setAllSellerCashouts(getSellerCashoutsRes?.data.data);
        }
    }, [getSellerCashoutsRes])

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Seller Cashouts</h1>
                        <div>
                            <input
                                type="search"
                                name="searchQuery"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by Cashout Id"
                                className={classes.filter_input}
                            />
                        </div>
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