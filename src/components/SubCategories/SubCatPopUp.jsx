import { Dialog, Box, Typography, Grid } from "@mui/material"
import classes from './SubCat.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
// import { Salon } from "../../assets/data";
// import { Slide } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import LazyImage from "../react-lazyload-image/LazyImage";

export const SubCatPopUp = ({ open, onClose, category }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const [allServices, setAllServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => {
        onClose();
    }


    const getAllServices = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-service/${category?._id}`);
            console.log(data);
            setAllServices(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllServices();
    }, [category])


    return (
        <div className="popup popup-modal">

            <Dialog
                fullWidth
                fullScreen={fullScreen}
                open={open} onClose={onClose}
                className={classes['dialog']}
            >
                <div className={classes['wrapper']}>
                    <CloseIcon onClick={handleClose} className={classes['icon']} />
                    <div className={classes['dialog-title']}><Typography>{category.name}</Typography></div>&nbsp;
                    <Box>
                        <div className={classes['container']}>
                            <div className={classes['sub-category']}>
                                {/* <div className={classes['sub-category-name']}><Typography>Salon For Men</Typography></div> */}
                                <Grid container spacing={2}>
                                    {!isLoading
                                        && allServices.length === 0
                                        && <p>No service found</p>
                                    }

                                    {isLoading
                                        && allServices.length === 0
                                        && <Loader />
                                    }

                                    {
                                        allServices.map((service) => (
                                            <Grid key={service.id} item xs={4} sm={3} md={3} lg={3}>
                                                <div onClick={() => navigate(`/services/${service._id}`, { state: service.name })} className={classes['category-cards']} >
                                                    <div className={classes['image-Box']}>
                                                        <LazyImage>
                                                            <img src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${service.imageUrl}`} alt="img" />
                                                        </LazyImage>
                                                    </div>
                                                    <div className={classes['card-name']}><Typography>{service.name}</Typography></div>
                                                </div>
                                            </Grid>
                                        ))
                                    }
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

            </Dialog >
        </div >
    )
}
export default SubCatPopUp
