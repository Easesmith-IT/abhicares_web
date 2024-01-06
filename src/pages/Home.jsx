// import Header from "../components/Header/Header";
import Services from "../components/Services/Services";
import BannerCard from "../components/Carousel/BannerCard";
// import MostBooked from "../components/Carousel/MostBooked";
import SalonForWomen from "../components/SalonForWomen/SalonForWomen.jsx";
import WomenSpa from "../components/SpaForWomen/WomenSpa.jsx";
import SpaForMen from "../components/SpaForMen/SpaForMen.jsx";
import HomeRepairs from "../components/QuickHomeRepairs/HomeRepairs.jsx";
import classes from "./Home.module.css";
import SubCatPopUp from "../components/SubCategories/SubCatPopUp.jsx";
// import Footer from "../components/Footer/Footer.jsx";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import axios from "axios";

import { useState } from "react";
import WebsiteWrapper from "./WebsiteWrapper.jsx";


export const Home = () => {
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
    console.log("google api key home", process.env.GOOGLE_MAP_API_KEY);

  const handleOpen = (data) => {
    setCategory(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <WebsiteWrapper>
      <div className={classes["wrapper"]}>
        <div className={classes["body-wrapper"]}>
          <div className={classes["body"]}>
            <Services onClick={handleOpen} open={handleOpen} />
            {open && (
              <SubCatPopUp
                category={category}
                open={open}
                onClose={handleClose}
              />
            )}
            <BannerCard />
            {/* <MostBooked/> */}
            <SalonForWomen />
            <WomenSpa />
            <HomeRepairs />
            <SpaForMen />
          </div>
        </div>
      </div>
    </WebsiteWrapper>
  );
};
export default Home;
