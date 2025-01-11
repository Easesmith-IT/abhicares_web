import React, { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import classes from "./Settings.module.css";
import SingleComisionComp from './SingleComisionComp';
import axios from 'axios';
import Loader from '../../../components/loader/Loader';

const MangageComision = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_ADMIN_API_URL}/get-all-category`, { withCredentials: true })
            setAllCategories(data.data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <Wrapper>
            <div>
                <h1>Mangage Commission</h1>
                <div className={classes.comision_wrapper}>
                    {!isLoading
                        && allCategories.length === 0
                        && <p>No data found</p>
                    }

                    {isLoading
                        && allCategories.length === 0
                        && <Loader />
                    }

                    {allCategories?.map((category) => (
                        <SingleComisionComp
                            key={category._id}
                            item={category}
                            getAllCategories={getAllCategories}
                        />
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}

export default MangageComision