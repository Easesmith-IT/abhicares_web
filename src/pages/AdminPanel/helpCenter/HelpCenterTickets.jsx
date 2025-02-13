import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import Wrapper from '../../Wrapper';
import classes from '../Shared.module.css';
import helpCenterClasses from './HelpCenter.module.css';
// import AddResoulationModal from '../../../components/add-resoulation-modal/AddResoulationModal';
import { format } from 'date-fns';
import DeleteModal from '../../../components/deleteModal/DeleteModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { FaEye } from 'react-icons/fa';
import useDeleteApiReq from '../../../hooks/useDeleteApiReq';
import useGetApiReq from '../../../hooks/useGetApiReq';

const HelpCenterTickets = () => {
  const { res: deleteTicketRes, fetchData: deleteTicket, isLoading: deleteTicketLoading } = useDeleteApiReq();
  const { res: getCategoriesRes, fetchData: getCategories, isLoading: getCategoriesLoading } = useGetApiReq();
  const { res: getTicketsRes, fetchData: getTickets, isLoading } = useGetApiReq();
  const { res: filterTicketRes, fetchData: filterTicket, isLoading:filterTicketLoading } = useGetApiReq();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [issue, setIssue] = useState("");
  const [allIssues, setAllIssues] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    date: "",
    serviceType: "",
    raisedBy: "",
    status: "",
    searchQuery: "",
  });

  const [allCategories, setAllCategories] = useState([]);

  console.log("filter", filters);
  const getAllCategories = async () => {
    getCategories("/admin/get-all-category");
  };

  useEffect(() => {
    getAllCategories();
  }, [])

  useEffect(() => {
    if (getCategoriesRes?.status === 200 || getCategoriesRes?.status === 201) {
      console.log("getCategoriesRes", getCategoriesRes);

      setAllCategories(getCategoriesRes?.data.data);
    }
  }, [getCategoriesRes])

  const handlePageClick = async (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };


  const getAllIssues = async () => {
    getTickets(`/admin/get-all-tickets?page=${currentPage}&ticketId=${filters.searchQuery}`)
  };

  useEffect(() => {
    if (getTicketsRes?.status === 200 || getTicketsRes?.status === 201) {
      setTotalPages(getTicketsRes?.data.totalPages);
      setAllIssues(getTicketsRes?.data.data);
    }
  }, [getTicketsRes])
  
  
  useEffect(() => {
    if (!filters.date &&
      !filters.raisedBy &&
      !filters.serviceType &&
      filters.searchQuery &&
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
    filters.searchQuery,
    filters.status]);
    
    const filterTickets = async () => {
      filterTicket(`/admin/filter-ticket?date=${filters.date}&serviceType=${filters.serviceType}&raisedBy=${filters.raisedBy}&page=${currentPage}`)
    };

    useEffect(() => {
      if (filterTicketRes?.status === 200 || filterTicketRes?.status === 201) {
        setTotalPages(filterTicketRes?.data.totalPages);
        setAllIssues(filterTicketRes?.data.data);
      }
    }, [filterTicketRes])

  const handleDeleteModal = (id) => {
    setIssue(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleSolvedModal = (id) => {
    setIssue(id);
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async () => {
    deleteTicket(`/admin/delete-ticket?ticketId=${issue}`)
  };

  useEffect(() => {
    if (deleteTicketRes?.status === 200 || deleteTicketRes?.status === 201) {
      toast.success("Ticket deleted successfully");
      getAllIssues();
      setIsDeleteModalOpen(!isDeleteModalOpen);
    }
  }, [deleteTicketRes])

  return (
    <>
      <Wrapper>
        <div className={classes["report-container"]}>
          <div className={classes["report-header"]}>
            <h1 className={classes["recent-Articles"]}>All Tickets</h1>
            <div className={classes.filter}>
              <input
                type="search"
                name="searchQuery"
                value={filters.searchQuery}
                onChange={handleFilterChange}
                placeholder="Search by ticket Id"
                className={classes.filter_input}
              />
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
                    <p><b>Ticket Id :</b> {ticket?.ticketId}</p>
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