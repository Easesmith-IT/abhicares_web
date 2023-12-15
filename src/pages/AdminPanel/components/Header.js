import React from "react";

import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo .png";
import classes from "../Shared.module.css";

const Header = (props) => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('adUx')
    navigate('/');
    return
  }
  return (
    <>
    <header className={classes.header}>
      <div className={classes.logosec}>
        <div className={classes.logo}>
          <img src={logo} alt="logo" />
        </div>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
          className={`${classes.icn} ${classes.menuicn}`}
          id="menuicn"
          alt="menu-icon"
          onClick={props.onClick}
        />
      </div>
      <div className={classes.message}>
        <div
          className={`${classes["nav-option"]} ${classes.logout}} ${classes["nav-option--logout"]}`}
        >
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
            className={classes["nav-img"]}
            alt="logout"
          />
          <h3 className={classes.title} onClick={handleLogout}>Logout</h3>
        </div>
      </div>
    </header>

    
    </>
  );
};

export default Header;
