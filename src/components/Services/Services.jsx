import { useEffect, useState } from "react";
import classes from "./Services.module.css";
import styles from "../../components/Header/Header.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import categories from "../../data/categories.json";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Grid, Typography } from "@mui/material";

import Photo from "../../assets/hero_img.png";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { GoogleApiWrapper } from "google-maps-react";
import Loader from "../loader/Loader";
import useGeolocation from '../../hooks/usegelocation'
import SkeletonCom from "../sekeleton/SkeletonCom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Services = ({ open }) => {
  const [isShow, setIsShow] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userlocation, setUserLocation] = useState(null)
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isImgLoading2, setIsImgLoading2] = useState(true);

  const { location } = useGeolocation();
  console.log('location', location)

  useEffect(() => {
    if (location) {
      console.log('formatted', location.formattedAddress)
      setUserLocation(location.formattedAddress);
    }


  }, [location]);

  const navigate = useNavigate();

  const innerWidth = window.innerWidth;

  const handleOnChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value === "") {
      return;
    }
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/search-service?search=${value}`
      );
      if (data.data.length === 0) {
        setIsMessage(true);
      } else {
        setIsMessage(false);
      }
      setAllServices(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function debounce(fx, time) {
    let id = null;
    return function (data) {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        fx(data);
        // id = null;
      }, time);
    };
  }

  useEffect(() => {
    if (searchInput === "") {
      setIsShow(true);
      setAllServices([]);
      setIsMessage(false)
    } else {
      setAllServices([]);
      setIsShow(false);
    }
  }, [searchInput]);

  const getAllCategories = async () => {
    try {
      // const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/get-all-category`);
      // console.log('categories',data);
      setAllCategories(categories.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const data = [
    {
      _id: "656b8afa9f3a2d134bee939e",
      name: "Women's Salon & Spa",
      image: `${import.meta.env.VITE_APP_IMAGE_URL}/categories/women-salon.png`,
    },
    {
      _id: "656b8ad29f3a2d134bee9398",
      name: "Makeup & Mehandi",
      image: `${import.meta.env.VITE_APP_IMAGE_URL}/categories/makeup-mehndi.png`,
    },
    {
      _id: "656b8b0a9f3a2d134bee93a0",
      name: "Men's Salon & Massage",
      image: `${import.meta.env.VITE_APP_IMAGE_URL}/categories/mens-salon.png`,
    },
    {
      _id: "656b8abe9f3a2d134bee9396",
      name: "Home care",
      image: `${import.meta.env.VITE_APP_IMAGE_URL}/categories/home-care.png`,
    },

    {
      _id: "656b8ae69f3a2d134bee939a",
      name: "Home repair",
      image: `${import.meta.env.VITE_APP_IMAGE_URL}/categories/home-repair.png`,
    },
    {
      _id: "656b8af29f3a2d134bee939c",
      name: "Appliance repair",
      image: `${import.meta.env.VITE_APP_IMAGE_URL}/categories/appliance-repair.png`,
    },


  ];


  return (
    <div className={classes["wrapper"]}>
      <div className={classes["main"]}>
        <div className={classes["right"]}>
          {isImgLoading && <Skeleton height={500} width={500} />}
          <div className={classes["imagecontainer"]}>
            <img style={{ display: !isImgLoading ? 'block' : 'none' }} onLoad={() => setIsImgLoading(false)} src={Photo} alt="This is a " />
          </div>
        </div>
        <div className={classes["left"]}>
          {/* <div className={`${styles.location_container}`}>
            <LocationOnIcon />
            <div style={{ width: '100%' }}>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Your Location"
                className={styles.locationInput}
                value={userlocation ? userlocation : "Please Allow Location"}
              />
            </div>
          </div> */}
          <div className={classes["heading"]}>
            <h4>
              Home services at your doorstep
            </h4>
          </div>
          <div className={`${classes.dFlexRow} ${classes.searchBox}`}>
            <SearchIcon style={{margin:"0 10px"}} />
            <div>
              <input
                onChange={debounce(handleOnChange, 1000)}
                type="text"
                placeholder="Search for"
                name="search"
                id="search"
              />
              {isShow && (
                <label htmlFor="search" className={classes.type_animation}>
                  <TypeAnimation
                    sequence={["'Cleaning'", 1000, "'Facial'", 1000]}
                    speed={50}
                    cursor={false}
                    repeat={Infinity}
                  />
                </label>
              )}
            </div>
            {allServices.length !== 0 && (
              <div className={classes.search_result_box}>
                {allServices?.map((service) => (
                  <>
                    {isImgLoading2 && <Skeleton height={80} width={80} />}
                    <div
                      onClick={() => navigate(`/services/${service?._id}`)}
                      key={service._id}
                      className={classes.search_result_item}
                    >
                      {/* <SkeletonCom
                        src={`${import.meta.env.VITE_APP_IMAGE_URL}/${service.imageUrl}`}
                        alt={"service"}
                        height={60}
                      /> */}
                      <img
                        style={{ display: !isImgLoading2 ? 'block' : 'none' }}
                        onLoad={() => setIsImgLoading2(false)}
                        src={`${import.meta.env.VITE_APP_IMAGE_URL}/${service.imageUrl}`}
                        alt="service"
                      />
                      <div>
                        <p>{service.name}</p>
                        <p>₹{service.startingPrice}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}

            {isMessage && (
              <div className={classes.search_result_box}>
                <p>no result found</p>
              </div>
            )}
          </div>
          <div className={classes["services-content"]}>
            <div className={classes["services-name"]}>
              <Typography variant="h6">What are you looking for?</Typography>
            </div>
            <div className={classes["services-card"]}>
              {!isLoading && allCategories.length === 0 && (
                <p>No category found</p>
              )}

              {isLoading && allCategories.length === 0 && <Loader />}
              <Grid container flex rowGap={3}>
                {data.map((category) => (
                  <Grid key={category._id} item xs={4} sm={4} md={4} lg={4}>
                    <div
                      className={classes["card"]}
                      onClick={() => open(category)}
                    >
                      <div className={classes["cardMedia"]}>
                        <SkeletonCom
                          src={category.image}
                          alt={"category"}
                          height={60}
                        />
                        {/* <img src={category.image} alt="media" /> */}
                      </div>
                      <div className={classes["cardAction"]}>
                        <p className={classes.link}>{category.name}</p>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
            {/* <div className={classes['sub-section']}>
                            <div>New Launches</div>
                            <div className={classes['container']}><img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_432,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1699259522568-6afbb9.jpeg" alt="image" /></div>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Services;
export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
})(Services);
