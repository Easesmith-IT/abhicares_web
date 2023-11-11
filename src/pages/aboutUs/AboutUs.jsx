import LeaderCard from "../../components/leaderCard/LeaderCard";
import { company } from "../../data/company";
import { investers } from "../../data/invester";
import { leaders } from "../../data/leader";
import classes from "./AboutUs.module.css";

const AboutUs = () => {
    return (
        <section className={classes.about_section}>
            <div className={classes.heading_div}>
                <h1 className={classes.heading}>AboutUs</h1>
            </div>
            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <h2 className={classes.h2}>Who we are</h2>
                    <p className={classes.p}>
                        Urban Company is a technology platform offering a variety of services at home. Customers use our platform to book services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. These services are delivered in the comfort of their home and at a time of their choosing. We promise our customers a high quality, standardised and reliable service experience. To fulfill this promise, we work closely with our hand-picked service partners, enabling them with technology, training, products, tools, financing, insurance and brand, helping them succeed and deliver on this promise.
                    </p>

                    <ul className={classes.list_container}>
                        <li className={classes.list_item}>
                            <p className={classes.list_item_bold_p}>45,000+</p>
                            <p className={classes.list_item_p}>Trained Professionals</p>
                        </li>
                        <li className={classes.list_item}>
                            <p className={classes.list_item_bold_p}>10 Million+</p>
                            <p className={classes.list_item_p}>Happy Customers</p>
                        </li>
                        <li className={classes.list_item}>
                            <p className={classes.list_item_bold_p}>63</p>
                            <p className={classes.list_item_p}>Cities</p>
                        </li>
                        <li className={classes.list_item}>
                            <p className={classes.list_item_bold_p}>5</p>
                            <p className={classes.list_item_p}>Countries</p>
                        </li>
                    </ul>

                    <section className={classes.section}>
                        <h2 className={classes.h2}>How We do it</h2>
                        <p className={classes.p}>
                            Urban Company provides a platform that allows skilled and experienced professionals to connect with users looking for specific services. Once on the platform, our match-making algorithm identifies professionals who are closest to the users’ requirements and available at the requested time and date.
                        </p>
                    </section>

                    <section className={classes.section}>
                        <h2 className={classes.h2}>Our Leadership Team</h2>
                        <div className={classes.leadership_team_container}>
                            {
                                leaders.map((data) => (
                                    <LeaderCard key={data.name} {...data} />
                                ))
                            }
                        </div>
                    </section>

                    <section className={classes.section}>
                        <h2 className={classes.h2}>Our Investors</h2>
                        <div className={classes.company_container}>
                            {
                                company.map(({ src }, i) => (
                                    <img className={classes.company_img} key={i} src={src} alt="company" />
                                ))
                            }
                        </div>

                        <div className={classes.investers_container}>
                            {
                                investers.map(({ name, src }) => (
                                    <div key={name} className={classes.invester_name_img_container}>
                                        <p className={classes.invester_name}>{name}</p>
                                        <img className={classes.invester_img} src={src} alt="invester" />
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <section className={`${classes.section} ${classes.media_section}`}>
                        <p className={classes.link_p}>
                        For media queries, contact: <a className={classes.link} href="#">press@urbancompany.com</a>
                        </p>
                        <p className={classes.p}>You could be a part of our journey. Interested?</p>
                        <button className={classes.button}>Apply Now</button>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;