import React from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import "./HelpCenterTicketDetails.css"

const Timeline = ({ title, time, status, className, desc }) => {
    return (
        <div className="timeline-container">
            <div className={`timeline-icon ${className}`}>
                {!status ? <FaXmark /> : <FaCheck />}
            </div>
            <div className="timeline-content">
                <span className="timeline-title">{title}</span>
                <span className="timeline-time">{time}</span>
                <span className="timeline-time">{desc}</span>
            </div>
        </div>
    );
};

export default Timeline;
