import axios from "axios";
import Wrapper from "../../Wrapper";
import classes from "../Shared.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Loader from "../../../components/loader/Loader";
import { format } from "date-fns";
import MonthlyOrderModal from "../../../components/monthly-order-modal/MonthlyOrderModal";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateYearInfo, setDateYearInfo] = useState("");
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchMessage, setSearchMessage] = useState(null)
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    date: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const searchRef = useRef();

  const navigate = useNavigate();

  const handlePageClick = async (page) => {
    setPage(page);
  };

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-all-orders?page=${page}`,
        { withCredentials: true }
      );
      setAllOrders(data.data);
      setPageCount(Number(data?.totalPage))
      console.log("allOrders", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [page]);

  const getOrderById = async () => {
    try {
      const orderId = searchRef.current.value;
      if (!orderId) {
        getAllOrders();
        return;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-order-by-id?orderId=${orderId}`,
        { withCredentials: true }
      );

      console.log('orderbyid', data)
      setAllOrders([data.data]);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 404) {
        // setSearchMessage('No order found')
        setAllOrders([]);
      }
    }
  };

  const handleOnChange = (e) => {
    setDateYearInfo(e.target.value);
  };

  const handleOnSubmit = async () => {
    if (!dateYearInfo) {
      return;
    }
    try {
      const arr = dateYearInfo.split("-");
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-monthly-orders`,
        {
          month: arr[1],
          year: arr[0],
        },
        { withCredentials: true }
      );
      // if (data.data.length > 0) {
      setIsModalOpen(true);
      // }
      setMonthlyOrders(data.data);
      console.log("orders-month", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper>
        <div className={classes["report-container"]}>
          <div className={classes["report-header"]}>
            <h1 className={classes["recent-Articles"]}>Orders</h1>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className={classes.filter_input}
            />

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className={classes.filter_input}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="OutOfDelivery">OutOfDelivery</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="d-flex" style={{ position: "relative" }}>
              <input
                ref={searchRef}
                // className={classes.input}
                style={{
                  width: "300px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
                type="text"
                placeholder="search order by id"
              />
              <FaSearch
                onClick={getOrderById}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "10px",
                  cursor: "pointer",
                }}
              />
            </div>

            <div className={classes.d_flex}>
              <input
                onChange={handleOnChange}
                type="month"
                name="month"
                id="month"
              />
              <button onClick={handleOnSubmit}>Download</button>
            </div>
          </div>

          <div className={classes["report-body"]}>
            <div className={classes["report-topic-heading"]}>
              <h3 className={classes["t-op"]} style={{ width: "200px" }}>Order Id</h3>
              <h3 className={classes["t-op"]}>Order Date</h3>
              <h3 className={`${classes["t-op"]}`}>Status</h3>
              <h3 className={`${classes["t-op"]}`}>Order Value</h3>
              <h3 className={classes["t-op"]}>Details</h3>
            </div>

            <div className={classes.items}>
              {!isLoading && allOrders?.length === 0 && <p>No orders found</p>}

              {isLoading && allOrders?.length === 0 && <Loader />}

              {allOrders?.map((order, i) => (
                <div key={i} className={`${classes.item1} ${classes.cursor}`}>
                  <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "200px" }}>{order.orderId}</h3>
                  <h3 className={classes["t-op-nextlvl"]}>
                    {format(new Date(order.createdAt), "dd-MM-yyyy")}
                  </h3>
                  <h3
                    className={`${classes["t-op-nextlvl"]} ${classes.status} ${order.status === "Cancelled"
                      ? classes.Cancelled
                      : order.status === "Completed"
                        ? classes.Completed
                        : order.status === "pending"
                          ? classes.pending
                          : classes.OutOfDelivery
                      }`}
                  >
                    {order.status}
                  </h3>
                  <h3 className={`${classes["t-op-nextlvl"]}`}>
                  ₹{order.orderValue}
                  </h3>
                  <h3 className={classes["t-op-nextlvl"]}>
                    <button
                      onClick={() =>
                        navigate(`/admin/Orders/${order._id}`, {
                          state: order,
                        })
                      }
                      className={classes.button}
                    >
                      View Details
                    </button>
                  </h3>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "100px" }}>
              <PaginationControl
                changePage={handlePageClick}
                limit={10}
                page={page}
                total={pageCount + "0"}
              />
            </div>
          </div>
        </div>
      </Wrapper>

      {isModalOpen && (
        <MonthlyOrderModal
          setIsModalOpen={setIsModalOpen}
          monthlyOrders={monthlyOrders}
        />
      )}
    </>
  );
};

export default Orders;
