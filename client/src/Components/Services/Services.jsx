import { Grid, Typography } from '@mui/material'
import classes from './Services.module.css'
import Photo from '../../assets/rightPhoto.png'
import { ServicesData } from '../../assets/data'



export const Services = ({open})=>{


    return(
        <div className={classes['wrapper']}>          
           <div className={classes['main']}>
              <div className={classes['left']}>
                  <div className={classes['heading']}><Typography>Home services at your doorstep</Typography></div>
                  <div className={classes['services-content']}>
                        <div className={classes['services-name']}><Typography variant='h6'>What are you looking for?</Typography></div>
                        <div className={classes['services-card']}>
                            <Grid container>
                               
                            {
                               ServicesData.map((item)=>(
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <div className={classes['card']} key={item.id} onClick={open}>
                                        <div className={classes['cardMedia']}><img src={item.image} alt='media'/></div>
                                        <div className={classes['cardAction']}><a href="#">{item.name}</a></div>
                                    </div>
                                    </Grid>
                                ))
                            }
                                </Grid>
                         
                        </div>
                        <div className={classes['sub-section']}>
                            <div>New Launches</div>
                            <div className={classes['container']}><img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_432,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1699259522568-6afbb9.jpeg" alt="image" /></div>
                        </div>
                        
                    </div>  
              </div>
              <div className={classes['right']}>
                 <div className={classes['imagecontainer']}><img src={Photo} alt="This is a photo" /></div>
              </div>
           </div>
        </div>
    )
}

export default Services