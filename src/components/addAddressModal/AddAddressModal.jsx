import { AiOutlineClose } from "react-icons/ai";
import classes from "./AddAddressModal.module.css";

import { MdMyLocation } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useGeolocation from "../../hooks/usegelocation";
import { GoogleApiWrapper } from "google-maps-react";

import CurrentLocationAddInfo from "./CurrentLocationAddInfo";

const AddAddressModal = ({
  isOpen,
  setIsAddAddressModalOpen,
  getAllAddress,
  Data = "",
}) => {

    const { location, status } = useGeolocation();

  console.log("status", status);
      console.log("location", location);


  const [showCurrentLocationAdd, setShowCurrentLocationAdd] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [addressInfo, setAddressInfo] = useState({
    addressLine: Data.addressLine || "",
    pincode: Data.pincode || "",
    landmark: Data.landmark,
    defaultAddress: Data.defaultAddress || false,
    city:Data.city || ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({ ...addressInfo, [name]: value });
  };

    const handleOnSubmit = async (e) => {
      console.log('-------')
    e.preventDefault();
    if (
      !addressInfo.addressLine ||
      !addressInfo.pincode
    ) {
      return;
    }
    if (Data) {
      try {
        const { data } = await axios.patch(
          `${process.env.REACT_APP_API_URL}/update-user-address/${Data._id}`,
          { ...addressInfo },
          { withCredentials:true }
        );
        toast.success("Address updated successfully");
        getAllAddress();
        setIsAddAddressModalOpen(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
        try {
            const geometry = {
              coordinates: [location.geometry.lat, location.geometry.lng],
            };

          const body = { ...addressInfo, location: geometry, city: location.city };
          console.log('body',body)
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/create-user-address`,
          { ...body },
          { withCredentials: true }
        );
        toast.success("Address created successfully");
        getAllAddress();
        setIsAddAddressModalOpen(false);
        console.log(data);
        } catch (error) {
          toast.error(error?.response?.data?.message);
        console.log(error);
      }
    }
  };

  const handleCurrentLocation = () => {

    console.log('on click')
     if (status !== "granted") {
       console.log("inside if");
       setIsButtonDisabled(true);
     } else {
       console.log("inside else");
           setShowCurrentLocationAdd(true);
       setIsButtonDisabled(false);
     }
  };

  const closeCurrentLocationAddModal = () => {
    setShowCurrentLocationAdd(false);
  };

 

  return (
    <>
      <div
        className={`${classes.modal_overlay} ${
          isOpen ? classes.modal_open : classes.modal_close
        }`}
      >
        <div className={classes.modal_wrapper}>
          <button
            onClick={() => setIsAddAddressModalOpen(false)}
            className={classes.modal_close}
          >
            <AiOutlineClose size={20} />
          </button>
          <div className={classes.modal}>
            <form onSubmit={handleOnSubmit}>
              <p className={classes.p}>{Data ? "Update" : "Add"} address</p>
              <div className={classes.mt}>
                <label htmlFor="addressLine">Address Line</label>
                <div className={classes.input_box}>
                  <input
                    className={classes.input}
                    onChange={handleOnChange}
                    value={addressInfo.addressLine}
                    type="text"
                    name="addressLine"
                    id="addressLine"
                    placeholder="Enter address line"
                  />
                </div>
              </div>

              <div className={classes.mt}>
                <label htmlFor="city">City</label>
                <div className={classes.input_box}>
                  <input
                    className={classes.input}
                    onChange={handleOnChange}
                    value={addressInfo.city}
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                  />
                </div>
              </div>
              <div className={classes.mt}>
                <label htmlFor="pincode">Pincode</label>
                <div className={classes.input_box}>
                  <input
                    className={classes.input}
                    onChange={handleOnChange}
                    value={addressInfo.pincode}
                    type="number"
                    name="pincode"
                    id="pincode"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
              {/* <div className={classes.mt}>
                  <label htmlFor="mobile">Mobile</label>
                  <div className={classes.input_box}>
                    <input
                      className={classes.input}
                      onChange={handleOnChange}
                      value={addressInfo.mobile}
                      type="text"
                      name="mobile"
                      id="mobile"
                      placeholder="Enter number"
                    />
                  </div>
                </div> */}
              <div className={classes.mt}>
                <label htmlFor="landmark">Landmark</label>
                <div className={classes.input_box}>
                  <input
                    className={classes.input}
                    onChange={handleOnChange}
                    value={addressInfo.landmark}
                    type="text"
                    name="landmark"
                    id="landmark"
                    placeholder="Enter landmark"
                  />
                </div>
              </div>
              <div className={classes.mt}>
                <label htmlFor="defaultAddress">Default Address</label>
                <select
                  className={`${classes.input_box} ${classes.defaultAddress}`}
                  onChange={handleOnChange}
                  value={addressInfo.defaultAddress}
                  name="defaultAddress"
                  id="defaultAddress"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <button
                className={classes.button}
                onClick={handleCurrentLocation}
                disabled={isButtonDisabled}
                style={{ color: status !== "granted" ? "grey" : "black" }}
              >
                <MdMyLocation />
                {status === "granted"
                  ? "Use Current Location"
                  : "Location Disabled"}
              </button>
              {/* {status !== "granted" && <button onClick={getLocation}>Enable location</button>} */}
              <button type="submit" className={classes.button}>
                {Data ? "Update" : "Proceed"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <CurrentLocationAddInfo
        isOpen={showCurrentLocationAdd}
        closeCurrentLocationAddModal={closeCurrentLocationAddModal}
        setAddressInfo={setAddressInfo}
      />
    </>
  );
};

export default AddAddressModal;

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
// })(AddAddressModal);
