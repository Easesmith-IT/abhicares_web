import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import AddUserModal from "../../components/add-user-modal/AddUserModal";
import AllUsersModal from "../../components/all-user-modal/AllUsersModal";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import Loader from "../../components/loader/Loader";
import UserInfoModal from "../../components/user-info-modal/UserInfoModal";
import useDeleteApiReq from "../../hooks/useDeleteApiReq";
import useGetApiReq from "../../hooks/useGetApiReq";
import Wrapper from "../Wrapper";
import classes from "./Shared.module.css";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Customers = () => {
  const { res: deleteUserRes, fetchData: deleteUser, isLoading: deleteUserLoading } = useDeleteApiReq();
  const { res: getUsersRes, fetchData: getUsers, isLoading } = useGetApiReq();
  const { res: searchUserRes, fetchData: searchUser, isLoading: isSearchUserLoading } = useGetApiReq();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [isAllUsersModalOpen, setIsAllUsersModalOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageClick = async (page) => {
    setPage(page);
  };

  const getAllUsers = async () => {
    getUsers(`/admin/get-all-user?page=${page}`)
  };


  useEffect(() => {
    if (getUsersRes?.status === 200 || getUsersRes?.status === 201) {
      console.log("getUsersRes", getUsersRes);

      setAllUsers(getUsersRes?.data.data);
      setPageCount(getUsersRes?.data.totalPage);
    }
  }, [getUsersRes])

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
    deleteUser(`/admin/delete-user/${user}`)
  };

  useEffect(() => {
    if (deleteUserRes?.status === 200 || deleteUserRes?.status === 201) {
      toast.success("User deleted successfully");
      getAllUsers();
      setIsDeleteModalOpen(!isDeleteModalOpen);
    }
  }, [deleteUserRes])

  const handleSerach = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  }

  useEffect(() => {
    if (!searchQuery) {
      getAllUsers();
      return;
    }

    searchUser(`/admin/search-user?search=${searchQuery}&page=${page}`)
  }, [page, searchQuery]);

  useEffect(() => {
    if (searchUserRes?.status === 200 || searchUserRes?.status === 201) {
      console.log("searchUserRes", searchUserRes);
      setPageCount(searchUserRes?.data?.pagination?.totalPages);
      setAllUsers(searchUserRes?.data.data);
    }
  }, [searchUserRes])


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
              <input onChange={handleSerach} className={classes.input} type="text" placeholder="Search customers" />
            </div>
            {/* <button onClick={() => setIsModalOpen(true)} className={classes.services_add_btn}>
                <img src={AddBtn} alt="add product" />
              </button> */}
          </div>

          <div className={classes["report-body"]}>
            <div className={classes.Customer}>
              <h3 className={classes["t-op"]}>Customer Name</h3>
              <h3 className={classes["t-op"]}>Contact Number</h3>
              <h3 className={classes["t-op"]}>Update/Delete</h3>
            </div>

            <div className={classes.items}>
              {!isLoading && !isSearchUserLoading
                && allUsers?.length === 0
                && <p>No users found</p>
              }

              {(isLoading || isSearchUserLoading)
                && <Loader />
              }
              {allUsers?.map((user) => (
                <div key={user._id} className={classes.Customer}>
                  <h3 className={classes["t-op-nextlvl"]}>{user.name}</h3>
                  <h3 className={classes["t-op-nextlvl"]}>{user.phone}</h3>
                  <h3 style={{ display: "flex", gap: "10px" }} className={`${classes["t-op-nextlvl"]}`}>
                    <FaEye onClick={() => handleUserInfoModal(user)} cursor={"pointer"} size={20} />
                    <FiEdit onClick={() => handleUpdateModal(user)} cursor={"pointer"} className="ml-2" size={20} />
                    <MdDelete onClick={() => handleDeleteModal(user._id)} cursor={"pointer"} size={22} color='red' />
                  </h3>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px" }}>
              <PaginationControl
                changePage={handlePageClick}
                limit={10}
                page={page}
                total={pageCount + "0"}
              />
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
