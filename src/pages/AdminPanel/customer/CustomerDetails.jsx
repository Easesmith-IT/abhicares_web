import React, { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import UserAddressModal from '../../../components/user-address-modal/UserAddressModal'
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './CustomerDetails.module.css';
import { format } from 'date-fns';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import useGetApiReq from '../../../hooks/useGetApiReq';
import Loader from '../../../components/loader/Loader';
// import classes from "../Shared.module.css";

const CustomerDetails = () => {
    const [isUserAddressModalOpen, setIsUserAddressModalOpen] = useState(false);
    const { res: getOrdersRes, fetchData: getOrders, isLoading } = useGetApiReq();
    const { state: user } = useLocation();
    const [allOrders, setAllOrders] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const handlePageClick = async (page) => {
        setPage(page);
    };

    const getAllOrders = async () => {
        getOrders(`/admin/get-customer-bookings/${user?._id}?page=${page}`)
    };

    useEffect(() => {
        getAllOrders();
    }, [page]);

    useEffect(() => {
        if (getOrdersRes?.status === 200 || getOrdersRes?.status === 201) {
            console.log("getOrdersRes", getOrdersRes);

            setAllOrders(getOrdersRes?.data.data);
            setPageCount(Number(getOrdersRes?.data?.pagination?.totalPages))
        }
    }, [getOrdersRes])

    return (
        <Wrapper>
            <>
                <div className={classes.heading_container}>
                    <h4>Customer Info</h4>
                    <div className={classes.d_flex}>
                        <button onClick={() => setIsUserAddressModalOpen(true)} className={classes.btn}>View all address</button>
                    </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Phone:</b> {user?.phone}</p>
                    <p><b>Status:</b> <span style={{ color: user?.status ? "green" : "red", fontWeight: 700 }}>{user?.status ? "Active" : "Inactive"}</span></p>
                    <p><b>Joined Date:</b> {user?.createdAt && format(new Date(user?.createdAt), "dd/MM/yyyy")}</p>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <h4>Customer Bookings</h4>

                    <div>
                        <div className={classes.orders}>
                            <h5 className={classes["t-op"]} style={{ width: "200px" }}>Booking Id</h5>
                            <h5 className={classes["t-op"]}>Booking Date</h5>
                            <h5 className={`${classes["t-op"]}`}>Status</h5>
                            <h5 className={`${classes["t-op"]}`}>Booking Amount</h5>
                            <h5 className={classes["t-op"]}>Details</h5>
                        </div>

                        <div className={classes.items}>
                            {!isLoading && allOrders?.length === 0 && <p>No Booking found</p>}

                            {(isLoading) && <Loader />}

                            {allOrders?.map((order, i) => (
                                <div key={i} className={classes.orders}>
                                    <p className={`${classes["t-op-nextlvl"]}`} style={{ width: "200px" }}>{order?.bookingId}</p>
                                    <p className={classes["t-op-nextlvl"]}>
                                        {format(new Date(order.createdAt), "dd-MM-yyyy")}
                                    </p>
                                    <div>
                                        <span
                                            className={`${classes["t-op-nextlvl"]} ${classes.status} ${order.status === "Cancelled"
                                                ? classes.Cancelled
                                                : order.status === "Completed"
                                                    ? classes.Completed
                                                    : order.status === "pending"
                                                        ? classes.pending
                                                        : classes.OutOfDelivery
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className={`${classes["t-op-nextlvl"]}`}>
                                        ₹{order?.itemTotalValue}
                                    </p>
                                    <p className={classes["t-op-nextlvl"]}>
                                        <button
                                            onClick={() =>
                                                navigate(`/admin/bookings/${order._id}`, {
                                                    state: order,
                                                })
                                            }
                                            className={classes.button}
                                        >
                                            View Details
                                        </button>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <PaginationControl
                                changePage={handlePageClick}
                                limit={10}
                                page={page}
                                total={pageCount + "0"}
                            />
                        </div>
                    </div>
                </div>
                {isUserAddressModalOpen &&
                    <UserAddressModal
                        userId={user._id}
                        setIsModalOpen={setIsUserAddressModalOpen}
                    />
                }
            </>
        </Wrapper>
    )
}

export default CustomerDetails