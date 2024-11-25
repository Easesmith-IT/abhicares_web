import React, { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import "./HelpCenterTicketDetails.css"
import { Link, useParams } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';
import Timeline from './TimeLine';
import axios from 'axios';
import { format } from 'date-fns';

const HelpCenterTicketDetails = () => {
    const [status, setStatus] = useState("in-progress");
    const steps = ["Raised", "In Progress", "Completed"];
    const params = useParams();

    const [ticketDetails, setTicketDetails] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getTicketDetails = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_ADMIN_API_URL}/get-single-ticket?ticketId=${params?.ticketId}`, { withCredentials: true }
            );
            console.log("details of ticket", data);
            setTicketDetails(data.ticket);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTicketDetails();
    }, [])

    return (
        <Wrapper>
            <div className="container">
                <div className="card left">
                    <div className="header">
                        <div>
                            <h3>Update status</h3>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="dropdown"
                            >
                                <option value="raised">Raised</option>
                                <option value="in-progress">In progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <p>
                            {ticketDetails?.createdAt && format(new Date(ticketDetails?.createdAt), "dd MMMM, yyyy HH:mm:ss")}
                        </p>
                    </div>
                    <div className="content">
                        <p>
                            <strong>Raised Id:</strong>
                        </p>
                        <div className='raisedby'>
                            <p>
                                <strong>Raised by:</strong> Name
                                <br />
                                +91 2840580294
                            </p>
                            <Link to={""} className="view-profile">
                                View Profile
                            </Link>
                        </div>
                        <p>
                            <strong>Concern (description):</strong> {ticketDetails?.description}
                        </p>

                    </div>
                </div>

                <div className="right">
                    <div className="section card">
                        <p><strong>Booking Id:</strong></p>
                        <p><strong>Service Booked:</strong></p>
                        <p><strong>Time:</strong></p>
                        <p><strong>Address:</strong></p>
                        <p><strong>Cost:</strong> Rs599</p>
                    </div>
                    <div className="section card">
                        <p><strong>Booking Id:</strong></p>
                        <p><strong>Service Id:</strong></p>
                        <p><strong>Ticket Type:</strong> On General</p>
                        <div style={{ marginTop: "20px" }}>
                            <Timeline
                                title="Raised"
                                time="19-10-2024 00:21:01"
                                status={status}
                                className="bg-green"
                            />
                            <div className="vertical-line"></div>
                            <Timeline
                                title="In Progress"
                                time="19-10-2024 00:21:01"
                                status={status}
                                className="bg-green"
                            />
                            <div className="vertical-line"></div>
                            <Timeline
                                title="Completed"
                                time="19-10-2024 00:21:01"
                                status={""}
                                className="bg-gray"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default HelpCenterTicketDetails