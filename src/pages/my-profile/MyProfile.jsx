import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineContentCopy } from "react-icons/md";
import Skeleton from 'react-loading-skeleton';
import AddEmailModal from '../../components/add-email-modal/AddEmailModal';
import AddAddressModal from '../../components/addAddressModal/AddAddressModal';
import useGetApiReq from '../../hooks/useGetApiReq';
import WebsiteWrapper from '../WebsiteWrapper';
import classes from './MyProfile.module.css';
import SingleAddress from './SingleAddress';

const MyProfile = () => {
  const { res: getUserInfoRes, fetchData: getUserInfo, isLoading } = useGetApiReq();
  const [profileDetails, setProfileDetails] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);
  const [isAddEmailModalOpen, setIsAddEmailModalOpen] = useState(false);
  const [userReferral, setUserReferral] = useState("");
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const getProfileDetails = async () => {
    getUserInfo("/shopping/user-info")
  }

  useEffect(() => {
    getProfileDetails();
  }, [])

  useEffect(() => {
    if (getUserInfoRes?.status === 200 || getUserInfoRes?.status === 201) {
      setProfileDetails(getUserInfoRes?.data?.userInfo?.user)
      setUserAddresses(getUserInfoRes?.data?.userInfo?.userAddresses)
      setUserReferral(getUserInfoRes?.data?.userInfo?.userRefDoc)
    }
  }, [getUserInfoRes])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileDetails.referralCode);
    toast.success("Copied")
  }


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
                    <div>
                      <h5>{profileDetails?.name}</h5>

                      <div className={classes.profileDetails}>
                        {profileDetails?.email && <p><b className={classes.bold}>Email :</b> {profileDetails?.email}</p>}
                        <p><b className={classes.bold}>Phone :</b> {profileDetails?.phone}</p>
                      </div>
                      {userReferral &&
                        <div className={classes.referralDetails}>
                          <p><b className={classes.bold}>Referral Credits :</b> ₹{userReferral?.referralCredits}</p>
                          <p><b className={classes.bold}>No of Users Applied Coupon :</b> {userReferral?.noOfUsersAppliedCoupon}</p>
                        </div>}
                    </div>
                    <div>
                      {!profileDetails?.email && <button className={classes.btn} onClick={() => setIsAddEmailModalOpen(true)}>Add Email</button>}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <h6>Referral Code:</h6>
                        <div className={classes.referral_code_wrapper}>
                          <p style={{ marginBottom: "0" }}>{profileDetails?.referralCode}</p>
                          <MdOutlineContentCopy onClick={copyToClipboard} cursor={"pointer"} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

            {!profileDetails && isLoading &&
              <div className={classes.profile_info}>
                <Skeleton circle width={60} height={60} count={1} />
                <div className={classes.profile_info_right}>
                  <Skeleton width={140} height={20} count={1} />
                  <Skeleton width={"40%"} height={20} count={1} />
                </div>
              </div>}

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
              <h4 style={{ marginTop: "20px" }}>Adresses</h4>
              <Button onClick={() => setIsAddAddressModalOpen(true)}>Add Address</Button>
            </Box>
            <div className={classes.address_container}>
              {userAddresses.length === 0 && isLoading &&
                <div className={classes.address}>
                  <Skeleton width={"90%"} height={20} count={1} />
                  <Skeleton width={"90%"} height={20} count={1} />
                </div>}

              {userAddresses.length === 0 && !isLoading &&
                <p>No address found</p>
              }
              {userAddresses?.map((address, i) => (
                <SingleAddress
                  key={address?._id}
                  address={address}
                  index={i}
                  getProfileDetails={getProfileDetails}
                />
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

      {isAddAddressModalOpen && (
        <AddAddressModal
          setIsAddAddressModalOpen={setIsAddAddressModalOpen}
          isOpen={isAddAddressModalOpen}
          getAllAddress={getProfileDetails}
        />
      )}
    </>
  )
}

export default MyProfile