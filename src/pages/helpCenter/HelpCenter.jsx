import classes from './HelpCenter.module.css'
import Faqs from "../../components/productInfoModal/Faqs"
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { AiOutlineClose } from 'react-icons/ai';
import WebsiteWrapper from '../WebsiteWrapper';
import { useNavigate } from 'react-router-dom';

const HelpCenter = () => {
  const token = localStorage.getItem("token");
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [helpCenterInfo, setHelpCenterInfo] = useState({
    description: "",
    issue: "Select issue",
    others: "",
  })
  const [allIssues, setAllIssues] = useState([]);
  const [issue, setIssue] = useState({});
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleView = (data) => {
    setIssue(data);
    setIsIssueModalOpen(true);
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setHelpCenterInfo({ ...helpCenterInfo, [name]: value });
  }

  const handleMultiSelectClose = (e) => {
    const { innerText } = e.target;
    if (innerText !== "Select issue") {
      setHelpCenterInfo({ ...helpCenterInfo, issue: innerText });
    }
    setIsMultiSelectOpen(!isMultiSelectOpen);
    setIsOtherOpen(false);
  }

  const handleOtherClose = () => {
    if (!helpCenterInfo.others) {
      return;
    }
    setIsMultiSelectOpen(false);
    setIsOtherOpen(false);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!helpCenterInfo.description
      || !helpCenterInfo.issue
    ) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-help`, { ...helpCenterInfo }, { headers: { Authorization: token } });
      console.log(data);
      toast.success("Issue submited successfully");
      setHelpCenterInfo({
        description: "",
        issue: "Select issue",
        others: ""
      });
      getAllIssues()
    } catch (error) {
      console.log(error);
    }
  }

  const getAllIssues = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-user-help `, { headers: { Authorization: token } });
      console.log("issues", data);
      setAllIssues(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getAllIssues();
  }, [])





  return (
    <>
      <WebsiteWrapper>
        <section className={classes.help_center}>
          <h2 className={classes.help_center_title}>Help Center</h2>
          <div className={classes.box}>
            <form onSubmit={handleOnSubmit}>

              <div className={classes.input_box}>
                <div onClick={handleMultiSelectClose} className={`${classes.input} ${classes.d_flex}`}>
                  <span>{helpCenterInfo.issue || helpCenterInfo.others}</span>
                  <IoIosArrowDown />
                </div>
                {isMultiSelectOpen &&
                  <div className={classes.multi_select}>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="having an issue with changing my number">Having an issue with changing my number</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="having an issue with changing my number">Having an issue with changing my number</label>
                    <label onClick={() => setIsOtherOpen(true)} htmlFor="">other</label>
                    {isOtherOpen &&
                      <div>
                        <div className={classes.input_box}>
                          <input
                            onChange={handleOnChange}
                            value={helpCenterInfo.others}
                            className={classes.input}
                            type="text"
                            name="others"
                            id="others"
                            placeholder="Enter your issue"
                          />
                        </div>
                        <div className={classes.button_wrapper}>
                          <button type='button' onClick={handleOtherClose} className={classes.button}>Ok</button>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
              <div className={classes.input_box}>
                <input
                  onChange={handleOnChange}
                  value={helpCenterInfo.description}
                  className={classes.input}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter description"
                />
              </div>
              <div className={classes.button_wrapper}>
                <button className={classes.button}>Submit</button>
              </div>
            </form>
          </div>
          <div>
            <h3 className={classes.h3}>Frequently asked questions</h3>
          </div>
          <Faqs />
          <h3 className={classes.h3}>All issues</h3>
          <div className={classes.issues_container}>
            <div className={classes.issue}>
              <p>Date</p>
              <p>Status</p>
              <p>View</p>
            </div>
            {allIssues?.map((issue) => (
              <div key={issue._id} className={classes.issue}>
                <p>{format(new Date(issue.createdAt), "dd-MM-yyyy")}</p>
                <p className={issue.status === "in-review" ? classes.in_review : classes.solved}>{issue.status}</p>
                <button onClick={() => handleView(issue)} className={classes.button}>View</button>
              </div>
            ))}
          </div>
        </section>
      </WebsiteWrapper>

      {isIssueModalOpen &&
        <div
          className={`${classes.modal_overlay} ${isIssueModalOpen ? classes.modal_open : classes.modal_close
            }`}
        >
          <div className={classes.modal_wrapper}>
            <button
              onClick={() => setIsIssueModalOpen(false)}
              className={classes.modal_close}
            // disabled={!issue.resolution}
            >
              <AiOutlineClose size={20} />
            </button>
            <div className={classes.modal}>
              <p>{issue.issue}</p>
              {issue.resolution && <p>{issue.resolution}</p>}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default HelpCenter