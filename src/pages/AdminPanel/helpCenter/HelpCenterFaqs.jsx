import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Wrapper from "../../Wrapper";
import classes from "./HelpCenter.module.css";
import AddBtn from "../../../assets/add-icon-nobg.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../../components/loader/Loader";
import AddResoulationModal from "../../../components/add-resoulation-modal/AddResoulationModal";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import { FiEdit } from "react-icons/fi";
import { format } from "date-fns";
import EditFaqModal from "./EditFaqModal";
import useAuthorization from "../../../hooks/useAuthorization";

const HelpCenterFaqs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [faq, setFaq] = useState({});
  const [allFaqs, setallFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateFaqModalOpen, setIsCreateFaqModalOpen] = useState(false);

  const { checkAuthorization } = useAuthorization();


  const getAllFaqs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-all-faq`,
        { withCredentials: true }
      );
      console.log('faqs', data);
      setallFaqs(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllFaqs();
  }, []);

  const handleDeleteModal = (id) => {
    setFaq(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };



  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}//delete-faq/${faq}`,
        { withCredentials: true }
      );
      toast.success("Issue deleted successfully");
      getAllFaqs();
      setIsDeleteModalOpen(!isDeleteModalOpen);
    } catch (error) {
      console.log(error);
      setIsDeleteModalOpen(false);
      checkAuthorization(error);
    }
  };

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
