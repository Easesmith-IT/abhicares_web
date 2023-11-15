import Header from "../components/Header/Header"
import Services from "../components/Services/Services"
import  BannerCard  from "../components/Carousel/BannerCard"
import MostBooked from "../components/Carousel/MostBooked"
import SalonForWomen from "../components/SalonForWomen/SalonForWomen.jsx"
import WomenSpa from "../components/SpaForWomen/WomenSpa.jsx"
import SpaForMen from "../components/SpaForMen/SpaForMen.jsx"
import HomeRepairs from "../components/QuickHomeRepairs/HomeRepairs.jsx"
import classes from './Home.module.css'
import SubCatPopUp from "../components/SubCategories/SubCatPopUp.jsx"
import Footer from "../components/Footer/Footer.jsx"

import { useState } from "react"

export const Home = ()=>{


    const[open,setOpen]= useState(false)
    const handleOpen=()=>{
        
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
    }


return(
<div className={classes['wrapper']}>
<Header/>
<div className={classes['body-wrapper']}>
<div className={classes['body']}>
<Services onClick={handleOpen} open={handleOpen}/>
   <SubCatPopUp open={open} onClose={handleClose}/>
   <BannerCard/>
   <MostBooked/>
   <SalonForWomen/>
   <WomenSpa/>
   <HomeRepairs/>
   <SpaForMen/> 
</div>
</div>
<Footer />
</div>
)
}
export default Home


