import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import AddBtn from "../../../assets/add-icon-nobg.png";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import Loader from "../../../components/loader/Loader";
import useDeleteApiReq from "../../../hooks/useDeleteApiReq";
import Wrapper from "../../Wrapper";
import EditFaqModal from "./EditFaqModal";
import classes from "./HelpCenter.module.css";
import useGetApiReq from "../../../hooks/useGetApiReq";

const HelpCenterFaqs = () => {
  const { res: deleteFaqRes, fetchData: deleteFaq, isLoading: deleteFaqLoading } = useDeleteApiReq();
  const { res: getFaqsRes, fetchData: getFaqs, isLoading } = useGetApiReq();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [faq, setFaq] = useState({});
  const [allFaqs, setallFaqs] = useState([]);
  const [isCreateFaqModalOpen, setIsCreateFaqModalOpen] = useState(false);

  const getAllFaqs = async () => {
    getFaqs("/admin/get-all-faq")
  };
  useEffect(() => {
    getAllFaqs();
  }, []);

  useEffect(() => {
    if (getFaqsRes?.status === 200 || getFaqsRes?.status === 201) {
      setallFaqs(getFaqsRes?.data.data);
    }
  }, [getFaqsRes])

  const handleDeleteModal = (id) => {
    setFaq(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };



  const handleDelete = async () => {
    deleteFaq(`/admin/delete-faq/${faq}`)
  };

  useEffect(() => {
    if (deleteFaqRes?.status === 200 || deleteFaqRes?.status === 201) {
      toast.success("Faq deleted successfully");
      getAllFaqs();
      setIsDeleteModalOpen(!isDeleteModalOpen);
    }
  }, [deleteFaqRes])

  const handleEditFaq = (faq) => {
    setFaq(faq);
    setIsModalOpen(true)
  }


  return (
    <>
      <Wrapper>
        <div className={classes["report-container"]}>
          <div className={`d-flex justify-content-between ${classes.justify}`}>
            <h1 className={classes["recent-Articles"]}>Faqs</h1>
            <img onClick={() => setIsCreateFaqModalOpen(true)} src={AddBtn} alt="add faq" style={{ cursor: 'pointer' }} />
          </div>

          <div className={classes.container}>
            {!isLoading && allFaqs?.length === 0 && <p>No faqs found</p>}

            {isLoading && allFaqs?.length === 0 && <Loader />}
            {allFaqs?.map((faq) => (
              <div className={classes.helpCenter}>
                <div className={classes.helpCenter_left}>
                  <p>name: {faq.ques}</p>

                  <p>issue: {faq.ans}</p>
                  <p>
                    created at:{" "}
                    {format(new Date(faq.createdAt), "dd-MM-yyyy")}
                  </p>
                </div>
                <div className={classes.helpCenter_right}>
                  <MdDelete
                    onClick={() => handleDeleteModal(faq._id)}
                    cursor={"pointer"}
                    size={22}
                    color="red"
                  />
                  <FiEdit
                    onClick={() => handleEditFaq(faq)}
                    cursor={"pointer"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>

      {isModalOpen && (
        <EditFaqModal
          setIsModalOpen={setIsModalOpen}
          getAllFaqs={getAllFaqs}
          faq={faq}
        />
      )}

      {isCreateFaqModalOpen && (
        <EditFaqModal
          setIsModalOpen={setIsCreateFaqModalOpen}
          getAllFaqs={getAllFaqs}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          handleDelete={handleDelete}
          setState={setIsDeleteModalOpen}
        />
      )}
    </>
  );
};

export default HelpCenterFaqs;
