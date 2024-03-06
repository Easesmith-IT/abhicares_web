import classes from './MyProfile.module.css';
import WebsiteWrapper from '../WebsiteWrapper'
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const MyProfile = () => {
  const [email, setEmail] = useState("");
  const [profileDetails, setProfileDetails] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);

  const getProfileDetails = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user-info`, { withCredentials: true });
      console.log("profile details", res?.data);
      if (res?.status === 200) {
        setProfileDetails(res?.data?.userInfo?.user)
        setUserAddresses(res?.data?.userInfo?.userAddresses)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfileDetails();
  }, [])


  const handleEmailUpdate = async () => {
    if (!email) {
      toast.error("Please enter email address");
      return;
    }

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/update-email`, { email }, { withCredentials: true });
      console.log(data);
      toast.success("Email added successfully");
      getProfileDetails();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <WebsiteWrapper>
      <section className={classes.my_profile}>
        <h1>My Profile</h1>
        <div className={classes.profile_top}>
          {profileDetails &&
            <div className={classes.profile_info}>
              <div className={classes.img}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTMi19cT0JI7Ghldmzz5fJkJy0HFeBicKKug&usqp=CAU" alt="profile" />
              </div>
              <div className={classes.profile_info_right}>
                <h5>{profileDetails?.name}</h5>
                <div>
                  {profileDetails?.email && <p><b className={classes.bold}>Email :</b> {profileDetails?.email}</p>}
                  {!profileDetails?.email &&
                    <div className={classes.input_box}>
                      <input onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' type="email" name="email" id="email" />
                      <button onClick={handleEmailUpdate}>Add Email</button>
                    </div>
                  }
                  <p><b className={classes.bold}>Phone :</b> {profileDetails?.phone}</p>
                </div>
              </div>
            </div>}

          {!profileDetails &&
            <div className={classes.profile_info}>
              <Skeleton circle width={60} height={60} count={1} />
              <div className={classes.profile_info_right}>
                <Skeleton width={140} height={20} count={1} />
                <Skeleton width={"40%"} height={20} count={1} />
              </div>
            </div>}
          <div className={classes.address_container}>
            {userAddresses.length === 0 &&
              <div className={classes.address}>
                <Skeleton width={"90%"} height={20} count={1} />
                <Skeleton width={"90%"} height={20} count={1} />
              </div>}
            {userAddresses?.map((address) => (
              <div key={address?._id} className={classes.address}>
                <FaLocationDot size={20} />
                <span>{`${address?.addressLine}`}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </WebsiteWrapper>
  )
}

export default MyProfile