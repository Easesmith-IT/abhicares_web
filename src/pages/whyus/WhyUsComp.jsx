import React from 'react'
import classes from "./WhyUs.module.css";
import { FaGlobe } from "react-icons/fa"
import ProfessionalsAtYourDoorstep from "../../assets/why-us/Professionals at your doorstep.png"
import doorstepRepair from "../../assets/why-us/doorstep repair.png"
import professionalSupport from "../../assets/why-us/Professional Support.png"
import rework from "../../assets/why-us/rework.png"
import customerCentric from "../../assets/why-us/customer centric.png"
import gurantee from "../../assets/why-us/gurantee.png"

const WhyUsComp = () => {
    return (
        <div
            className={`feat ${classes.whyUs}`}
        >
            <div className={``}>
                    <div
                        className={`${classes["section-head"]} col-sm-12`}
                    >
                        <h4>
                            <span className={classes.span}>Why Choose</span> Us?
                        </h4>
                        {/* <p>
                            When you choose us, you'll feel the benefit of 10 years'
                            experience of Web Development. Because we know the digital world
                            and we know that how to handle it. With working knowledge of
                            online, SEO and social media.
                        </p> */}
                    </div>
                <div className={`${classes.card_container}`}>

                    <div>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={ProfessionalsAtYourDoorstep} alt="Professionals at your doorstep" />
                            </span>
                            <h6 className={classes.para}>Professionals at your doorstep</h6>
                            <p className={classes.para}>
                                We bring the Professionals in Darbhanga, Bihar at your home. All our professionals background is verified. They go through security checks before they are brought on board.

                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={doorstepRepair} alt="Doorstep repair" />
                            </span>
                            <h6 className={classes.para}>Doorstep Repair</h6>
                            <p className={classes.para}>
                                You get a doorstep repair within 90 minutes from the best
                                professionals services in Darbhanga, Bihar
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={gurantee} alt="Post-service guarantee" />
                            </span>
                            <h6 className={classes.para}>Post-service guarantee</h6>
                            <p className={classes.para}>When you avail the services in Darbhanga, Bihar from AbhiCares,
                                you get a 30-day post service guarantee.T&C apply</p>

                        </div>
                    </div>
                    <div>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={rework} alt="Re-work Assurance" />
                            </span>
                            <h6 className={classes.para}>Re-work Assurance</h6>
                            <p className={classes.para}>
                                AbhiCares strives to offer top quality services for you and
                                your home every time. If you're not satisfied with the quality
                                of the service, we'll get a rework done to your satisfaction
                                at no extra charge.T&C apply
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={customerCentric} alt="Customer centric" />
                                <i className={`${classes["fa"]} ${classes["fa-globe"]}`}></i>
                            </span>
                            <h6 className={classes.para}>Customer Centric</h6>
                            <p className={classes.para}>
                                All the services provided by AbhiCares, including carpentry
                                services in Darbhanga, Bihar are customer-centric.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={professionalSupport} alt="Professional support" />
                            </span>
                            <h6 className={classes.para}>Professional Support</h6>
                            <p className={classes.para}>
                                Get in touch with us directly, Chat with us, write an email or call our round-the-clock support team that's already ready to go that extra mile for your happiness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyUsComp