import React, { useRef } from "react";
import axios from 'axios';
import logo from "../../assets/logo .png";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";


const AdminLogin = () => {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const userPasswordRef = useRef();

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    console.log('inside ')
    const userName = userNameRef.current.value;
    const userPassword = userPasswordRef.current.value;

    try {
       const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/logout-user`,
         { withCredentials: true }
       );
       localStorage.removeItem("userName");
       localStorage.removeItem("userPhone");

       const response = await axios.post(
         `${process.env.REACT_APP_ADMIN_API_URL}/login-Admin`,
         {
           adminId: userName,
           password: userPassword,
         },
         { withCredentials: true }
       );

         console.log(response)
       if (response?.data) {
         alert("Logged in successfully");
         navigate("/admin/dashboard");
      } 
      
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }

   
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={(e) => handleAdminLogin(e)}
        style={{
          padding: "45px",
          width: "50%",
          // border: "2px solid",
          margin: "0 auto",
        }}
        className="shadow-lg p-3 mb-5 bg-body-tertiary rounded"
      >
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/">
            <img src={logo} alt="logo" width={200} />
          </Link>
        </div>
        <h3 className="d-flex justify-content-center align-items-center my-4">
          Admin Login
        </h3>
        <div className="mb-3">
          <label for="username" className="form-label">
            Admin Id
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            ref={userNameRef}
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            ref={userPasswordRef}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
