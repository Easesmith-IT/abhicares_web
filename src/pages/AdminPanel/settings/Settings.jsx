import classes from "./Settings.module.css";
import Wrapper from "../../Wrapper";
import { useEffect, useState } from "react";
import AddSubAdminModal from "../../../components/add-subadmin-modal/AddSubAdminModal";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import SeoModal from "../../../components/seo-modal/SeoModal";
import UpdatePwdModal from "../../../components/update-password-modal/UpdatePwd";
import useAuthorization from "../../../hooks/useAuthorization";
import Loader from "../../../components/loader/Loader";
import UpdateReferEarnModal from "../../../components/update-refer-and-earn-modal/UpdateRefer&EarnModal";

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updatePwdModal, setUpdatePwdModal] = useState(false);
  const [subAdmin, setSubadmin] = useState({});
  const [allSubadmins, setAllSubadmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateReferAndEarnModalOpen, setIsUpdateReferAndEarnModalOpen] = useState(false);

  const { checkAuthorization } = useAuthorization();

  const handleUpdateModal = (data) => {
    setSubadmin(data);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const handleDeleteModal = (id) => {
    setSubadmin(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_ADMIN_API_URL}/delete-subadmin/${subAdmin}`,
        { withCredentials: true }
      );
      toast.success("Subadmin deleted successfully");
      setIsDeleteModalOpen(!isDeleteModalOpen);
    } catch (error) {
      console.log(error);
      setIsModalOpen(false);
      checkAuthorization(error);
    }
  };

  const getSubadmins = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ADMIN_API_URL}/get-sub-admins`,
        { withCredentials: true }
      );
      console.log("data", data);
      setAllSubadmins(data?.admins);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubadmins();
  }, []);

  return (
    <>
      <Wrapper>
        <div className={classes.settings}>
          <div className={classes.heading_container}>
            <h1>Settings</h1>
            <div className={classes.btn_wrapper}>
              <button
                onClick={() => setIsUpdateReferAndEarnModalOpen(true)}
                className={classes.button}
              >
                Update Refer and Earn
              </button>

              <button
                onClick={() => setIsSeoModalOpen(true)}
                className={classes.button}
              >
                Manage SEO
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className={classes.button}
              >
                Add Subadmin
              </button>
              <button
                onClick={() => setUpdatePwdModal(true)}
                className={classes.button}
              >
                Update Password
              </button>
            </div>
          </div>

          {isLoading && allSubadmins.length === 0 && <Loader />}
          <div className={classes.container}>
            {!isLoading && allSubadmins.length === 0 && (
              <p>No subAdmins found</p>
            )}

            {allSubadmins?.map((subadmin) => (
              <div key={subadmin._id} className={classes.item}>
                <div className={classes.left}>
                  <p>Name: {subadmin.name}</p>
                  <p>Username: {subadmin.adminId}</p>
                  <p>Role: {subadmin.role}</p>
                  <p>
                    Status:{" "}
                    <span
                      className={`${classes.status} ${subadmin.status ? classes.active : classes.inactive
                        }`}
                    >
                      {subadmin.status ? "Active" : "InActive"}
                    </span>
                  </p>
                </div>
                <div className={classes.right}>
                  <FiEdit
                    onClick={() => handleUpdateModal(subadmin)}
                    cursor={"pointer"}
                    size={20}
                  />
                  <MdDelete
                    onClick={() => handleDeleteModal("")}
                    cursor={"pointer"}
                    size={22}
                    color="red"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>

      {isSeoModalOpen && <SeoModal setIsModalOpen={setIsSeoModalOpen} />}

      {isUpdateReferAndEarnModalOpen &&
        <UpdateReferEarnModal
          setIsModalOpen={setIsUpdateReferAndEarnModalOpen}
        />}

      {isModalOpen && (
        <AddSubAdminModal
          setIsModalOpen={setIsModalOpen}
          getSubadmins={getSubadmins}
        />
      )}

      {isUpdateModalOpen && (
        <AddSubAdminModal
          setIsModalOpen={setIsUpdateModalOpen}
          getSubadmins={getSubadmins}
          subAdmin={subAdmin}
        />
      )}

      {updatePwdModal && <UpdatePwdModal setIsModalOpen={setUpdatePwdModal} />}

      {/* {isDeleteModalOpen &&
                <Dele
                    setIsModalOpen={setIsUpdateModalOpen}
                />
            } */}
    </>
  );
};

export default Settings;
