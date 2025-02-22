import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AddSubAdminModal from "../../../components/add-subadmin-modal/AddSubAdminModal";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import Loader from "../../../components/loader/Loader";
import SeoModal from "../../../components/seo-modal/SeoModal";
import UpdatePwdModal from "../../../components/update-password-modal/UpdatePwd";
import UpdateReferEarnModal from "../../../components/update-refer-and-earn-modal/UpdateRefer&EarnModal";
import useDeleteApiReq from "../../../hooks/useDeleteApiReq";
import useGetApiReq from "../../../hooks/useGetApiReq";
import Wrapper from "../../Wrapper";
import classes from "./Settings.module.css";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Settings = () => {
  const { res: deleteSubAdminRes, fetchData: deleteSubAdmin, isLoading: deleteSubAdminLoading } = useDeleteApiReq();
  const { res: getSubAdminsRes, fetchData: getSubAdmins, isLoading } = useGetApiReq();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updatePwdModal, setUpdatePwdModal] = useState(false);
  const [subAdmin, setSubadmin] = useState({});
  const [allSubadmins, setAllSubadmins] = useState([]);
  const [isUpdateReferAndEarnModalOpen, setIsUpdateReferAndEarnModalOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const handlePageClick = async (page) => {
    setPage(page);
  };

  const navigate = useNavigate();

  const handleUpdateModal = (data) => {
    setSubadmin(data);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const handleDeleteModal = (data) => {
    setSubadmin(data);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = async () => {
    deleteSubAdmin(`/admin/delete-sub-admin?subAdminId=${subAdmin?._id}&role=${subAdmin?.role}`)
  };

  useEffect(() => {
    if (deleteSubAdminRes?.status === 200 || deleteSubAdminRes?.status === 201) {
      getSubadmins()
      toast.success("Subadmin deleted successfully");
      setIsDeleteModalOpen(!isDeleteModalOpen);
    }
  }, [deleteSubAdminRes])

  const getSubadmins = async () => {
    getSubAdmins(`/admin/get-sub-admins?page=${page}`)
  };

  useEffect(() => {
    getSubadmins();
  }, [page]);

  useEffect(() => {
    if (getSubAdminsRes?.status === 200 || getSubAdminsRes?.status === 201) {
      console.log("getSubAdminsRes", getSubAdminsRes);
      setPageCount(getSubAdminsRes?.data?.pagination?.totalPages);
      setAllSubadmins(getSubAdminsRes?.data?.admins);
    }
  }, [getSubAdminsRes])

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
              <button
                onClick={() => navigate("/admin/settings/manage-comision")}
                className={classes.button}
              >
                Manage Comision
              </button>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            {isLoading && <Loader />}
          </div>
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
                    onClick={() => handleDeleteModal(subadmin)}
                    cursor={"pointer"}
                    size={22}
                    color="red"
                  />
                </div>
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

      {isDeleteModalOpen &&
        <DeleteModal
          setState={setIsDeleteModalOpen}
          handleDelete={handleDelete}
        />
      }
    </>
  );
};

export default Settings;
