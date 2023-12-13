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
import men from "../../assets/men.png";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import useGeolocation from '../../hooks/usegelocation'

export const Services = ({ open }) => {
  const [isShow, setIsShow] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userlocation,setUserLocation] = useState(null)

  const { location } = useGeolocation();

  useEffect(() => {
    if (location) {
      setUserLocation(location.formatted);
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
        `${process.env.REACT_APP_API_URL}/search-service?search=${value}`
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
    } else {
      setIsShow(false);
    }
  }, [searchInput]);

  const getAllCategories = async () => {
    try {
      // const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-category`);
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
      _id: "656b8abe9f3a2d134bee9396",
      name: "House care",
      image: `${process.env.REACT_APP_IMAGE_URL}/uploads/categories/home-care.png`,
    },
    {
      _id: "656b8ad29f3a2d134bee9398",
      name: "Personal care",
      image: `${process.env.REACT_APP_IMAGE_URL}/uploads/categories/personal-care.png`,
    },
    {
      _id: "656b8ae69f3a2d134bee939a",
      name: "House repair",
      image: `${process.env.REACT_APP_IMAGE_URL}/uploads/categories/home-repair.png`,
    },
    {
      _id: "656b8af29f3a2d134bee939c",
      name: "Appliance repair",
      image: `${process.env.REACT_APP_IMAGE_URL}/uploads/categories/appliance-repair.png`,
    },
    {
      _id: "656b8afa9f3a2d134bee939e",
      name: "Painting",
      image: `${process.env.REACT_APP_IMAGE_URL}/uploads/categories/paint.png`,
    },
    {
      _id: "656b8b0a9f3a2d134bee93a0",
      name: "CCTV",
      image: `${process.env.REACT_APP_IMAGE_URL}/uploads/categories/cctv-camera.png`,
    },
  ];


  return (
    <div className={classes["wrapper"]}>
      <div className={classes["main"]}>
        <div className={classes["right"]}>
          <div className={classes["imagecontainer"]}>
            <img src={Photo} alt="This is a " />
          </div>
        </div>
        <div className={classes["left"]}>
          <div className={`${styles.dFlexRow} ${styles.actions}`}>
            <div className={`${styles.location_container}`}>
              <div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Your Location"
                  className={styles.locationInput}
                  value={userlocation?userlocation:'Please Allow Location'}
                />
              </div>
              <LocationOnIcon />
            </div>
          </div>
          <div className={classes["heading"]}>
            <Typography variant={innerWidth < 1000 ? "h5" : "h3"}>
              Home services at your doorstep
            </Typography>
          </div>
          <div className={`${classes.dFlexRow} ${classes.searchBox}`}>
            <div>
              <SearchIcon />
            </div>
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
                  <div
                    onClick={() => navigate(`/services/${service?._id}`)}
                    key={service._id}
                    className={classes.search_result_item}
                  >
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${service.imageUrl}`}
                      alt="service"
                    />
                    <div>
                      <p>{service.name}</p>
                      <p>₹{service.startingPrice}</p>
                    </div>
                  </div>
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
              <Grid container>
                {data.map((category) => (
                  <Grid key={category._id} item xs={4} sm={4} md={4} lg={4}>
                    <div
                      className={classes["card"]}
                      onClick={() => open(category)}
                    >
                      <div className={classes["cardMedia"]}>
                        <img src={category.image} alt="media" />
                      </div>
                      <div className={classes["cardAction"]}>
                        <Link to="#">{category.name}</Link>
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

export default Services;
