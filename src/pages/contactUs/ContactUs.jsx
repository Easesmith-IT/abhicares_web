import { contactAddress } from "../../data/contactAddress";
import classes from "./ContactUs.module.css";

const ContactUs = () => {
    return (
        <section className={classes.contact_us}>
            <div className={classes.contact_us_top_div}>
                <h1 className={classes.h1}>Contact Us</h1>
                <p className={classes.link_p}>
                    For any help regarding your bookings, please log-in and visit our{" "}
                    <a className={classes.link} href="#">Help Center </a>
                    | For media queries, please send us an email on{" "}
                    <a className={classes.link} href="#">press@urbancompany.com</a>
                </p>
                <h3 className={classes.h3}>
                    Our Mission is to empower millions of service professionals by delivering services at-home in a way that has never been experienced before.
                </h3>
            </div>
            <div className={classes.container}>
                <div className={classes.address_card_container}>
                    {
                        contactAddress.map(({ city, address }) => (
                            <div key={city} className={classes.address_card}>
                                <h4 className={classes.h4}>{city}</h4>
                                <p className={classes.link_p}>{address}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default ContactUs;