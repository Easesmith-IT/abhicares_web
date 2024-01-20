import { useState, useEffect } from "react";
import axios from "axios";
import RecImg1 from "../../assets/recongized-by/rec-by-1.jpg";
import RecImg2 from "../../assets/recongized-by/rec-by-2.png";
import RecImg3 from "../../assets/recongized-by/rec-by-3.png";
import RecImg4 from "../../assets/recongized-by/rec-by-4.png";
import RecImg5 from "../../assets/recongized-by/rec-by-5.png";
import { Helmet } from "react-helmet";
import classes from "./AboutUs.module.css";

import WebsiteWrapper from "../WebsiteWrapper";

const AboutUs = () => {
  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
  });
  const getSeoForAboutPage = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_CMS_URL}/get-seo-by-page-user-side?page=about-us`
      );
      const { seoTitle, seoDescription } = data?.seo;
      setSeoData({ title: seoTitle, description: seoDescription });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSeoForAboutPage();
  }, []);

  return (
    <WebsiteWrapper>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
      </Helmet>
      <section className={classes.about_section}>
        <div className={classes.heading_div}>
          <h1 className={classes.heading}>AboutUs</h1>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <h2 className={classes.h2}>Who we are</h2>
            <p className={classes.p}>
              AbhiCares, established in 2022, has emerged as the largest online
              home services platform in Mithila, currently serving the vibrant
              city of Darbhanga. Our platform is dedicated to facilitating
              customers in booking a wide array of reliable and high-quality
              services, ranging from home repairs, home care, beauty treatments,
              massages, haircuts, handyman services, appliance repairs,
              painting, carpentry, and much more. Our commitment is to ensure
              these services are seamlessly delivered by skilled professionals
              in the comfort of customers' homes.
            </p>

            <ul className={classes.list_container}>
              <li className={classes.list_item}>
                <p className={classes.list_item_bold_p}>100+</p>
                <p className={classes.list_item_p}>Trained Professionals</p>
              </li>
              <li className={classes.list_item}>
                <p className={classes.list_item_bold_p}>1300+</p>
                <p className={classes.list_item_p}>Happy Customers</p>
              </li>
              <li className={classes.list_item}>
                <p className={classes.list_item_bold_p}>2</p>
                <p className={classes.list_item_p}>Cities</p>
              </li>
              <li className={classes.list_item}>
                <p className={classes.list_item_bold_p}>1</p>
                <p className={classes.list_item_p}>Countries</p>
              </li>
            </ul>

            <section className={classes.section}>
              <h2 className={classes.h2}>How We do it</h2>
              <p className={classes.p}>
                At AbhiCares, we aspire to revolutionize the home services
                industry by empowering millions of professionals across India.
                Our vision extends beyond the ordinary – we aim to redefine the
                home service experience, offering a level of convenience and
                excellence that has never been experienced before. Join us on
                this transformative journey as we bring the future of home
                services to your doorstep.
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
              <div className={classes.company_container}>
                <img
                  className={classes.company_img}
                  src={RecImg1}
                  alt="company"
                />
                <img
                  className={classes.company_img}
                  src={RecImg2}
                  alt="company"
                />
                <img
                  className={classes.company_img}
                  src={RecImg3}
                  alt="company"
                />
                <img
                  className={classes.company_img}
                  src={RecImg4}
                  alt="company"
                />
                <img
                  className={classes.company_img}
                  src={RecImg5}
                  alt="company"
                />
              </div>

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
              {/* <p className={classes.p}>
              You could be a part of our journey. Interested?
            </p> */}
              {/* <button className={classes.button}>Apply Now</button> */}
            </section>
          </div>
        </div>
      </section>
    </WebsiteWrapper>
  );
};

export default AboutUs;
