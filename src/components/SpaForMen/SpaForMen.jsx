import Carousel from "react-multi-carousel";
import { Typography } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import classes from './SpaForMen.module.css'
import { WomenSalon } from "../../assets/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const SpaForMen = () => {
  const navigate = useNavigate();

  const [allServices, setAllServices] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 5
    },
    laptop: {
      breakpoint: { max: 1399, min: 1024 },
      items: 5
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

  const getServices = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-category-services/656b8af29f3a2d134bee939c`, { withCredentials: true });
      // console.log("woment spa", data);
      setAllServices(data.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getServices();
  }, [])

  return (
    <div className={classes['Card']}>
      <div className={classes['heading']}><Typography variant='h4'>Appliance repair</Typography></div>
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

            <div key={item._id} onClick={() => navigate(`/services/${item._id}`)} className={classes['single-card']}>
              <div className={classes['cardname']}><b>{item.name}</b></div>
              <div className={classes['cardMedia']}><img src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${item.imageUrl}`} alt="service" /></div>
            </div>


          ))
        }

      </Carousel>

    </div>
  )
}
export default SpaForMen