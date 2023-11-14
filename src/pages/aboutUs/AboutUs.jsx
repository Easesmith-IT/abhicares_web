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
              AbhiCares is Mithilas's largest online home services platform.
              Launched in 2022, AbhiCares today operates in Darbhanga. The
              platform helps customers book reliable & high quality services
              like – Home repair, Beauty treatment, Massages, Haircuts,
              Handyman, Appliance repair, painting, carpentry, event management
              & planner , Business & tax consultancy and many more - delivered
              by trained professionals conveniently at home. AbhiCares vision is
              to empower millions of professionals indiawide to deliver services
              at home like never experienced before.
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
                AbhiCares is Mithilas's largest online home services platform.
                Launched in 2022, AbhiCares today operates in Darbhanga. The
                platform helps customers book reliable & high quality services
                like – Home repair, Beauty treatment, Massages, Haircuts,
                Handyman, Appliance repair, painting, carpentry, event
                management & planner , Business & tax consultancy and many more
                - delivered by trained professionals conveniently at home.
                AbhiCares vision is to empower millions of professionals
                indiawide to deliver services at home like never experienced
                before.
              </p>
            </section>

            {/* <section className={classes.section}>
              <h2 className={classes.h2}>Our Leadership Team</h2>
              <div className={classes.leadership_team_container}>
                {leaders.map((data) => (
                  <LeaderCard key={data.name} {...data} />
                ))}
              </div>
            </section> */}

            <section className={classes.section}>
              <h2 className={classes.h2}>Reconigzed by</h2>
              {/* <div className={classes.company_container}>
                            {
                                company.map(({ src }, i) => (
                                    <img className={classes.company_img} key={i} src={src} alt="company" />
                                ))
                            }
                        </div> */}

              {/* <div className={classes.investers_container}>
                            {
                                investers.map(({ name, src }) => (
                                    <div key={name} className={classes.invester_name_img_container}>
                                        <p className={classes.invester_name}>{name}</p>
                                        <img className={classes.invester_img} src={src} alt="invester" />
                                    </div>
                                ))
                            }
                        </div> */}
            </section>

            <section className={`${classes.section} ${classes.media_section}`}>
              {/* <p className={classes.link_p}>
                        For media queries, contact: <a className={classes.link} href="#">press@urbancompany.com</a>
                        </p> */}
              <p className={classes.p}>
                You could be a part of our journey. Interested?
              </p>
              <button className={classes.button}>Apply Now</button>
            </section>
          </div>
        </div>
      </section>
    );
};

export default AboutUs;