import classes from './Cms.module.css';
import Wrapper from '../../Wrapper';
import { Link, useNavigate } from 'react-router-dom';

const Cms = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("adUx")
  
    if(!token){
      navigate('/admin/login');
      return;
    }
    return (
        <Wrapper>
            <div className={classes.parentContainer}>
                <div className={classes.container}>
                    <Link to="/admin/cms/privacy-policy" className={classes.privacy_policy}>
                        Privacy Policy
                    </Link>
                    <Link to="/admin/cms/about-us" className={classes.about_us}>
                        About Us
                    </Link>
                </div>

                <div className={classes.container}>
                    <Link to="/admin/cms/contact-us" className={classes.contact_us}>
                        Contact Us
                    </Link>
                </div>
            </div>
        </Wrapper>
    )
}

export default Cms