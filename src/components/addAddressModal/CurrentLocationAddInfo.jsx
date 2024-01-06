import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import classes from "./AddAddressModal.module.css";
import useGeolocation from '../../hooks/usegelocation';
import { GoogleApiWrapper } from "google-maps-react";

const CurrentLocationAddInfo = ({
  isOpen,
  closeCurrentLocationAddModal,
  setAddressInfo,
}) => {
    const { location } = useGeolocation();

    const updateInputFields = () => {
        setAddressInfo((prev) => {
            return {
              ...prev,
              addressLine: location.formatted,
                pincode:location.components.postcode
            };
        })
        
        closeCurrentLocationAddModal(false)
  };
  return (
    <div
      className={`${classes.modal_overlay} ${
        isOpen ? classes.modal_open : classes.modal_close
      }`}
    >
      <div className={classes.modal_wrapper}>
        <button
          onClick={closeCurrentLocationAddModal}
          className={classes.modal_close}
        >
          <AiOutlineClose size={20} />
        </button>
        <div className={classes.modal}>
          {location && <p>{location.formatted}</p>}
          <button
            type="submit"
            className={classes.button}
            onClick={updateInputFields}
          >
            Confirm Address
          </button>
        </div>
      </div>
    </div>
  );
};

// export default CurrentLocationAddInfo

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
})(CurrentLocationAddInfo);