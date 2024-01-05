import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/loader/Loader";

import classes from "./Shared.module.css";
import axios from "axios";
import Wrapper from "../Wrapper";

const Services = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();


  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-all-category`, { withCredentials:true })
      setAllCategories(data.data);
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
                <p>Total Services : {category.totalServices}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Services;
