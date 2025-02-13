import React, { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import classes from "./Settings.module.css";
import SingleComisionComp from './SingleComisionComp';
import axios from 'axios';
import Loader from '../../../components/loader/Loader';
import useGetApiReq from '../../../hooks/useGetApiReq';

const MangageComision = () => {
    const { res: getCategoriesRes, fetchData: getCategories, isLoading } = useGetApiReq();
    const [allCategories, setAllCategories] = useState([]);

    const getAllCategories = async () => {
        getCategories("/admin/get-all-category")
    };

    useEffect(() => {
        getAllCategories();
    }, [])

    useEffect(() => {
        if (getCategoriesRes?.status === 200 || getCategoriesRes?.status === 201) {
            setAllCategories(getCategoriesRes?.data.data);
        }
    }, [getCategoriesRes])

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