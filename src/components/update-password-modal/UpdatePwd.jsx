import React, { useEffect, useRef, useState } from "react";
import classes from "../seo-modal/SeoModal.module.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthorization from "../../hooks/useAuthorization";
import usePatchApiReq from "../../hooks/usePatchApiReq";
import { readCookie } from "../../utils/readCookie";

const UpdatePwd = ({ setIsModalOpen, adminId }) => {
   const adminInfo = readCookie("adminInfo");

  const currentPwdRef = useRef();
  const updatePwdRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  const { checkAuthorization } = useAuthorization();
  const { res: updatePwdRes, fetchData: updatePwdFetchData } = usePatchApiReq()

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("password updated");

    const currentPassword = currentPwdRef.current.value;
    const newPassword = updatePwdRef.current.value;

    await updatePwdFetchData(`/admin/update-admin-password`, {
      currentPassword,
      newPassword,
      adminId: adminInfo?.id,
    });

  };

  useEffect(() => {
    if (updatePwdRes?.status === 200 || updatePwdRes?.status === 201) {
        console.log("updatePwdRes", updatePwdRes);
        toast.success("Password Updated Successfully!");
        setIsModalOpen(false);
    }
}, [updatePwdRes])
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
