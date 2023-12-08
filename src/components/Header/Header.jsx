import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import classes from './Header.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../assets/MainLogo.png'
import Logo4 from '../../assets/Logo3.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginSignupModal from '../loginSignupModal/LoginSignupModal';
import { useLocation } from 'react-router';
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import LogoutModal from '../logoutModal/LogoutModal';


export const Header = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [toggle, setToggle] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const ref = useRef();
  const userIconRef = useRef();

    const userId = localStorage.getItem("userId");

  const isUser = userId ? true : false;

  const handleOnclick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutModal = () => {
    setIsUserModalOpen(false);
    setIsLogoutModalOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth)
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [innerWidth])

  const handleOpen = () => {
    setToggle(true)
  }
  const handleClose = () => {
    setToggle(false)
  }


  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])


  useEffect(() => {
    const closeUserModal = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !userIconRef.current.contains(e.target)) {
        setIsUserModalOpen(false)
      }
    }

    document.addEventListener("click", closeUserModal);

    return () => document.removeEventListener("click", closeUserModal);
  }, [])


  return (
    <>
      {
        innerWidth <= 768 ? (toggle ?
          (<div className={toggle ? 'open mobilenav' : ''}>
            <div>
              <div><MenuIcon className='menu-icon' onClick={handleClose} /></div>
              <Link to='/' className={classes['LogoContainer']}><img src={Logo4} alt='logo' /></Link>
            </div>

            <div>
              <div><LocationOnIcon /></div>
              <div><KeyboardArrowDownIcon /></div>
            </div>
            <div className={classes['button-container']}><Button variant='outlined'>Login</Button></div>
          </div>)
          :
          (
            <div className={classes['container']}>
              <div><MenuIcon onClick={handleOpen} /></div>
              <Link to='/' className={classes['LogoContainer']}><img src={Logo4} alt='logo' /></Link>
            </div>
          ))
          :
          <div className={classes['header']}>
            <Link to='/' className={classes['LogoContainer']}><img src={Logo} alt='logo' /></Link>
            <div className={`${classes.dFlexRow} ${classes.actions}`}>
              <div className={`${classes.dFlexRow} ${classes.location}`}>
                <div><LocationOnIcon /></div>
                <div><KeyboardArrowDownIcon /></div>
              </div>
            </div>
            {!isUser && <div className={classes['button-container']}>
              <Button
                onClick={handleOnclick}
                style={{
                  backgroundColor: "#000",
                }}
                variant='contained'
              >Login</Button>
            </div>}
            {isUser && <div ref={userIconRef} onClick={() => setIsUserModalOpen(!isUserModalOpen)} className={classes.icon_container}>
              <FaUser size={20} color='#B0B0B0' />
            </div>}
            {
              isUserModalOpen &&
              <div ref={ref} className={classes.info}>
                <Link onClick={() => setIsUserModalOpen(false)} to={"/help_center"} className={classes.p}>Help Center</Link>
                <Link onClick={() => setIsUserModalOpen(false)} to={"/my_bookings"} className={classes.p}>My Bookings</Link>
                <p onClick={handleLogoutModal} className={classes.p}>Log out</p>
              </div>
            }
          </div>

      }

      <LoginSignupModal
        isOpen={isOpen}
        handleOnclick={handleOnclick}
      />
      {isLogoutModalOpen &&
        <LogoutModal
          setIsLogoutModalOpen={setIsLogoutModalOpen}
        />
      }
    </>
  )
}

export default Header