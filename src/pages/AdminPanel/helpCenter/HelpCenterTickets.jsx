import { MdDelete } from 'react-icons/md'
import Wrapper from '../../Wrapper'
import helpCenterClasses from './HelpCenter.module.css'
import classes from '../Shared.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../../components/loader/Loader';
// import AddResoulationModal from '../../../components/add-resoulation-modal/AddResoulationModal';
import DeleteModal from '../../../components/deleteModal/DeleteModal';
import { format } from 'date-fns';

import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuthorization from '../../../hooks/useAuthorization';
import { FaEye } from 'react-icons/fa';

const HelpCenterTickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [issue, setIssue] = useState("");
  const [allIssues, setAllIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { checkAuthorization } = useAuthorization();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    date: "",
    serviceType: "",
    raisedBy: "",
    status: "",
  });

  const [allCategories, setAllCategories] = useState([]);

  console.log("filter", filters);
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_ADMIN_API_URL}/get-all-category`, { withCredentials: true })
      setAllCategories(data.data);
      console.log("allCategories", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [])

  const handlePageClick = async (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };


  const getAllIssues = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-all-tickets?page=${currentPage}`,
        { withCredentials: true }
      );
      console.log("tickets", data);
      setTotalPages(data.totalPages);
      setAllIssues(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    if (!filters.date &&
      !filters.raisedBy &&
      !filters.serviceType &&
      !filters.status) {
      getAllIssues();
    }
    else {
      filterTickets();
    }
  }, [currentPage,
    filters.date,
    filters.raisedBy,
    filters.serviceType,
    filters.status]);

  const filterTickets = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/filter-ticket?date=${filters.date && format(new Date(filters.date), "dd/MM/yyyy")}&serviceType=${filters.serviceType}&raisedBy=${filters.raisedBy}&page=${currentPage}`, { withCredentials: true }
      );
      console.log("filter tickets", data);
      setTotalPages(data.totalPages);
      setAllIssues(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteModal = (id) => {
    setIssue(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleSolvedModal = (id) => {
    setIssue(id);
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/delete-ticket?ticketId=${issue}`,
        { withCredentials: true }
      );
      toast.success("Faq deleted successfully");
      getAllIssues();
      setIsDeleteModalOpen(!isDeleteModalOpen);
    } catch (error) {
      console.log(error);
      setIsDeleteModalOpen(false);
      checkAuthorization(error);
    }
  };


  return (
    <>
      <Wrapper>
        <div className={classes["report-container"]}>
          <div className={classes["report-header"]}>
            <h1 className={classes["recent-Articles"]}>All Tickets</h1>
            <div className={classes.filter}>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                placeholder="Start Date"
                className={classes.filter_input}
              />

              <select
                name="serviceType"
                value={filters.serviceType}
                onChange={handleFilterChange}
                className={classes.filter_input}
              >
                <option value="">Select Service Category</option>
                {allCategories?.map((item) => (
                  <option key={item?._id} value={item?._id}>{item?.name}</option>
                ))}
              </select>
              {/* <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className={classes.filter_input}
              >
                <option value="">Select status</option>
                <option value="raised">Raised</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </select> */}
              <select
                name="raisedBy"
                value={filters.raisedBy}
                onChange={handleFilterChange}
                className={classes.filter_input}
              >
                <option value="">Raised by</option>
                <option value="customer">Customer</option>
                <option value="partner">Partner</option>
              </select>
              {/* <button
                onClick={filterTickets}
                className={classes.filter_button}
              >
                Apply Filters
              </button> */}
            </div>
          </div>

          <div className={helpCenterClasses.container}>
            {!isLoading && allIssues?.length === 0 && <p>No tickets found</p>}

            {isLoading && allIssues?.length === 0 && <Loader />}
            {allIssues?.map((ticket) => {
              return (
                <div key={ticket?._id} className={helpCenterClasses.helpCenter}>
                  <div className={helpCenterClasses.helpCenter_left}>
                    <p>
                      {ticket?.status ? (
                        <div>
                          <b>Status:</b>{" "}

                          <span
                            className={
                              ticket?.status === "in-review"
                                ? helpCenterClasses.under_review
                                : helpCenterClasses.resolved
                            }
                          >
                            {ticket?.status}
                          </span>
                        </div>
                      ) : (
                        <span>Status unavailable</span>
                      )}

                    </p>
                    <p><b>Raised by:</b> {ticket?.raisedBy}</p>
                    <p><b>Concern:</b> {ticket?.description}</p>
                    <p>
                      <b>Issue Date:</b>{" "}
                      {format(new Date(ticket?.createdAt), "dd-MM-yyyy")}
                    </p>
                    <p><b>Raiser ID :</b> {ticket?.raisedBy === "customer" ? ticket?.userId : ticket?.sellerId}</p>
                    {ticket?.bookingId && <p><b>Booking ID :</b> {ticket?.bookingId?.bookingId}</p>}
                    <p><b>Service ID :</b> {ticket?.serviceId}</p>
                    <p><b>Ticket type :</b> {ticket?.ticketType}</p>
                    {/* {ticket.status !== "solved" && (
                      <button
                        onClick={() => handleSolvedModal(ticket._id)}
                        className={helpCenterClasses.button}
                      >
                        Mark as resolved
                      </button>
                    )} */}
                  </div>
                  <div className={helpCenterClasses.helpCenter_right}>
                    <MdDelete
                      onClick={() => handleDeleteModal(ticket._id)}
                      cursor={"pointer"}
                      size={22}
                      color="red"
                    />
                    <FaEye
                      onClick={() => navigate(`/admin/help-center/tickets/${ticket._id}`)}
                      cursor={"pointer"}
                      size={22}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            <PaginationControl
              changePage={handlePageClick}
              limit={10}
              page={currentPage}
              total={totalPages + "0"}
            />
          </div>
        </div>
      </Wrapper>

      {/* {isModalOpen && (
        <AddResoulationModal
          setIsModalOpen={setIsModalOpen}
          getAllIssues={getAllIssues}
          id={issue}
        />
      )} */}

      {isDeleteModalOpen && (
        <DeleteModal
          handleDelete={handleDelete}
          setState={setIsDeleteModalOpen}
        />
      )}
    </>
  );
};

export default HelpCenterTickets;