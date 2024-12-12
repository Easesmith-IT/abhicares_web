import Carousel from "react-multi-carousel";
import { Typography } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import classes from '../QuickHomeRepairs/HomeRepairs.module.css'
import { WomenSalon } from "../../assets/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SkeletonCom from "../sekeleton/SkeletonCom";
import ReactStars from "react-stars";
import LoadingSkeleton from "../loading-skeleton/LoadingSkeleton";


export const WomenSpa = () => {
  const navigate = useNavigate();

  const [allServices, setAllServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4
    },
    laptop: {
      breakpoint: { max: 1399, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 1023 },
      items: 2
    },
    largemobile: {
      breakpoint: { max: 767, min: 521 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 520, min: 0 },
      items: 2
    }
  };

  const getServices = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/get-products-by-categoryId/656b8ad29f3a2d134bee9398`, { withCredentials: true });
      console.log("woment spa", data);
      setAllServices(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getServices();
  }, [])

  return (
    <div className={classes['Card']}>
      <div className={classes['heading']}><Typography variant='h4'>Makeup & Mehandi</Typography></div>
      {isLoading ?
        <LoadingSkeleton />
        :
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
            allServices.map((item) => (
              <>
                <div onClick={() => navigate(`services/${item?.serviceId?._id}`, { state: { name: item?.serviceId?.name, features: item?.serviceId?.features } })} className={classes['card']} key={item._id}>


                  <div className={classes['single-card']}>
                    <div className={classes['cardMedia']}>
                      {/* <SkeletonCom
                        alt={"service"}
                        src={`${import.meta.env.VITE_APP_IMAGE_URL}/${item.imageUrl}`}
                        height={230}
                      /> */}
                      <img src={`${import.meta.env.VITE_APP_IMAGE_URL}/${item.imageUrl}`} alt="service" />
                    </div>
                  </div>

                </div>
                <p className={classes['cardname']}><b>{item.name}</b></p>
                <div className={classes.flex}>
                  <div className={classes.flex_item}>
                    <ReactStars
                      count={1}
                      edit={false}
                      value={1}
                      size={24}
                      color2={'#ffd700'}
                    />
                    {item.rating}
                    ({item?.totalReviews})
                  </div>
                  <p className={classes.price}><span style={{ color: 'green' }}>₹{item.offerPrice}</span></p>
                </div>
              </>
            ))
          }

        </Carousel>}

    </div>
  )
}
export default WomenSpa