import classes from "./Reviews.module.css";
import Wrapper from "../../Wrapper";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../../components/loader/Loader";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { FaStar } from "react-icons/fa";
import Review from "../../../components/review/Review";
import { format } from "date-fns";
import useGetApiReq from "../../../hooks/useGetApiReq";

const Reviews = () => {
  const { res: getCategoriesRes, fetchData: getCategories, isLoading: getCategoriesLoading } = useGetApiReq();
  const { res: getReviewsRes, fetchData: getReviews, isLoading } = useGetApiReq();
  const { res: filterReviewsRes, fetchData: filterReviewsFun, isLoading: filterReviewsLoading } = useGetApiReq();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    date: "",
    serviceType: "",
    type: "",
  });

  const [allCategories, setAllCategories] = useState([]);

  console.log("filter", filters);
  const getAllCategories = async () => {
    getCategories("/admin/get-all-category")
  };

  useEffect(() => {
    getAllCategories();
  }, [])

  useEffect(() => {
    if (getCategoriesRes?.status === 200 || getCategoriesRes?.status === 201) {
      setAllCategories(getCategoriesRes?.data.data);
    }
  }, [getCategoriesRes])

  const handlePageClick = async (page) => {
    setCurrentPage(page);
  };

  const fetchReviews = async () => {
    getReviews(`/admin/get-all-reviews?page=${currentPage}`)
  };

  useEffect(() => {
    if (getReviewsRes?.status === 200 || getReviewsRes?.status === 201) {
      setReviews(getReviewsRes?.data.data);
      setTotalPages(getReviewsRes?.data.totalPages);
    }
  }, [getReviewsRes])

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterReviews = async () => {
    filterReviewsFun(`/admin/filter-review?date=${filters.date && format(new Date(filters.date), "dd/MM/yyyy")}&serviceType=${filters.serviceType}&reviewType=${filters.type}&page=${currentPage}`)
  };


  useEffect(() => {
    if (!filters.date &&
      !filters.serviceType &&
      !filters.type) {
      fetchReviews();
    }
    else {
      filterReviews();
    }
  }, [currentPage,
    filters.date,
    filters.serviceType,
    filters.type
  ]);

  useEffect(() => {
    if (filterReviewsRes?.status === 200 || filterReviewsRes?.status === 201) {
      setTotalPages(filterReviewsRes?.data.totalPages);
      setReviews(filterReviewsRes?.data.data);
    }
  }, [filterReviewsRes])

  return (
    <Wrapper>
      <div className={classes.settings}>
        <div className={classes.heading_container}>
          <h1>Reviews</h1>

          <div className={classes.filter_container}>
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
              <option value="">Select Service</option>
              {allCategories?.map((item) => (
                <option key={item?._id} value={item?._id}>{item?.name}</option>
              ))}
            </select>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className={classes.filter_input}
            >
              <option value="">Select Type</option>
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>
        </div>

        {(isLoading || filterReviewsLoading) ? (
          <Loader />
        ) : reviews.length === 0 ? (
          <p>No reviews found</p>
        ) : (
          <div className={classes.container}>
            {reviews.map((review) => (
              <Review
                key={review._id}
                review={review}
                fetchReviews={fetchReviews}
              />
            ))}
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
          <PaginationControl
            changePage={handlePageClick}
            limit={10}
            page={currentPage}
            total={totalPages + "0"}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Reviews;
