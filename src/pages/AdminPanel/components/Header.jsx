import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo .png";
import LogoutModal from "../../../components/logoutModal/LogoutModal";
import useGetApiReq from "../../../hooks/useGetApiReq";
import classes from "../Shared.module.css";
import { useDispatch } from "react-redux";
import { changeAdminStatus } from "../../../store/slices/userSlice";

const Header = (props) => {
  const { res, fetchData, isLoading } = useGetApiReq();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    fetchData("/admin/logout-Admin")
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      dispatch(changeAdminStatus({ isAdminAuthenticated: false }))
      localStorage.removeItem("perm");
      localStorage.setItem("admin-status", false);
      navigate("/admin/login");
      setIsLogoutModalOpen(false);
    }
  }, [res])

  const handleLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logosec}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/dashboard")}
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
