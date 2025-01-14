import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Main from "./components/Main";
import { useNavigate } from "react-router-dom";



import classes from "./Shared.module.css";
import Wrapper from "../Wrapper";
import { format } from "date-fns";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import { PaginationControl } from "react-bootstrap-pagination-control";

const AdminPage = () => {
  const navigate = useNavigate()

  const [allOrders, setAllOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
  });
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const handlePageClick = async (page) => {
    setPage(page);
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  console.log("filters", filters);


  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-recent-orders?page=${page}&status=${filters.status}`,
        { withCredentials: true }
      );
      setAllOrders(data.data);
      setPageCount(Number(data?.pagination?.totalPages))
      console.log("allOrders", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [filters.status, page, filters.startDate, filters.endDate])


  return (
    <Wrapper>
      <div style={{ width: "100%" }}>
        <Main />
        <div className={classes["report-container"]}>
          <div className={classes["report-header"]}>
            <h1 className={classes["recent-Articles"]}>Orders</h1>
            {/* <div className={classes.d_flex}>
            <input onChange={handleOnChange} type="month" name="month" id="month" />
            <button onClick={handleOnSubmit}>Submit</button>
          </div> */}
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
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
              <button onClick={() => navigate("/admin/orders")} className={classes.view}>View All</button>
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
                  <h3 className={classes["t-op-nextlvl"]}>{format(new Date(order.createdAt), "dd-MM-yyyy")}</h3>
                  <h3 className={`${classes["t-op-nextlvl"]} ${classes.status} ${order.status === "Cancelled" ? classes.Cancelled : order.status === "Completed" ? classes.Completed : order.status === "pending" ? classes.pending : classes.OutOfDelivery}`}>{order.status}</h3>
                  <h3 className={`${classes["t-op-nextlvl"]}`}>₹{order.orderValue}</h3>
                  <h3 className={classes["t-op-nextlvl"]}>
                    <button onClick={() => navigate(`/admin/Orders/${order._id}`, { state: order })} className={classes.button}>View Details</button>
                  </h3>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px" }}>
              <PaginationControl
                changePage={handlePageClick}
                limit={10}
                page={page}
                total={pageCount + "0"}
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper >
  );
};

export default AdminPage;
