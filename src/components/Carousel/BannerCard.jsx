import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classes from "./Banner.module.css";
import { useState, useEffect } from "react";
import SkeletonCom from "../sekeleton/SkeletonCom";
import { useNavigate } from "react-router-dom";
import useGetApiReq from "../../hooks/useGetApiReq"; // ✅ use hook
import useGeolocation from "../../hooks/usegelocation";

export const BannerCard = () => {
  const navigate = useNavigate();
  const { res, isLoading, fetchData } = useGetApiReq();

  const [banners, setBanners] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    laptop: { breakpoint: { max: 1023, min: 801 }, items: 3, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 800, min: 601 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  const { location, status } = useGeolocation();

  console.log("status", status);
  console.log("location", location);

  // ✅ Fetch banners using hook
  useEffect(() => {
    if (location?.geometry?.lat && location?.geometry?.lng) {
      fetchData("/banners/get-app-banners", {
        params: {
          type: "HOME",
          latitude: location?.geometry?.lat,
          longitude: location?.geometry?.lng,
        },
      });
    }
  }, [location]);

  // ✅ Update state when response comes
  useEffect(() => {
    if (res?.data?.success) {
      console.log("res", res);
      
      setBanners(res.data.banners || []);
    }
  }, [res]);

  return (
    <div className={classes.wrapper}>
      <Carousel
        removeArrowOnDeviceType={["tablet", "mobile"]}
        swipeable
        draggable
        responsive={responsive}
        ssr
        infinite
        autoPlay
        customTransition="all 2s"
        keyBoardControl
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, i) => <SkeletonCom key={i} height={200} />)
          : banners.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/services/${item?.serviceId}`)}
                className={classes["image-container"]}
              >
                <SkeletonCom
                  alt="Banner"
                  src={`${import.meta.env.VITE_APP_IMAGE_URL}/${item?.image}`}
                  height={200}
                />
              </div>
            ))}
      </Carousel>
    </div>
  );
};

export default BannerCard;
