import Carousel from "react-multi-carousel";
import {Typography} from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import classes from './HomeRepairs.module.css'
import StarIcon from '@mui/icons-material/Star';
import { HomeRepairsdata } from "../../assets/data";


export const HomeRepairs = ()=>{
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
            <div className={classes['heading']}><Typography variant='h4'>Quick Home Repairs</Typography></div>
            <Carousel
                removeArrowOnDeviceType={["tablet", "mobile"]}
                swipeable={true}
                draggable={true}
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
                               HomeRepairsdata.map((item)=>(
                               
                                     <div key={item.id} className={classes['single-card']}>
                                        <div className={classes['cardMedia']}><img src={item.url}/></div>
                                        <div>
                                        <div className={classes['cardname']}><b>{item.name}</b></div>
                                        <div className={classes['rating']}><StarIcon/>&nbsp;4.86&nbsp;&nbsp;(76.8k)</div>
                                        <div className={classes['price']}>₹109</div>
                                        </div>
                                    </div>
                          
                             
                              ))
                             } 

                  </Carousel>

         </div>
    )
}
export default HomeRepairs