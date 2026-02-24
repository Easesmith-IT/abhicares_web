import { Dialog, Box, Typography, Grid } from "@mui/material";
import classes from "./SubCat.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
// import { Salon } from "../../assets/data";
// import { Slide } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import SkeletonCom from "../sekeleton/SkeletonCom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useGetApiReq from "../../hooks/useGetApiReq";
import useGeolocation from "../../hooks/usegelocation";

export const SubCatPopUp = ({ open, onClose, category }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  console.log("category", category);

  const { location } = useGeolocation();
  const navigate = useNavigate();

  const [allServices, setAllServices] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isImgLoading, setIsImgLoading] = useState(true);

  const handleClose = () => {
    onClose();
  };

  const { res, fetchData, isLoading } = useGetApiReq();


  const getAllServices = async (lat, lng) => {
    fetchData(`/services/app/get-category-service/${category.id}`, {
      params: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  useEffect(() => {
    if (location?.geometry?.lat && location?.geometry?.lng && category) {
      getAllServices(location?.geometry?.lat, location?.geometry?.lng);
    }
  }, [location.geometry,category]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      setAllServices(res?.data?.data || []);
      console.log("services res", res);
    }
  }, [res]);

  return (
    <div className="popup popup-modal">
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        className={classes["dialog"]}
      >
        <div className={classes["wrapper"]}>
          <CloseIcon onClick={handleClose} className={classes["icon"]} />
          <div className={classes["dialog-title"]}>
            <Typography>{category.name}</Typography>
          </div>
          &nbsp;
          <Box>
            <div className={classes["container"]}>
              <div className={classes["sub-category"]}>
                {/* <div className={classes['sub-category-name']}><Typography>Salon For Men</Typography></div> */}
                <Grid container spacing={2}>
                  {!isLoading && allServices.length === 0 && (
                    <p>No service found</p>
                  )}

                  {isLoading && allServices.length === 0 && <Loader />}

                  {allServices.map((service) => (
                    <Grid key={service.id} item xs={4} sm={3} md={3} lg={3}>
                      <div
                        onClick={() =>
                          navigate(`/services/${service._id}`, {
                            state: {
                              name: service.name,
                              features: service.features,
                            },
                          })
                        }
                        className={classes["category-cards"]}
                      >
                        {isImgLoading && <Skeleton height={100} width={100} />}
                        <div className={classes["image-Box"]}>
                          {/* <SkeletonCom
                                                            alt={"service"}
                                                            src={`${import.meta.env.VITE_APP_IMAGE_URL}/${service.imageUrl}`}
                                                            height={60}
                                                        /> */}
                          <img
                            style={{
                              display: !isImgLoading ? "block" : "none",
                            }}
                            onLoad={() => setIsImgLoading(false)}
                            src={`${import.meta.env.VITE_APP_IMAGE_URL}/${service.imageUrl}`}
                            alt="img"
                          />
                        </div>
                        <div className={classes["card-name"]}>
                          <Typography>{service.name}</Typography>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
              {/* <div className={classes['sub-category']}>
                                <div className={classes['sub-category-name']}><Typography>Salon For Women</Typography></div>
                                <Grid container spacing={2}>

                                    {
                                        Salon.map((item) => (
                                            <Grid item xs={4} sm={3} md={3} lg={3}>
                                                <div className={classes['category-cards']} key={item.id}>
                                                    <div className={classes['image-Box']}><img src={item.url} alt="img" /></div>
                                                    <div className={classes['card-name']}><Typography>{item.name}</Typography></div>
                                                </div>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </div> */}
            </div>
          </Box>
        </div>
      </Dialog>
    </div>
  );
};
export default SubCatPopUp;
