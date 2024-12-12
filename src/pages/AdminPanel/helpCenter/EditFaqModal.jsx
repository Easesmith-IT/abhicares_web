import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "../../../components/add-resoulation-modal/AddResoulationModal.module.css";
import useAuthorization from '../../../hooks/useAuthorization';

const EditFaqModal = ({ setIsModalOpen, faq = "", getAllFaqs }) => {
  const { checkAuthorization } = useAuthorization();
  const [faqInfo, setfaqInfo] = useState({
    ques: faq.ques || "",
    ans: faq.ans || "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setfaqInfo({ ...faqInfo, [name]: value });
  };
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!faqInfo.ques || !faqInfo.ans) {
      return;
    }
    if (faq) {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_APP_ADMIN_API_URL}/update-faq/${faq._id}`,
          { ...faqInfo },
          { withCredentials: true }
        );
        toast.success("Faq updated successfully");
        getAllFaqs();
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
        setIsModalOpen(false);
        checkAuthorization(error);
      }
    }
    else {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_ADMIN_API_URL}/create-faq`,
          { ...faqInfo },
          { withCredentials: true }
        );
        toast.success("Faq created successfully");
        getAllFaqs();
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
        setIsModalOpen(false);
        checkAuthorization(error);
      }
    }
  };


  return (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <div className={classes.heading_container}>
          <h4>{faq ? "Edit" : "Create"} Faq</h4>
          <div className={classes.d_flex}>
            <RxCross2
              onClick={() => setIsModalOpen(false)}
              cursor={"pointer"}
              size={26}
            />
          </div>
        </div>
        <form onSubmit={handleOnSubmit} className={classes.form}>
          <div className={classes.input_container}>
            <label htmlFor="ques">Question</label>
            <input
              className={classes.input}
              onChange={handleOnChange}
              value={faqInfo.ques}
              type="text"
              name="ques"
              id="ques"
            />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="ans">Answer</label>
            <input
              className={classes.input}
              onChange={handleOnChange}
              value={faqInfo.ans}
              type="text"
              name="ans"
              id="ans"
            />
          </div>
          <div className={classes.button_wrapper}>
            <button onClick={handleOnSubmit} className={classes.button}>
              {faq ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFaqModal