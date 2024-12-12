import axios from "axios";
import classes from "./RegisterAsAProfessional.module.css";
import ProfessionalImg from '../../assets/professional_img.png'
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import WebsiteWrapper from "../WebsiteWrapper";
import { Helmet,HelmetProvider  } from "react-helmet-async";
const RegisterAsAProfessional = () => {
    const [registrationInfo, setRegistrationInfo] = useState({
        name: "",
        phone: "",
        serviceType: "",
        city: "",
        state: ""

    });

      const [seoData, setSeoData] = useState({
    title: "",
    description: "",
  });
  const getSeoForSellerPage = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_CMS_URL}/get-seo-by-page-user-side?page=register-as-professional`
      );
      const { seoTitle, seoDescription } = data?.seo;
      setSeoData({ title: seoTitle, description: seoDescription });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSeoForSellerPage();
  }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setRegistrationInfo({ ...registrationInfo, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!registrationInfo.name
            || !registrationInfo.phone
            || !registrationInfo.serviceType
            || !registrationInfo.city
            || !registrationInfo.state
        ) {
            return;
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_APP_API_URL}/create-enquiry`, { ...registrationInfo });
            console.log(data);
            setRegistrationInfo({
                name: "",
                phone: "",
                serviceType: "",
                city: "",
                state: ""
            })
            toast.success("Thank you! We will get back to you soon");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <HelmetProvider>
        <WebsiteWrapper>
                  <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
      </Helmet>
            <div>
                <div className={classes.hero_section}>
                    <div className={classes.container}>
                        <div className={classes.hero_section_top}>
                            <div className={classes.hero_section_left} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <div>
                                <h1 className={classes.hero_section_h1}>Earn More. Earn Respect.</h1>
                                <p className={classes.hero_section_p}>
                                    Join 100+ partners across Darbhanga
                                </p>
                                </div>
                                
                            </div>
                            <div>
                                <img className={classes.hero_section_img} src={ProfessionalImg} alt="heroImg" />
                            </div>
                        </div>
                        <div className={classes.hero_section_bottom}>
                            <h2 className={classes.hero_section_bottom_h2}>Share your WhatsApp number and we'll reach out via our WhatsApp Business Account.</h2>
                            <form onSubmit={handleOnSubmit}>
                                <div className={classes.input_container}>
                                    <input className={classes.input} onChange={handleOnChange} value={registrationInfo.name} name="name" id="name" type="text" placeholder="Your name" />
                                    <input className={classes.input} onChange={handleOnChange} value={registrationInfo.phone} name="phone" id="phone" type="text" placeholder="Your phone number" />
                                    <input className={classes.input} onChange={handleOnChange} value={registrationInfo.serviceType} name="serviceType" id="serviceType" type="text" placeholder="Service type" />
                                    <input className={classes.input} onChange={handleOnChange} value={registrationInfo.city} name="city" id="city" type="text" placeholder="Your city" />
                                    <input className={classes.input} onChange={handleOnChange} value={registrationInfo.state} name="state" id="state" type="text" placeholder="Your state" />
                                </div>
                                <button className={classes.button}>Join Us</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={classes.company_info}>
                    <div className={classes.container}>
                        <h2 className={classes.company_info_h3}>Join AbhiCares to change your life</h2>
                        <p className={classes.company_info_p}>AbhiCares is an app-based marketplace that empowers professionals like you to become your own boss</p>
                        {/* <ul className={classes.list_container}>
                            <li className={classes.list_item}>
                                <h3 className={classes.list_item_h3}>40,000+</h3>
                                <p className={classes.list_item_p}>Partners already on board</p>
                            </li>
                            <li className={classes.list_item}>
                                <h3 className={classes.list_item_h3}>₹1547Cr</h3>
                                <p className={classes.list_item_p}>Paid out to partners in 2022</p>
                            </li>
                            <li className={classes.list_item}>
                                <h3 className={classes.list_item_h3}>1,250,000+</h3>
                                <p className={classes.list_item_p}>Services delivered each month</p>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </div>
            </WebsiteWrapper>
            </HelmetProvider>
    );
};

export default RegisterAsAProfessional;