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
import Loader from '../../components/loader/Loader';
import HistoryModal from './HistoryModal';
import usePostApiReq from '../../hooks/usePostApiReq';
import useGetApiReq from '../../hooks/useGetApiReq';

const HelpCenter = () => {
  const { res: createHelpRes, fetchData: createHelp, isLoading: createHelpLoading } = usePostApiReq();
  const { res: getUserHelpRes, fetchData: getUserHelp, isLoading } = useGetApiReq();

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
    setHelpCenterInfo({ ...helpCenterInfo, issue: "" });
    setIsMultiSelectOpen(false);
    setIsOtherOpen(false);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!helpCenterInfo.description
      || (helpCenterInfo.issue && !helpCenterInfo.issue)
      || (helpCenterInfo.others && !helpCenterInfo.others)
    ) {
      toast.error("Please fill all fields");
      return;
    }

    createHelp("/shopping/create-help", { ...helpCenterInfo })
  }

  useEffect(() => {
    if (createHelpRes?.status === 200 || createHelpRes?.status === 201) {
      toast.success("Issue submited successfully");
      setHelpCenterInfo({
        description: "",
        issue: "Select issue",
        others: ""
      });
      getAllIssues()
    }
  }, [createHelpRes])

  const getAllIssues = async () => {
    getUserHelp("/shopping/get-user-help")
  }

  useEffect(() => {
    getAllIssues();
  }, [])

  useEffect(() => {
    if (getUserHelpRes?.status === 200 || getUserHelpRes?.status === 201) {
      console.log("getUserHelpRes",getUserHelpRes);
      
      setAllIssues(getUserHelpRes?.data.data);
    }
  }, [getUserHelpRes])



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
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="Having an issue with changing my number">Having an issue with changing my number</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="Having an issue with changing my Address">Having an issue with changing my Address</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="Having an issue with changing my E-mail">Having an issue with changing my E-mail</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="I am unable to make Payment">I am unable to make Payment</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="Can I get my service delivered faster?">Can I get my service delivered faster?</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="How can I get my refund back?">How can I get my refund back?</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="Having an issue with product Cancellation">Having an issue with product Cancellation</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="How many days will it take for the refund to arrive?">How many days will it take for the refund to arrive?</label>
                    <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="How can we edit my profile?">How can we edit my profile?</label>
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
                <button className={classes.button}>{createHelpLoading ? "Submitting..." : "Submit"}</button>
              </div>
            </form>
          </div>
          <h3 className={classes.h3}>All issues</h3>
          {!isLoading && allIssues?.length === 0 && <p>No issues found</p>}

          {isLoading && allIssues?.length === 0 && <Loader />}
          {allIssues.length > 0 &&
            <div className={classes.issues_container}>
              <div className={classes.issue}>
                <p>Ticket Id</p>
                <p>Date</p>
                <p>Status</p>
                <p>View</p>
              </div>
              {allIssues?.map((issue) => (
                <div key={issue._id} className={classes.issues}>
                  <b className='ticketId' style={{ whiteSpace: "nowrap" }}>{issue?.ticketId}</b>
                  <p>{format(new Date(issue.createdAt), "dd-MM-yyyy")}</p>
                  <div>
                    <span className={issue.status === "in-review" ? classes.in_review : issue.status === "raised" ? classes.raised : classes.solved}>{issue.status}</span>
                  </div>
                  <div>
                    <button onClick={() => handleView(issue)} className={classes.button}>View</button>
                  </div>
                </div>
              ))}
            </div>}

          <div>
            <h3 className={classes.h3}>Frequently asked questions</h3>
          </div>
          <Faqs />

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
              <h4 style={{ fontWeight: "600" }}>Ticket details</h4>
              <b>{issue.issue}</b>
              <p>{issue.description}</p>
              {issue?.bookingId && <p><b>Booking Id: </b>{issue?.bookingId}</p>}
              <HistoryModal ticketHistory={issue?.ticketHistory} />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default HelpCenter