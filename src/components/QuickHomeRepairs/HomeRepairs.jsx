import Carousel from "react-multi-carousel";
import { Button, Typography } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import classes from './HomeRepairs.module.css'
import StarIcon from '@mui/icons-material/Star';
import { HomeRepairsdata } from "../../assets/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const HomeRepairs = () => {
  const [allServiceProducts, setAllServiceProducts] = useState([]);

  const navigate = useNavigate();

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

  const getServiceProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-cms-data/656bf7375840ef11ad814f85`, { withCredentials: true });
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
      <div className={classes['heading']}><Typography variant='h4'>Bridal makeup</Typography><Button onClick={() => navigate("/services/656bf7375840ef11ad814f85")} style={{ backgroundColor: "#000" }} variant='contained'>See All</Button></div>
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
        itemClass="carousel-item-padding-40-px">
        {
          allServiceProducts.map((item) => (

            <div key={item.id} className={classes['single-card']}>
              <div className={classes['cardMedia']}><img src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${item.imageUrl[0]}`} alt="product" /></div>
              <div className={classes['card-content']}>
                <div className={classes['cardname']}>{item.name}</div>
                {/* <div className={classes['rating']}><StarIcon />&nbsp;4.86&nbsp;&nbsp;(76.8k)</div> */}
                <div className={classes['price']}>₹{item.offerPrice}</div>
              </div>
            </div>


          ))
        }

      </Carousel>

    </div>
  )
}
export default HomeRepairs