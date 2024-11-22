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

const Reviews = () => {
  const reviewData = [
    {
      "_id": "1",
      "userName": "John Doe",
      "serviceType": "delivery",
      "date": "2024-11-20T10:30:00.000Z",
      "content": "Great service! The delivery was quick and the food was hot."
    },
    {
      "_id": "2",
      "userName": "Jane Smith",
      "serviceType": "pickup",
      "date": "2024-11-18T15:45:00.000Z",
      "content": "The staff was friendly, but the order was slightly delayed."
    },
    {
      "_id": "3",
      "userName": "Mike Johnson",
      "serviceType": "delivery",
      "date": "2024-11-19T12:20:00.000Z",
      "content": "The app is easy to use, and the service is reliable."
    },
    {
      "_id": "4",
      "userName": "Emily Davis",
      "serviceType": "pickup",
      "date": "2024-11-17T18:00:00.000Z",
      "content": "Good experience, but the packaging could be better."
    },
    {
      "_id": "5",
      "userName": "David Brown",
      "serviceType": "delivery",
      "date": "2024-11-16T20:15:00.000Z",
      "content": "Excellent delivery timing. The driver was polite and professional."
    },
    {
      "_id": "6",
      "userName": "Sophia Wilson",
      "serviceType": "pickup",
      "date": "2024-11-15T14:10:00.000Z",
      "content": "Quick and easy pickup. The restaurant staff was helpful."
    }
  ]

  const [reviews, setReviews] = useState(reviewData);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    serviceType: "",
  });

  const handlePageClick = async (page) => {
    setCurrentPage(page);
  };

  const fetchReviews = async (page = 1, filters = {}) => {
    setIsLoading(true);
    try {
      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_ADMIN_API_URL}/get-reviews`,
      //   {
      //     params: { page, ...filters },
      //     withCredentials: true,
      //   }
      // );
      // setReviews(data.reviews);
      // setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterSubmit = () => {
    fetchReviews(1, filters);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  return (
    <Wrapper>
      <div className={classes.settings}>
        <div className={classes.heading_container}>
          <h1>Reviews</h1>

          <div className={classes.filter_container}>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              placeholder="Start Date"
              className={classes.filter_input}
            />
            {/* <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              placeholder="End Date"
              className={classes.filter_input}
            /> */}
            <select
              name="serviceType"
              value={filters.serviceType}
              onChange={handleFilterChange}
              className={classes.filter_input}
            >
              <option value="">All Services</option>
              <option value="delivery">Delivery</option>
              <option value="pickup">Pickup</option>
            </select>
            <button
              onClick={handleFilterSubmit}
              className={classes.filter_button}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {isLoading ? (
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
