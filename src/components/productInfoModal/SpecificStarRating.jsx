import { BsStarFill } from "react-icons/bs";

import classes from "./Modal.module.css";

const SpecificStarRating = ({ ratingValue, ratingStar, maxRating = 500 }) => {
    const scaledPercent = Math.min((ratingValue / maxRating) * 100, 100);

    return (
        <div className={classes.specific_star_rating_div}>
            <div className={classes.rating_staricon_num_container}>
                <BsStarFill color="black" size={10} />
                <span className={classes.rating_star_num}>{ratingStar}</span>
            </div>
            <div className={classes["singlerating-bar-container"]}>
                <div
                    className={classes["singlerating-bar"]}
                    style={{ width: `${scaledPercent || 0}%` }}
                ></div>
            </div>
            <div className={classes.specific_star_rating_total}>{ratingValue}</div>
        </div>
    );
};

export default SpecificStarRating;