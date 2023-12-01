import axios from "axios";
import classes from "./RegisterAsAProfessional.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterAsAProfessional = () => {
    const [registrationInfo, setRegistrationInfo] = useState({
        phone: "",
        serviceType: "",
        city: "",
        state: ""

    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setRegistrationInfo({ ...registrationInfo, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!registrationInfo.phone
            || !registrationInfo.serviceType
            || !registrationInfo.city
            || !registrationInfo.state
        ) {
            return;
        }
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-enquiry`, { ...registrationInfo });
            console.log(data);
            setRegistrationInfo({
                phone: "",
                serviceType: "",
                city: "",
                state: ""
            })
            toast.success("Registered successfully");
        } catch (error) {
            console.log(error);
        }
    };
    console.log(registrationInfo);

    return (
        <>
            <div>
                <div className={classes.hero_section}>
                    <div className={classes.container}>
                        <div className={classes.hero_section_top}>
                            <div className={classes.hero_section_left}>
                                <h1 className={classes.hero_section_h1}>Earn More. Earn Respect. Safety Ensured.</h1>
                                <p className={classes.hero_section_p}>
                                    Join 40,000+ partners across India, USA, Singapore, UAE and many more
                                </p>
                            </div>
                            <div>
                                <img className={classes.hero_section_img} src="https://urbanclap-prod.s3-ap-southeast-1.amazonaws.com/categories/category_v2/partner_hero_india_cover.png" alt="heroImg" />
                            </div>
                        </div>
                        <div className={classes.hero_section_bottom}>
                            <h2 className={classes.hero_section_bottom_h2}>Share your WhatsApp number and we'll reach out via our WhatsApp Business Account.</h2>
                            <form onSubmit={handleOnSubmit}>
                                <div className={classes.input_container}>
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
                        <ul className={classes.list_container}>
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
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterAsAProfessional;