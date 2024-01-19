import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo .png";
import classes from "../Shared.module.css";
import LogoutModal from "../../../components/logoutModal/LogoutModal";
import axios from "axios";
import toast from "react-hot-toast";

const Header = (props) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ADMIN_API_URL}/logout-Admin`,
        { withCredentials: true }
      );
      console.log("admin logout", data);
      localStorage.removeItem("perm");
      setIsLogoutModalOpen(false);
      navigate("/");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const checkTokenExpiration = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ADMIN_API_URL}/check-token-expiration`,
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.tokenExpired) {
        toast.error("Your session was expired!");
        localStorage.removeItem("perm");
        navigate("/admin/login");
        return;
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);
  return (
    <>
      <header className={classes.header}>
        <div className={classes.logosec}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            className={classes.logo}
          >
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
            <h3 className={classes.title} onClick={handleLogoutModal}>
              Logout
            </h3>
          </div>
        </div>
      </header>
      {isLogoutModalOpen && (
        <LogoutModal
          setIsLogoutModalOpen={setIsLogoutModalOpen}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
