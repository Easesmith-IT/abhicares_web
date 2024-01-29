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
            className={`feat bg-gray pt-5 pb-5`}
        >
            <div className={`container`}>
                <div className={`row`}>
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

                    <div className={`col-lg-4 col-sm-6`}>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={ProfessionalsAtYourDoorstep} alt="Professionals at your doorstep" />
                            </span>
                            <h6>Professionals at your doorstep</h6>
                            <p>
                                AbhiCares brings you the Professionals in Darbhanga, Bihar at
                                your home. All professionals are background verified. They go
                                through a number of security checks before they are brought on
                                board
                            </p>
                        </div>
                    </div>
                    <div className={`col-lg-4 col-sm-6`}>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={doorstepRepair} alt="Doorstep repair" />
                            </span>
                            <h6>Doorstep Repair</h6>
                            <p>
                                You get a doorstep repair within 90 minutes from the best
                                professionals services in Darbhanga, Bihar
                            </p>
                        </div>
                    </div>
                    <div className={`col-lg-4 col-sm-6`}>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={gurantee} alt="Post-service guarantee" />
                            </span>
                            <h6>Post-service guarantee</h6>
                            <p>When you avail the services in Darbhanga, Bihar from AbhiCares,
                                you get a 30-day post service guarantee.</p>

                        </div>
                    </div>
                    <div className={`col-lg-4 col-sm-6`}>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                            <img src={rework} alt="Re-work Assurance" />
                            </span>
                            <h6>Re-work Assurance</h6>
                            <p>
                                AbhiCares strives to offer top quality services for you and
                                your home every time. If you're not satisfied with the quality
                                of the service, we'll get a rework done to your satisfaction
                                at no extra charge
                            </p>
                        </div>
                    </div>
                    <div className={`col-lg-4 col-sm-6`}>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                            <img src={customerCentric} alt="Customer centric" />
                                <i className={`${classes["fa"]} ${classes["fa-globe"]}`}></i>
                            </span>
                            <h6>Customer Centric</h6>
                            <p>
                                All the services provided by AbhiCares, including carpentry
                                services in Darbhanga, Bihar are customer-centric.
                            </p>
                        </div>
                    </div>
                    <div className={`col-lg-4 col-sm-6`}>
                        <div className={classes.item}>
                            {" "}
                            <span
                                className={`${classes["icon"]} ${classes["feature_box_col_one"]} ${classes["span"]}`}
                            >
                                <img src={professionalSupport} alt="Professional support" />
                            </span>
                            <h6>Professional Support</h6>
                            <p>
                                Want to get in touch with us directly to express a concern or
                                have some queries that need immediate responses? Chat with us,
                                write us an email or even call us to get through to our
                                round-the- clock support team that's already ready to go that
                                extra mile for your happiness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyUsComp