import React from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import "./HelpCenterTicketDetails.css"

const Timeline = ({ title, time, status, className }) => {
    return (
        <div className="timeline-container">
            <div className={`timeline-icon ${className}`}>
                {status === "in-progress" ? <FaXmark /> : <FaCheck />}
            </div>
            <div className="timeline-content">
                <span className="timeline-title">{title}</span>
                {/* <span className="timeline-time">{time}</span> */}
            </div>
        </div>
    );
};

export default Timeline;
