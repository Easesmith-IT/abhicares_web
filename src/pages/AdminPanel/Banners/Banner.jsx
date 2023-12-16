import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Wrapper from '../../Wrapper';
import classes from './Banner.module.css'

const Banner = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adUx")
  if(!token){
    navigate('/admin/login');
    return;
  }
  return (
    <Wrapper>
      <div className={classes.container}>
        <Link to="/admin/banners/app" className={classes.appBanner}>
          App Banners
        </Link>
        <Link to="/admin/banners/website" className={classes.websiteBanner}>
          Website Banners
        </Link>
      </div>
    </Wrapper>
  );
}

export default Banner