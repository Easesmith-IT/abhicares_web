import Wrapper from '../../Wrapper';
// import classes from './Bookings.module.css'
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Loader from '../../../components/loader/Loader';
import useGetApiReq from '../../../hooks/useGetApiReq';
import classes from "../Shared.module.css";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SellerCashouts = () => {
    const { res: getSellerCashoutsRes, fetchData: getSellerCashouts, isLoading } = useGetApiReq();
    const [allSellerCashouts, setAllSellerCashouts] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        status: "",
    });
    const navigate = useNavigate();

    const handlePageClick = async (page) => {
        setPage(page);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const getAllSellerCashouts = async () => {
        getSellerCashouts(`/admin/get-seller-cashout?cashoutId=${searchQuery}&page=${page}&startDate=${filters.startDate}&endDate=${filters.endDate}&status=${filters.status}`)
    };

    useEffect(() => {
        getAllSellerCashouts();
    }, [searchQuery, page, filters.startDate, filters.endDate, filters.status])

    useEffect(() => {
        if (getSellerCashoutsRes?.status === 200 || getSellerCashoutsRes?.status === 201) {
            console.log("getSellerCashoutsRes", getSellerCashoutsRes);

            setAllSellerCashouts(getSellerCashoutsRes?.data.data);
            setPageCount(getSellerCashoutsRes?.data.pageCount);
            setPage(getSellerCashoutsRes?.data.currentPage);
        }
    }, [getSellerCashoutsRes])

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Seller Cashouts</h1>
                        <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
                            <div>
                                <span>Start Date</span>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={filters.startDate}
                                    onChange={handleFilterChange}
                                    className={classes.filter_input}
                                />
                            </div>
                            <div>
                                <span>End Date</span>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={filters.endDate}
                                    onChange={handleFilterChange}
                                    className={classes.filter_input}
                                />
                            </div>

                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className={classes.filter_input}
                            >
                                <option value="">Select Status</option>
                                <option value="Created">Created</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
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
                            <h3 className={`${classes["t-op"]}`}>Actions</h3>
                        </div>

                        <div className={classes.items}>
                            {!isLoading && allSellerCashouts?.length === 0 && <p>No Seller Cashouts found</p>}

                            {isLoading && allSellerCashouts?.length === 0 && <Loader />}

                            {allSellerCashouts?.map((cashout, i) => (
                                <div key={i} className={`${classes.item1} ${classes.cursor}`}>
                                    <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "170px" }}>{cashout.cashoutId}</h3>
                                    <h3 className={classes["t-op-nextlvl"]}>₹{cashout.value}</h3>

                                    <h3 className={`${classes["t-op-nextlvl"]}`}>{cashout?.createdAt && format(new Date(cashout?.createdAt), "dd-MM-yyyy")}</h3>
                                    <h3 className={`${classes["t-op-nextlvl"]}`}>
                                        <p className={cashout.status === "cancelled" ? classes.red : cashout.status === "completed" ? classes.green : classes.blue}>{cashout?.status}</p>
                                    </h3>
                                    <h3 className={classes["t-op-nextlvl"]}>
                                        <FaEye onClick={() => navigate(`/admin/seller-cashouts/${cashout?._id}`)} size={24} cursor={"pointer"} />
                                    </h3>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: "30px" }}>
                            <PaginationControl
                                changePage={handlePageClick}
                                limit={10}
                                page={page}
                                total={pageCount + "0"}
                            />
                        </div>
                    </div>
                </div>
            </Wrapper >
        </>
    )
}

export default SellerCashouts