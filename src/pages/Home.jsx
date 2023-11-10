import Header from "../Components/Header/Header"
import Services from "../Components/Services/Services"
import  BannerCard  from "../Components/Carousel/BannerCard"
import MostBooked from "../Components/Carousel/MostBooked"
import SalonForWomen from "../Components/SalonForWomen/SalonForWomen.jsx"
import WomenSpa from "../Components/SpaForWomen/WomenSpa.jsx"
import SpaForMen from "../Components/SpaForMen/SpaForMen.jsx"
import HomeRepairs from "../Components/QuickHomeRepairs/HomeRepairs.jsx"
import classes from './Home.module.css'
import SubCatPopUp from "../Components/SubCategories/SubCatPopUp.jsx"
import Footer from "../Components/Footer/Footer.jsx"

import { useState } from "react"

export const Home = ()=>{


    const[open,setOpen]= useState(false)
    const[selectOption,setSelectedOption]=useState(null);
    const handleOpen=()=>{
        // setSelectedOption(option)
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


