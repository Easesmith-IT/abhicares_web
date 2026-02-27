import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { Typography } from "@mui/material";
import ReactStars from "react-stars";

import classes from "./QuickHomeRepairs/HomeRepairs.module.css";
import LoadingSkeleton from "./loading-skeleton/LoadingSkeleton";
import useGetApiReq from "../hooks/useGetApiReq";
import Skeleton from "react-loading-skeleton";
import useGeolocation from "../hooks/usegelocation";

const CategoryCarousel = ({ categoryId, categoryName }) => {
  const navigate = useNavigate();

  const [allServices, setAllServices] = useState([]);

  const { res, isLoading, fetchData } = useGetApiReq();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4,
    },
    laptop: {
      breakpoint: { max: 1399, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 768 },
      items: 2,
    },
    largemobile: {
      breakpoint: { max: 767, min: 521 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 520, min: 0 },
      items: 2,
    },
  };

  const { location } = useGeolocation();

  const getServices = async (lat, lng) => {
    fetchData(`/shopping/get-products-by-categoryId/${categoryId}`, {
      params: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  useEffect(() => {
    if (location?.geometry?.lat && location?.geometry?.lng && categoryId) {
      getServices(location?.geometry?.lat, location?.geometry?.lng);
    }
  }, [location.geometry, categoryId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log(`products res= ${categoryName}, ${categoryId}`, res);
      setAllServices(res?.data?.data || []);
    }
  }, [res]);

  return (
    <div className={classes["Card"]}>
      <div className={classes["heading"]}>
        <Typography variant="h4">{categoryName}</Typography>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : allServices.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <Carousel
          removeArrowOnDeviceType={["tablet", "mobile"]}
          swipeable
          draggable
          showDots={false}
          responsive={responsive}
          ssr
          infinite={false}
          keyBoardControl
          customTransition="all 1s"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-30-px"
        >
          {allServices.map((item) => (
            <div
              key={item._id}
              className={classes["card"]}
              onClick={() =>
                navigate(`services/${item?.service?._id}`, {
                  state: {
                    name: item?.service?.name,
                    features: item?.service?.features,
                  },
                })
              }
            >
              <div className={classes["single-card"]}>
                <div className={classes["cardMedia"]}>
                  <img
                    src={`${import.meta.env.VITE_APP_IMAGE_URL}/${item.imageUrl}`}
                    alt={item.name}
                  />
                </div>
              </div>

              <p className={classes["cardname"]}>
                <b>{item.name}</b>
              </p>

              <div className={classes.flex}>
                <div className={classes.flex_item}>
                  <ReactStars
                    count={1}
                    edit={false}
                    value={1}
                    size={20}
                    color2={"#ffd700"}
                  />
                  {item.rating} ({item?.totalReviews})
                </div>

                <p className={classes.price}>
                  <span style={{ color: "green" }}>₹{item.offerPrice}</span>
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategoryCarousel;
