import classes from './Footer.module.css'
import { Grid, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from '../../assets/mainLogo2.png'
import { Link } from 'react-router-dom';

import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


export const Footer = () => {
    return (
        <div className={classes['wrapper']}>
            <div className={classes['main']}>
                <div className={classes['logo-container']} style={{ marginTop: '20px' }}>
                    <img src={Logo} alt="logo" />
                </div>
                <div className={classes['Footer']}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <div className={classes['sections']}>
                                <div className={classes['heading']}><Typography variant='h5'>Company</Typography></div>
                                <div className={classes['footer-content']}>
                                    <p className={classes.p}><Link to="/aboutUs">About Us</Link></p>
                                </div>

                                <div className={classes['footer-content']}>
                                    <p className={classes.p}><Link to="/why-us">Why Us</Link></p>
                                </div>
                                <div className={classes['footer-content']}>
                                    <p className={classes.p}><Link to="/termsAndConditions">Terms and conditions</Link></p>
                                </div>
                                <div className={classes['footer-content']}>
                                    <p className={classes.p}><Link to="/privacy-policy">Privacy & Policy</Link></p>
                                </div>

                                <div className={classes['footer-content']}>
                                    <p className={classes.p}><Link to="/antiDiscriminationPolicy">Anti-discrimination Policy</Link></p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <div className={classes['sections']}>
                                <div className={classes['heading']}><Typography variant='h5'>For Customers</Typography></div>

                                <div className={classes['footer-content']}>
                                    <p className={classes.p}><Link to="/contactUs">Contact Us</Link></p>
                                </div>
                                <div className={classes['footer-content']}>
                                    <p className={classes.p}><Link to="/blog">Blog</Link></p>
                                </div>

                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <div className={classes['sections']}>
                                <div className={classes['heading']}><Typography variant='h5'>For Partners</Typography></div>

                                <div className={classes['footer-content']}>
                                    <p className={classes.p}><Link to="/registerAsProfessionals">Register as Professionals</Link></p>
                                </div>

                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <div className={classes['sections']}>
                                <div className={classes['heading']}><Typography variant='h5'>Social Links</Typography></div>
                                <div className={classes['social']}>
                                    <div><Link to="#"><TwitterIcon /></Link></div>
                                    <div><Link to="#"><FacebookIcon /></Link></div>
                                    <div><Link to="#"><InstagramIcon /></Link></div>
                                    <div><Link to="#"><LinkedInIcon /></Link></div>
                                </div>
                                <div className={classes['download']}>
                                    {/* <div><Link to="#"><img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_3,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1648463870745-38fece.png" alt="image" /></Link></div> */}
                                    <div>
                                        <a target='_blank' rel="noreferrer" href='https://play.google.com/store/apps/details?id=com.abhicares.abhicares_main&hl=en'>
                                            <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_3,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1696419732772-28cd3d.jpeg" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </Grid>
                    </Grid>
                </div>
                <div className={classes.help_wrapper}>
                    <div className={classes.help}>Need Help?</div>
                    <div className={classes.bg_white}>
                        <a href="tel:+9090767601">
                            <FaPhoneAlt />
                            9090-7676-01
                        </a>
                    </div>
                    <div className={classes.bg_white}>
                        <a href="https://wa.me/919090767601?text=Hello%20there" target='_blank'>
                            <FaWhatsapp size={22} />
                            9090-7676-01
                        </a>
                    </div>
                    <div className={classes.bg_white}>
                        <a href="mailto:info@abhicares.com">
                            <IoMdMail size={22} />
                            info@abhicares.com
                        </a>
                    </div>
                </div>
                <div className={classes['sub-footer']}>
                    <div>© Copyright 2023 AzadKart Pvt. Ltd. All rights reserved.</div>
                </div>
            </div>
        </div>
    )
}
export default Footer