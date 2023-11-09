import classes from "./RegisterAsAProfessional.module.css";

const RegisterAsAProfessional = () => {
    return (
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
                        <form>
                            <div className={classes.input_container}>
                                <input className={classes.input} type="text" placeholder="Your phone number" />
                                <input className={classes.input} type="text" placeholder="Service type" />
                                <input className={classes.input} type="text" placeholder="Your city" />
                                <input className={classes.input} type="text" placeholder="Your state" />
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
    );
};

export default RegisterAsAProfessional;