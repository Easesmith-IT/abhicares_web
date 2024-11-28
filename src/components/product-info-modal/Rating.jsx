import React from 'react';
import './RatingsComp.css'; // Import the updated CSS file

export const Rating = ({ ratingValue, ratingStar, maxRating = 500 }) => {
    // Calculate width as a percentage of the maximum rating
    const scaledPercent = Math.min((ratingValue / maxRating) * 100, 100);

    console.log("scaledPercent", scaledPercent);
    

    return (
        <div
            className={`singlerating-container ${window.innerWidth < 900 ? 'singlerating-container-medium' : ''
                }`}
        >
            <p className="singlerating-star-text">
                {ratingStar === 1 ? `${ratingStar} star` : `${ratingStar} stars`}
            </p>
            <div className="singlerating-bar-container">
                <div
                    className="singlerating-bar"
                    style={{ width: `${scaledPercent || 0}%` }}
                ></div>
            </div>
            <div className="singlerating-value">{ratingValue}</div>
        </div>
    );
};
