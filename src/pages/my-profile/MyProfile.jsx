import classes from './MyProfile.module.css';
import WebsiteWrapper from '../WebsiteWrapper'
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import AddEmailModal from '../../components/add-email-modal/AddEmailModal';

const MyProfile = () => {
  const [profileDetails, setProfileDetails] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);
  const [isAddEmailModalOpen, setIsAddEmailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getProfileDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user-info`, { withCredentials: true });
      console.log("profile details", res?.data);
      if (res?.status === 200) {
        setProfileDetails(res?.data?.userInfo?.user)
        setUserAddresses(res?.data?.userInfo?.userAddresses)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfileDetails();
  }, [])


  return (
    <>
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
                  <div className={classes.d_flex}>
                    <h5>{profileDetails?.name}</h5>
                    {!profileDetails?.email && <button className={classes.btn} onClick={() => setIsAddEmailModalOpen(true)}>Add Email</button>}
                  </div>
                  <div>
                    {profileDetails?.email && <p><b className={classes.bold}>Email :</b> {profileDetails?.email}</p>}
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
              {userAddresses.length === 0 && isLoading &&
                <div className={classes.address}>
                  <Skeleton width={"90%"} height={20} count={1} />
                  <Skeleton width={"90%"} height={20} count={1} />
                </div>}

              {userAddresses.length === 0 && !isLoading &&
                <p>No address found</p>
              }
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
      {isAddEmailModalOpen &&
        <AddEmailModal
          isAddEmailModalOpen={isAddEmailModalOpen}
          setIsAddEmailModalOpen={setIsAddEmailModalOpen}
          getProfileDetails={getProfileDetails}
        />
      }
    </>
  )
}

export default MyProfile