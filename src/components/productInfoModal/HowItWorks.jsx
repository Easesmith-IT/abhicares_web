import classes from "./Modal.module.css";

const HowItWorks = () => {
    return (
        <div className={classes.how_it_works_container}>
            <h3 className={classes.how_it_works_h3}>How it works</h3>
            <ol className={classes.steps_container}>
                <div className={classes.step}>
                    <li className={classes.step_li}>Pre-service checks</li>
                    <p className={classes.step_p}>Detailed inspection including gas check to identify repairs</p>
                    <img className={classes.step_img} src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1677559424521-454126.jpeg" alt="" />
                </div>
            </ol>
        </div>
    );
};

export default HowItWorks;