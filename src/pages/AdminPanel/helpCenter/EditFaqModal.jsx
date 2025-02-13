import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "../../../components/add-resoulation-modal/AddResoulationModal.module.css";
import useAuthorization from '../../../hooks/useAuthorization';

import usePatchApiReq from '../../../hooks/usePatchApiReq';
import usePostApiReq from '../../../hooks/usePostApiReq';


const EditFaqModal = ({ setIsModalOpen, faq = "", getAllFaqs }) => {
  const { res: createFaqRes, fetchData: createFaq, isLoading: createFaqLoading } = usePostApiReq();
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

  const { res: feqRes, fetchData: feqFetchData } = usePatchApiReq()

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!faqInfo.ques || !faqInfo.ans) {
      return;
    }
    if (faq) {
      await feqFetchData(`/admin/update-faq/${faq._id}`, { ...faqInfo })

    }
    else {
      createFaq("/admin/create-faq", { ...faqInfo })
    }
  };

  useEffect(() => {

    if (feqRes?.status === 200 || feqRes?.status === 201) {
        console.log("feqRes", feqRes);
        toast.success("Faq updated successfully");
        getAllFaqs();
        setIsModalOpen(false);
    }
}, [feqRes])
  
 useEffect(() => 
    if (createFaqRes?.status === 200 || createFaqRes?.status === 201) {
      toast.success("Faq created successfully");
      getAllFaqs();
      setIsModalOpen(false);
    }
  }, [createFaqRes])



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
              {createFaqLoading ? "Loading..." : faq ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFaqModal