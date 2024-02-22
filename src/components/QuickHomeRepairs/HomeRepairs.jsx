import Carousel from "react-multi-carousel";
import { Button, Typography } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import classes from './HomeRepairs.module.css'
import StarIcon from '@mui/icons-material/Star';
import { HomeRepairsdata } from "../../assets/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SkeletonCom from "../sekeleton/SkeletonCom";


export const HomeRepairs = () => {
  const [allServiceProducts, setAllServiceProducts] = useState([]);

  const navigate = useNavigate();

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

  const getServiceProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-products-by-categoryId/656b8b0a9f3a2d134bee93a0`, { withCredentials: true });
      // console.log(data);
      setAllServiceProducts(data.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getServiceProducts();
  }, [])

  return (
    <div className={classes['Card']}>
      <div className={classes['heading']}><Typography variant='h4'>Men's Salon & Massage</Typography></div>
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
          allServiceProducts.map((item) => (
            <>
              <div onClick={() => navigate(`services/${item.serviceId}`,{ state: { name: item?.serviceId?.name, features: item?.serviceId?.features } })} className={classes['card']} key={item._id}>
                <div className={classes['single-card']}>
                  <div className={classes['cardMedia']}>
                    <SkeletonCom
                      alt={"service"}
                      src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${item.imageUrl}`}
                      height={230}
                    />
                    {/* <img src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${item.imageUrl}`} alt="service" /> */}
                  </div>
                </div>

              </div>
              <p className={classes['cardname']}><b>{item.name}</b></p>
              <p className={classes.price}><span style={{ color: 'green' }}>₹{item.offerPrice}</span></p>
            </>
          ))
        }

      </Carousel>

    </div>
  )
}
export default HomeRepairs