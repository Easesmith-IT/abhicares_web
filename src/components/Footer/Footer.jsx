import classes from './Footer.module.css'
import { CompanyData,ForCustomers, Partner } from '../../assets/data'
import { Grid, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from '../../assets/mainLogo2.png'
import { Link } from 'react-router-dom';


export const Footer = ()=>{

    return(
       <div className={classes['wrapper']}>
        <div className={classes['main']}>
        <div className={classes['logo-container']}>
            <div><img src={Logo} alt="logo" /></div>
        </div>
        <div className={classes['Footer']}>
             <Grid container spacing={2}>
                   <Grid item xs={12} sm={6} md={3} lg={3}>
                     <div className={classes['sections']}>
                     <div className={classes['heading']}><Typography variant='h5'>Company</Typography></div>
                        {
                    CompanyData.map((item)=>(
                        <div className={classes['footer-content']}>
                            <div><Link to={item.url}>{item.name}</Link></div>
                        </div>
                    ))
                        }
                     </div>
                   </Grid>
                   <Grid item xs={12} sm={6} md={3} lg={3}>
                    <div className={classes['sections']}>
                         <div className={classes['heading']}><Typography variant='h5'>For Customers</Typography></div>
                        {
                    ForCustomers.map((item)=>(
                        <div className={classes['footer-content']}>
                            <div><Link to={item.url}>{item.name}</Link></div>
                        </div>
                    ))
                        }
                    </div>
                   </Grid>
 
            
                   <Grid item xs={12} sm={6} md={3} lg={3}>
              <div className={classes['sections']}> 
                       <div className={classes['heading']}><Typography variant='h5'>For Partners</Typography></div>
                        {
                    Partner.map((item)=>(
                        <div className={classes['footer-content']}>
                            <div><Link to={item.url}>{item.name}</Link></div>
                        </div>
                    ))
                        }
              </div>
                   </Grid>
             
                   <Grid item xs={12} sm={6} md={3} lg={3}>
              <div className={classes['sections']}>
                        <div className={classes['heading']}><Typography variant='h5'>Social Links</Typography></div> 
                        <div className={classes['social']}>
                            <div><a href="#"><TwitterIcon/></a></div>
                            <div><a href="#"><FacebookIcon/></a></div>
                            <div><a href="#"><InstagramIcon/></a></div>
                            <div><a href="#"><LinkedInIcon/></a></div>
                        </div>
                        <div className={classes['download']}>
                            <div><a href="#"><img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_3,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1648463870745-38fece.png" alt="image" /></a></div>
                            <div><a href="#"><img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_3,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1696419732772-28cd3d.jpeg" alt="image" /></a></div>
                        </div>
              </div>
                    
                   </Grid>
             </Grid>
        </div>
        <div className={classes['sub-footer']}>
          <div>© Copyright 2023 Abhi Cares. All rights reserved.</div>  
        </div>
        </div>
       </div>
    )
}
export default Footer