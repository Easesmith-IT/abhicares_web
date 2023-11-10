import { BsStarFill } from "react-icons/bs";

import classes from "./Modal.module.css";

const SpecificStarRating = () => {
    return (
        <div className={classes.specific_star_rating_div}>
            <div className={classes.rating_staricon_num_container}>
                <BsStarFill color="black" size={10} />
                <span className={classes.rating_star_num}>5</span>
            </div>
            <div className={classes.rating_line}></div>
            <div className={classes.specific_star_rating_total}>1.1M</div>
        </div>
    );
};

export default SpecificStarRating;