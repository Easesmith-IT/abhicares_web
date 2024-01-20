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
import { Helmet } from "react-helmet";
import axios from "axios";
// import Footer from "../components/Footer/Footer.jsx";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import axios from "axios";

import { useEffect, useState } from "react";
import WebsiteWrapper from "./WebsiteWrapper.jsx";

export const Home = () => {
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
  });

  const getSeoForHomePage = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_CMS_URL}/get-seo-by-page-user-side?page=home-page`
      );
      const { seoTitle, seoDescription } = data?.seo;
      setSeoData({ title: seoTitle, description: seoDescription });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (data) => {
    setCategory(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSeoForHomePage();
  }, []);

  return (
    <WebsiteWrapper>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
      </Helmet>
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
