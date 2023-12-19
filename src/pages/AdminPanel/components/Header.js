import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo .png";
import classes from "../Shared.module.css";
import LogoutModal from "../../../components/logoutModal/LogoutModal";

const Header = (props) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adUx')
    navigate('/');
    return
  }

  const handleLogoutModal = () => {
    setIsLogoutModalOpen(true);
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
            <h3 className={classes.title} onClick={handleLogoutModal}>Logout</h3>
          </div>
        </div>
      </header>
      {isLogoutModalOpen &&
        <LogoutModal
          setIsLogoutModalOpen={setIsLogoutModalOpen}
          handleLogout={handleLogout}
        />}

    </>
  );
};

export default Header;
