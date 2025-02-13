import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/loader/Loader";

import classes from "./Shared.module.css";
import axios from "axios";
import Wrapper from "../Wrapper";
import useGetApiReq from "../../hooks/useGetApiReq";

const Services = () => {
  const { res: getCategoriesRes, fetchData: getCategories, isLoading } = useGetApiReq();
  const [allCategories, setAllCategories] = useState([]);

  const navigate = useNavigate();


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
      <div className={classes["services-wrapper"]}>
        <div className={classes["services-header"]}>
          <h2>Categories</h2>
          {/* <button className={classes.services_add_btn}>
              <img src={AddBtn} alt="add service" />
            </button> */}
        </div>
        <div className={classes.card_container}>
          {!isLoading
            && allCategories.length === 0
            && <p>No category found</p>
          }

          {isLoading
            && allCategories.length === 0
            && <Loader />
          }

          {allCategories?.map((category) => (
            <div key={category._id} onClick={() => navigate(`/admin/services/${category._id}`, { state: { categoryName: category.name } })} className={classes.card}>
              <div>
                <h5>{category.name}</h5>
                {/* <p>Total Services : {category.totalServices}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Services;
