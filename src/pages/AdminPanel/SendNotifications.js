import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wrapper from '../Wrapper';
import classes from "../AdminPanel/Shared.module.css";
import SendNotificationModal from '../../components/send-notification-modal/SendNotificationModal';
import NotificationComp from '../../components/notification/NotificationComp';

const SendNotifications = () => {
    const [isSendNotificationModalOpen, setIsSendNotificationModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');

    // Fetch notifications
    const getNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-all-notifications`);

            setNotifications(data?.data);
        } catch (err) {
            setError('Failed to fetch notifications. Please try again later.');
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    console.log("searchTerm", searchTerm);

    const searchNotifications = async () => {

        console.log("in search function");
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/search-notifications?title=${searchTerm}`);
            console.log("response", data);

            setNotifications(data?.data);
        } catch (err) {
            setError('Failed to fetch notifications. Please try again later.');
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/filter-notifications?date=${filterDate}`);
            console.log("filterNotifications response", data);

            setNotifications(data?.data);
        } catch (err) {
            setError('Failed to fetch notifications. Please try again later.');
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    };


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
                            disabled={loading}
                        >
                            Send Notification
                        </button>
                    </div>

                    <div className={classes["report-body"]}>
                        {error && <div className="error-message">{error}</div>}
                        {loading ? (
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