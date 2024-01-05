import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Banner } from "../../assets/data";
import DummyBanner from "../../assets/banner-dummy.jpg";
import axios from 'axios';
import classes from "./Banner.module.css";
import { useState } from "react";
import { useEffect } from "react";

export const BannerCard = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    laptop: {
      breakpoint: { max: 1023, min: 801 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 800, min: 601 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const [banners, setBanners] = useState([]);
  // const [isLoading,setIsLoading] = useState(true)

  const fetchBanners = async () => {
    try {
      // setIsLoading(true)
      console.log('cms url', process.env.REACT_APP_CMS_URL)
      const response = await axios.get(`${process.env.REACT_APP_CMS_URL}/get-banners`, {
        params: {
          heroBanners: true,
          page: "home-sale-banners",
          section: "web-homepage",
        },
      }, { withCredentials: true }
      )

      console.log('BANNERS', response)

      if (response.status === 200) {
        setBanners(response.data.banners);
        // setIsLoading(false)
      }
      console.log(response)
    } catch (err) {
      console.log(err)
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  return (
    <div className={classes.wrapper}>
      <Carousel
        removeArrowOnDeviceType={["tablet", "mobile"]}
        swipeable={true}
        draggable={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        customTransition="all 2s"
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >

        {banners.length > 0 && banners.map((url, index) => (
          <div key={index} className={classes["image-container"]}>
            <img src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${url}`} alt="Banner" />
          </div>
        ))}

      </Carousel>
    </div>
  );
};

export default BannerCard;
