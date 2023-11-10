import { BsStarFill } from "react-icons/bs";
import classes from "./Modal.module.css";

const CustomerReview = () => {
    return (
        <div className={classes.customer_review}>
            <div className={classes.customer_review_left}>
                <div className={classes.customer_info}>
                    <img className={classes.customer_img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&usqp=CAU" alt="customer" />
                    <div className={classes.customer_info_right}>
                        <p className={classes.customer_name}>Sanjay P Phatale</p>
                        <p className={classes.review_date}>Oct 2023</p>
                    </div>
                </div>
                <p className={classes.customer_review_p}>Good</p>
            </div>
            <div className={classes.customer_review_right}>
                <div className={classes.rating_staricon_num_container}>
                    <BsStarFill color="black" size={10} />
                    <span className={classes.rating_star_num}>5</span>
                </div>
            </div>
        </div>
    );
};

export default CustomerReview;