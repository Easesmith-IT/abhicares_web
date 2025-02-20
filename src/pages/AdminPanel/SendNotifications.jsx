import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wrapper from '../Wrapper';
import classes from "../AdminPanel/Shared.module.css";
import SendNotificationModal from '../../components/send-notification-modal/SendNotificationModal';
import NotificationComp from '../../components/notification/NotificationComp';
import useGetApiReq from '../../hooks/useGetApiReq';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const SendNotifications = () => {
    const { res: getAllNotificationsRes, fetchData: getAllNotifications, isLoading } = useGetApiReq();
    const { res: searchNotificationRes, fetchData: searchNotification, isLoading: searchNotificationLoading } = useGetApiReq();
    const { res: filterNotificationRes, fetchData: filterNotification, isLoading: filterNotificationLoading } = useGetApiReq();
    const [isSendNotificationModalOpen, setIsSendNotificationModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);

    const handlePageClick = async (page) => {
        setPage(page);
    };

    // Fetch notifications
    const getNotifications = async () => {
        getAllNotifications(`/admin/get-all-notifications?page=${page}`)
    };

    useEffect(() => {
        if (getAllNotificationsRes?.status === 200 || getAllNotificationsRes?.status === 201) {
            console.log("getAllNotificationsRes", getAllNotificationsRes);

            setNotifications(getAllNotificationsRes?.data?.data);
            setPageCount(getAllNotificationsRes?.data?.pagination?.totalPages);
        }
    }, [getAllNotificationsRes])
    console.log("searchTerm", searchTerm);

    const searchNotifications = async () => {
        searchNotification(`/admin/search-notifications?title=${searchTerm}`)
    };

    useEffect(() => {
        if (searchNotificationRes?.status === 200 || searchNotificationRes?.status === 201) {
            setNotifications(searchNotificationRes?.data?.data);
            console.log("searchNotificationRes", searchNotificationRes);
            setPageCount(searchNotificationRes?.data?.pagination?.totalPages);
        }
    }, [searchNotificationRes])

    const filterNotifications = async () => {
        filterNotification(`/admin/filter-notifications?date=${filterDate}`)
    };

    useEffect(() => {
        if (filterNotificationRes?.status === 200 || filterNotificationRes?.status === 201) {
            console.log("filterNotificationRes",filterNotificationRes);
            
            setNotifications(filterNotificationRes?.data?.data);
        }
    }, [filterNotificationRes])

    useEffect(() => {
        !searchTerm && getNotifications();
    }, []);

    useEffect(() => {
        searchTerm && searchNotifications();
    }, [searchTerm]);

    useEffect(() => {
        filterDate && filterNotifications();
    }, [filterDate]);

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Notifications</h1>
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={classes.input}
                            type="text"
                            placeholder="Search notification"
                            value={searchTerm}
                        />
                        <div className={classes.filterSend}>
                            <span>Filter by date</span>
                            <input
                                onChange={(e) => setFilterDate(e.target.value)}
                                className={classes.input}
                                style={{ width: "200px" }}
                                type="date"
                                value={filterDate}
                            />
                        </div>
                        <button
                            onClick={() => setIsSendNotificationModalOpen(true)}
                            className={classes.sendNotificationBtn}
                        >
                            Send Notification
                        </button>
                    </div>

                    <div className={classes["report-body"]}>
                        {/* {notifications.length === 0 && !isLoading && !searchNotificationLoading && !filterNotificationLoading && <div className="error-message">Notification not found</div>} */}
                        {(isLoading || searchNotificationLoading || filterNotificationLoading) ? (
                            <div>Loading notifications...</div>
                        ) : (
                            <div className={classes.notifications}>
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <NotificationComp
                                            key={notification._id}
                                            notification={notification}
                                        />
                                    ))
                                ) : (
                                    <div>No notifications found</div>
                                )}
                            </div>
                        )}
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
            </Wrapper>

            {isSendNotificationModalOpen && (
                <SendNotificationModal
                    setIsModalOpen={setIsSendNotificationModalOpen}
                    getNotifications={getNotifications}
                />
            )}
        </>
    );
};

export default SendNotifications;