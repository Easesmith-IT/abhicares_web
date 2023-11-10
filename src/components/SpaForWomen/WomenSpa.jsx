import Carousel from "react-multi-carousel";
import {Typography} from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import classes from './WomenSpa.module.css'
import { WomenSalon } from "../../assets/data";
import { Button } from "@mui/material";


export const WomenSpa = ()=>{
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1400 },
          items: 4
        },
        laptop:{
          breakpoint: { max: 1399, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 768, min: 1023 },
          items: 3
        },
        largemobile: {
          breakpoint: { max: 768, min: 521 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 520, min: 0 },
          items: 2
        }
      };
    return(
         <div className={classes['Card']}>
            <div className={classes['heading']}><Typography variant='h4'>Spa For Women</Typography><Typography>Refresh. Rewind .Reuvinate</Typography></div>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={false}
                keyBoardControl={true}
                customTransition="all 1s"
                transitionDuration={500}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-30-px">
                             {
                               WomenSalon.map((item)=>(
                                <div className={classes['card']} key={item.id}>
                                  <div className={classes['single-card']}>
                                  <div className={classes['cardname']}><b>{item.name}</b></div>
                                  <div className={classes['cardMedia']}><img src={item.url}/></div>
                                  </div>
                          
                              </div>
                              ))
                             } 

                  </Carousel>

         </div>
    )
}
export default WomenSpa