import { useEffect, useState } from 'react';
import classes from './Services.module.css';
import axios from 'axios';
import { TypeAnimation } from "react-type-animation";

import { Grid, Typography } from '@mui/material';

import Photo from '../../assets/rightPhoto.png';
import men from '../../assets/men.png';
import SearchIcon from '@mui/icons-material/Search';



export const Services = ({ open }) => {
    const [isShow, setIsShow] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [allCategories, setAllCategories] = useState([]);

    const innerWidth = window.innerWidth

    const handleOnChange = (e) => {
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        if (searchInput === "") {
            setIsShow(true);
        }
        else {
            setIsShow(false);
            // (async () => {
            //     try {
            //         const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/search-service`);
            //         console.log(data);
            //     } catch (error) {
            //         console.log(error);
            //     }
            // })()
        }
    }, [searchInput])

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-category`);
            console.log(data);
            setAllCategories(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [])


    return (
        <div className={classes['wrapper']}>
            <div className={classes['main']}>
                <div className={classes['left']}>
                    <div className={classes['heading']}><Typography variant={innerWidth < 1000 ? 'h5' : "h3"}>Home services at your doorstep</Typography></div>
                    <div className={`${classes.dFlexRow} ${classes.searchBox}`}>
                        <div><SearchIcon /></div>
                        <div>
                            <input onChange={handleOnChange} type="text" placeholder='Search for' name='search' id='search' />
                            {isShow && <label htmlFor='search' className={classes.type_animation}>
                                <TypeAnimation
                                    sequence={[
                                        "'Cleaning'",
                                        1000,
                                        "'Facial'",
                                        1000,
                                    ]}
                                    speed={50}
                                    cursor={false}
                                    repeat={Infinity}
                                />
                            </label>}
                        </div>
                    </div>
                    <div className={classes['services-content']}>
                        <div className={classes['services-name']}><Typography variant='h6'>What are you looking for?</Typography></div>
                        <div className={classes['services-card']}>
                            <Grid container>

                                {
                                    allCategories.map((category) => (
                                        <Grid key={category._id} item xs={4} sm={4} md={4} lg={4}>
                                            <div className={classes['card']} onClick={() => open(category)}>
                                                <div className={classes['cardMedia']}><img src={men} alt='media' /></div>
                                                <div className={classes['cardAction']}><a href="#">{category.name}</a></div>
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </div>
                        {/* <div className={classes['sub-section']}>
                            <div>New Launches</div>
                            <div className={classes['container']}><img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_432,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1699259522568-6afbb9.jpeg" alt="image" /></div>
                        </div> */}

                    </div>
                </div>
                <div className={classes['right']}>
                    <div className={classes['imagecontainer']}><img src={Photo} alt="This is a photo" /></div>
                </div>
            </div>
        </div>
    )
}

export default Services