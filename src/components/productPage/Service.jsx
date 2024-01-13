import classes from "../../pages/productPage/ProductPage.module.css";
import LazyImage from "../react-lazyload-image/LazyImage";

const Service = () => {
    return (
        <div className={classes.service_component}>
            <div className={classes.services_border}>
                <p className={classes.select_service_p}>
                    Select a service
                    <div className={classes.select_service_p_div}></div>
                </p>
                <div className={classes.services_container}>
                    {Array(9).fill("*").map((_, index) => (
                        <div key={index} className={classes.service}>
                            <LazyImage>
                                <img className={classes.service_img} src="https://iconicentertainment.in/wp-content/uploads/2013/11/dummy-image-square.jpg" alt="service" />
                            </LazyImage>
                            <p className={classes.service_p}>Bestseller Packages</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Service;