// import Header from "../components/Header/Header";
import Services from "../components/Services/Services";
import BannerCard from "../components/Carousel/BannerCard";
// import MostBooked from "../components/Carousel/MostBooked";
import SalonForWomen from "../components/SalonForWomen/SalonForWomen.jsx";
import MakeupMehandi from "../components/SpaForWomen/WomenSpa.jsx";
import ApplianceRepair from "../components/SpaForMen/SpaForMen.jsx";
import MensSalonMassage from "../components/QuickHomeRepairs/HomeRepairs.jsx";
import classes from "./Home.module.css";
import SubCatPopUp from "../components/SubCategories/SubCatPopUp.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
// import Footer from "../components/Footer/Footer.jsx";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import axios from "axios";

import { useEffect, useState } from "react";
import WebsiteWrapper from "./WebsiteWrapper.jsx";
import HomeCare from "../components/home-care/HomeCare.jsx";
import WhyUsComp from "./whyus/WhyUsComp.jsx";

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
        `${import.meta.env.VITE_APP_CMS_URL}/get-seo-by-page-user-side?page=home-page`
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
    <HelmetProvider>
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
              <HomeCare />
              {/* <SalonForWomen /> */}
              <MakeupMehandi />
              <MensSalonMassage />
              <ApplianceRepair />
            </div>
            <WhyUsComp />
          </div>
        </div>
      </WebsiteWrapper>
    </HelmetProvider>
  );
};
export default Home;
