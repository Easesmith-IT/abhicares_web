import React, { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import "./HelpCenterTicketDetails.css"
import { Link, useParams } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';
import Timeline from './TimeLine';
import axios from 'axios';
import { format } from 'date-fns';
import AddResoulationModal from '../../../components/add-resoulation-modal/AddResoulationModal';
import { Button } from '@mui/material';
import ServiceDetailsModal from './ServiceDetailsModal';
import useGetApiReq from '../../../hooks/useGetApiReq';

const HelpCenterTicketDetails = () => {
    const { res: getTicketRes, fetchData: getTicket, isLoading: getTicketLoading } = useGetApiReq();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isServiceDetailsModalOpen, setIsServiceDetailsModalOpen] = useState(false);
    const params = useParams();

    const [ticketDetails, setTicketDetails] = useState("");

    const getTicketDetails = async () => {
        getTicket(`/admin/get-single-ticket?ticketId=${params?.ticketId}`);
    };

    useEffect(() => {
        getTicketDetails();
    }, [])

    useEffect(() => {
        if (getTicketRes?.status === 200 || getTicketRes?.status === 201) {
            setTicketDetails(getTicketRes?.data.ticket);
        }
    }, [getTicketRes])

    const history = (val) => ticketDetails?.ticketHistory?.find((ticket) => ticket?.status === val)
    const { addressLine: addressLine1, city: city1, pincode: pincode1, landmark } = ticketDetails?.bookingId?.userAddress || {};
    const { addressLine, city, pincode, state } = ticketDetails?.sellerId?.address || {};


    return (
        <Wrapper>
            <div className="container">
                <div>
                    <div className="card left">
                        <div className="header">
                            <div>
                                <h3>Update status</h3>
                                {ticketDetails?.status !== "completed" && <button onClick={setIsModalOpen} className="button">Update</button>}
                                {isModalOpen && (
                                    <AddResoulationModal
                                        setIsModalOpen={setIsModalOpen}
                                        getTicketDetails={getTicketDetails}
                                        id={params.ticketId}
                                    />
                                )}
                                {/* <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="dropdown"
                                >
                                <option value="raised">Raised</option>
                                <option value="in-progress">In progress</option>
                                <option value="completed">Completed</option>
                                </select> */}
                            </div>
                            <div>
                                <p>{ticketDetails?.ticketId}</p>
                                <p>
                                    {ticketDetails?.createdAt && format(new Date(ticketDetails?.createdAt), "dd MMMM, yyyy HH:mm:ss")}
                                </p>
                            </div>
                        </div>
                        <div className="content">
                            <p>
                                <strong>Raised Id:</strong> {ticketDetails?.raisedBy === "customer" ? ticketDetails?.userId?._id : ticketDetails?.sellerId?._id}
                            </p>
                            <div className='raisedby'>
                                <p>
                                    <strong>Raised by:</strong> {ticketDetails?.raisedBy === "customer" ? ticketDetails?.userId?.name : ticketDetails?.sellerId?.name}
                                    <br />
                                    {ticketDetails?.userId?.phone}
                                </p>
                                {/* <Link to={""} className="view-profile">
                                View Profile
                                </Link> */}
                            </div>
                            <p>
                                <strong>Concern (description):</strong> {ticketDetails?.description}
                            </p>
                        </div>
                    </div>
                    <div className="section card left-card">
                        <h4>Customer Details</h4>
                        <div><b>Customer Name: </b>{ticketDetails?.userId?.name}</div>
                        <div><b>Customer Phone Number:</b>{ticketDetails?.userId?.phone}</div>
                        <div><b>Address: </b>{`${addressLine1}, ${landmark}, ${city1}, ${pincode1}`}</div>
                    </div>
                    {ticketDetails?.sellerId &&
                        <div className="section card left-card">
                            <h4>Service Provider Details</h4>
                            <div><b>Service Provider Name: </b>{ticketDetails?.sellerId?.name}</div>
                            <div><b>Phone Number:</b>{ticketDetails?.sellerId?.phone}</div>
                            <div><b>Address: </b>{`${addressLine}, ${city}, ${state}, ${pincode}`}</div>
                        </div>}
                </div>

                <div className="right">
                    <div className="section card">
                        <p><strong>Booking Id:</strong> {ticketDetails?.bookingId?.bookingId}</p>
                        <p><strong>Service Booked:</strong><p>{ticketDetails?.serviceId?.name} {ticketDetails?.serviceId?.name ? <Button onClick={() => setIsServiceDetailsModalOpen(true)}>View</Button> : "No service booked"}</p></p>
                        <p><strong>Time: </strong>{ticketDetails?.bookingId?.bookingTime && format(new Date(ticketDetails?.bookingId?.bookingTime), "hh:mm aa")}</p>
                        <p><strong>Address: </strong>{ticketDetails?.bookingId?.userAddress.addressLine}</p>
                        <p><strong>Cost:</strong> Rs{ticketDetails?.bookingId?.orderValue}</p>
                    </div>
                    <div className="section card card2">
                        <p><strong>Booking Id: </strong>{ticketDetails?.bookingId?.bookingId}</p>
                        <p><strong>Service Id: </strong>{ticketDetails?.serviceId?._id}</p>
                        <p><strong>Ticket Type: </strong>{ticketDetails?.ticketType} </p>
                        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                            <Timeline
                                title="Raised"
                                time={history("raised") ? history("raised")?.date : ""}
                                status={history("raised")?.status || ""}
                                className={history("raised") ? "bg-green" : "bg-gray"}
                                desc={history("raised")?.resolution || ""}
                            />
                            {/* <div className="vertical-line"></div> */}
                            <Timeline
                                title="In Progress"
                                time={history("in-review") ? history("in-review")?.date : ""}
                                status={history("in-review")?.status || ""}
                                className={history("in-review") ? "bg-green" : "bg-gray"}
                                desc={history("in-review")?.resolution || ""}
                            />
                            {/* <div className="vertical-line"></div> */}
                            <Timeline
                                title="Completed"
                                time={history("completed") ? history("completed")?.date : ""}
                                status={history("completed")?.status || ""}
                                className={history("completed") ? "bg-green" : "bg-gray"}
                                desc={history("completed")?.resolution || ""}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isServiceDetailsModalOpen &&
                <ServiceDetailsModal
                    setIsModalOpen={setIsServiceDetailsModalOpen}
                    service={ticketDetails?.serviceId}
                />
            }
        </Wrapper>
    )
}

export default HelpCenterTicketDetails