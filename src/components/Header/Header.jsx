import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/abhicares_logo_white.png";
import Logo4 from "../../assets/Logo3.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoginSignupModal from "../loginSignupModal/LoginSignupModal";
import { useLocation } from "react-router";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../logoutModal/LogoutModal";
import logo from "../../assets/White Logo V2-02.png"
import { changeUserStatus } from "../../store/slices/userSlice";
import { getCartDetails } from "../../store/slices/cartSlice";
import axios from "axios";

export const Header = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const ref = useRef();
  const userIconRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userName");

  const isUser = userId ? true : false;

  const handleOnclick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/logout-user`, { withCredentials: true });
      localStorage.removeItem("userName");
      localStorage.removeItem("userPhone");

      // navigate("/");
      await dispatch(changeUserStatus(null));
      await dispatch(getCartDetails());
      setIsLogoutModalOpen(false);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  }

  const handleLogoutModal = () => {
    setIsUserModalOpen(false);
    setIsLogoutModalOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [innerWidth]);

  const handleOpen = () => {
    setToggle(true);
  };
  const handleClose = () => {
    setToggle(false);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const closeUserModal = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !userIconRef.current.contains(e.target)
      ) {
        setIsUserModalOpen(false);
      }
    };

    document.addEventListener("click", closeUserModal);

    return () => document.removeEventListener("click", closeUserModal);
  }, []);

  return (
    <>
      <div className={classes["header"]}>
        <Link to="/" className={classes["LogoContainer"]}>
          <img src={Logo} alt="logo" />
        </Link>
        {/* <div className={`${classes.dFlexRow} ${classes.actions}`}>
            <div className={`${classes.dFlexRow} ${classes.location}`}>
              <div>
                <LocationOnIcon />
              </div>
              <div>
                <KeyboardArrowDownIcon />
              </div>
            </div>
          </div> */}
        {!isUser && (
          <div className={classes["button-container"]}>
            <Button
              onClick={handleOnclick}
              style={{
                backgroundColor: "white",
                color: "black"
              }}
              variant="contained"
            >
              Login
            </Button>
          </div>
        )}
        {isUser && (
          <div
            ref={userIconRef}
            onClick={() => setIsUserModalOpen(!isUserModalOpen)}
            className={classes.icon_container}
          >
            <FaUser size={20} color="#B0B0B0" />
          </div>
        )}
        {isUserModalOpen && (
          <div ref={ref} className={classes.info}>
            <Link
              onClick={() => setIsUserModalOpen(false)}
              to={"/help_center"}
              className={classes.p}
            >
              Help Center
            </Link>
            <Link
              onClick={() => setIsUserModalOpen(false)}
              to={"/my_bookings"}
              className={classes.p}
            >
              My Bookings
            </Link>
            <Link
              onClick={() => setIsUserModalOpen(false)}
              to={"/my_profile"}
              className={classes.p}
            >
              My Profile
            </Link>
            <p onClick={handleLogoutModal} className={classes.p}>
              Log out
            </p>
          </div>
        )}
      </div>

      {isOpen &&
        <LoginSignupModal
          isOpen={isOpen}
          handleOnclick={handleOnclick}
        />
      }
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
