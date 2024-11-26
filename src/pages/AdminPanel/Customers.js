import React, { useEffect, useState } from "react";

import classes from "./Shared.module.css";
import AddUserModal from "../../components/add-user-modal/AddUserModal";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import Wrapper from "../Wrapper";
import Loader from "../../components/loader/Loader";
import { FaEye } from "react-icons/fa6";
import UserInfoModal from "../../components/user-info-modal/UserInfoModal";
import useAuthorization from "../../hooks/useAuthorization";
import AllUsersModal from "../../components/all-user-modal/AllUsersModal";

const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [isAllUsersModalOpen, setIsAllUsersModalOpen] = useState(false);

  const navigate = useNavigate()
  const { checkAuthorization } = useAuthorization();
  const { state } = useLocation()


  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-all-user`, { withCredentials: true });
      console.log("all users", data);
      setAllUsers(data.data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [])


  const handleUpdateModal = (seller) => {
    setUser(seller);
    setIsUpdateModalOpen(!isDeleteModalOpen);
  };

  // useEffect(() => {
  //   if (state) {
  //     handleUpdateModal(state)
  //   }
  // }, [state])
  

  const handleUserInfoModal = (seller) => {
    setUser(seller);
    setIsUserInfoModalOpen(!isUserInfoModalOpen);
  };

  const handleDeleteModal = (id) => {
    setUser(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_ADMIN_API_URL}/delete-user/${user}`, { withCredentials: true });
      console.log(data);
      toast.success("User deleted successfully");
      getAllUsers();
      setIsDeleteModalOpen(!isDeleteModalOpen);
    } catch (error) {
      console.log(error);
      setIsDeleteModalOpen(false);
      checkAuthorization(error);
    }
  };

  const handleSerach = async (e) => {
    const value = e.target.value;

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/search-user?search=${value}`, { withCredentials: true });
      setAllUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  }


  function debounce(fx, time) {
    let id = null;
    return function (data) {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        fx(data);
        // id = null;
      }, time);
    };
  }

  const handleOnSubmit = () => {
    setIsAllUsersModalOpen(true);
  };

  return (
    <>
      <Wrapper>
        <div className={classes["report-container"]}>
          <div className={classes["report-header"]}>
            <h1 className={classes["recent-Articles"]}>Customers</h1>
            <div className={classes.d_flex}>
              <button className={classes.btn} onClick={handleOnSubmit}>Download</button>
              <input onChange={debounce(handleSerach, 1000)} className={classes.input} type="text" placeholder="Search customers" />
            </div>
            {/* <button onClick={() => setIsModalOpen(true)} className={classes.services_add_btn}>
                <img src={AddBtn} alt="add product" />
              </button> */}
          </div>

          <div className={classes["report-body"]}>
            <div className={classes["report-topic-heading"]}>
              <h3 className={classes["t-op"]}>User Name</h3>
              <h3 className={classes["t-op"]}>Contact Number</h3>
              <h3 className={classes["t-op"]}>Update/Delete</h3>
            </div>

            <div className={classes.items}>
              {!isLoading
                && allUsers?.length === 0
                && <p>No users found</p>
              }

              {isLoading
                && allUsers?.length === 0
                && <Loader />
              }
              {allUsers?.map((user) => (
                <div key={user._id} className={classes.item1}>
                  <h3 className={classes["t-op-nextlvl"]}>{user.name}</h3>
                  <h3 className={classes["t-op-nextlvl"]}>{user.phone}</h3>
                  <h3 className={`${classes["t-op-nextlvl"]}`}>
                    <FaEye onClick={() => handleUserInfoModal(user)} cursor={"pointer"} size={20} />
                    <FiEdit onClick={() => handleUpdateModal(user)} cursor={"pointer"} className="ml-2" size={20} />
                    <MdDelete onClick={() => handleDeleteModal(user._id)} cursor={"pointer"} size={22} color='red' />
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>

      {isUserInfoModalOpen &&
        <UserInfoModal
          setIsUserInfoModalOpen={setIsUserInfoModalOpen}
          user={user}
        />
      }

      {isModalOpen &&
        <AddUserModal
          setIsModalOpen={setIsModalOpen}
          getAllUsers={getAllUsers}
        />
      }

      {isUpdateModalOpen &&
        <AddUserModal
          setIsModalOpen={setIsUpdateModalOpen}
          user={user}
          getAllUsers={getAllUsers}
        />
      }

      {isDeleteModalOpen &&
        <DeleteModal
          setState={setIsDeleteModalOpen}
          handleDelete={handleDelete}
        />
      }

      {isAllUsersModalOpen &&
        <AllUsersModal
          setIsModalOpen={setIsAllUsersModalOpen}
        />
      }
    </>
  );
};

export default Customers;
