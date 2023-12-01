import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import classes from './Header.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../assets/MainLogo.png'
import Logo4 from '../../assets/Logo3.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginSignupModal from '../loginSignupModal/LoginSignupModal';
import { useLocation } from 'react-router';


export const Header = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [toggle, setToggle] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const handleOnclick = () => {
    setIsOpen(!isOpen);
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
            <div className={classes['button-container']}>
              <Button onClick={handleOnclick} variant='outlined'>Login</Button>
            </div>
          </div>

      }

      <LoginSignupModal
        isOpen={isOpen}
        handleOnclick={handleOnclick}
      />
    </>
  )
}

export default Header