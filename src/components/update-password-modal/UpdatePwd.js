import React, { useRef, useState } from "react";
import classes from "../seo-modal/SeoModal.module.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthorization from "../../hooks/useAuthorization";

const UpdatePwd = ({ setIsModalOpen, adminId }) => {
  const currentPwdRef = useRef();
  const updatePwdRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  const { checkAuthorization } = useAuthorization();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("password updated");

    const currentPassword = currentPwdRef.current.value;
    const newPassword = updatePwdRef.current.value;

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_ADMIN_API_URL}/update-admin-password`,
        { currentPassword, newPassword, adminId },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Password Updated Successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message);
      checkAuthorization(error);
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <div className={classes.heading_container}>
          <h4>Update Password</h4>

          <div className={classes.d_flex}>
            <RxCross2
              onClick={() => setIsModalOpen(false)}
              cursor={"pointer"}
              size={26}
            />
          </div>
        </div>
        {errorMessage && (
          <h6
            style={{
              textAlign: "center",
              color: "orangered",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </h6>
        )}
        <form onSubmit={handleOnSubmit} className={classes.form}>
          <div className={classes.input_container}>
            <label htmlFor="current-password">Current Password</label>
            <input
              className={classes.input}
              ref={currentPwdRef}
              type="password"
              name="current-password"
              id="current-password"
              placeholder="enter current password"
            />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="new-password">New Password</label>
            <input
              className={classes.input}
              ref={updatePwdRef}
              type="password"
              name="new-password"
              id="new-password"
              placeholder="enter new password"
            />
          </div>

          <div className={classes.button_wrapper}>
            <button className={classes.button}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePwd;
