import classes from "../../pages/checkoutPage/CheckoutPage.module.css";

const FrequentlyAddedItems = () => {
    return (
        <div className={classes.frequently_added_item}>
            <div className={classes}>
                <p className={classes.item_name}>Deep clean AC service(split)</p>
                <span className={classes.item_price}>₹649</span>
            </div>
            <div className={classes.frequently_added_item_right}>
                {/* <img className={classes.item_img} src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_72,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1653639454091-70b913.png" alt="" /> */}
                <button className={classes.button}>Add</button>
            </div>
        </div>
    );
};

export default FrequentlyAddedItems;