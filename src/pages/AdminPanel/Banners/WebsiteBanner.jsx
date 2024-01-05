import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../Wrapper";
import classes from "./Banner.module.css";

const WebsiteBanner = () => {
  const navigate = useNavigate();
 
  
  return (
    <Wrapper>
      <div className={classes.parentContainer}>
        <div className={classes.container}>
          <Link to="/admin/banners/web/home" className={classes.pageBanner}>
            HomePage
          </Link>
          {/* <Link
            to="/admin/banners/web/category"
            className={classes.pageBanner}
          >
            Category Page
          </Link> */}
        </div>
        {/* <div className={classes.container}>
          <Link
            to="/admin/banners/web/service"
            className={classes.pageBanner}
          >
            Service Page
          </Link>
          <Link to="/admin/banners/web/product" className={classes.pageBanner}>
            Product Page
          </Link>
        </div> */}
      </div>
    </Wrapper>
  );
};

export default WebsiteBanner;
