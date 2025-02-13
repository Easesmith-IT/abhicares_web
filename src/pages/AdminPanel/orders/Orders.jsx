import axios from "axios";
import Wrapper from "../../Wrapper";
import classes from "../Shared.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaDownload, FaSearch } from "react-icons/fa";
import Loader from "../../../components/loader/Loader";
import { format } from "date-fns";
import MonthlyOrderModal from "../../../components/monthly-order-modal/MonthlyOrderModal";
import { PaginationControl } from "react-bootstrap-pagination-control";
import useGetApiReq from "../../../hooks/useGetApiReq";

const Orders = () => {
  const { res: getOrdersRes, fetchData: getOrders, isLoading } = useGetApiReq();
  const { res: getOrderByIDRes, fetchData: getOrderByID,error } = useGetApiReq();
  const [allOrders, setAllOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchMessage, setSearchMessage] = useState(null)
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
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
    getOrders(`/admin/get-all-orders?page=${page}&status=${filters.status}&startDate=${filters.startDate}&endDate=${filters.endDate}`)
  };

  useEffect(() => {
    getAllOrders();
  }, [page, filters.status, filters.startDate, filters.endDate]);

  useEffect(() => {
    if (getOrdersRes?.status === 200 || getOrdersRes?.status === 201) {
      setAllOrders(getOrdersRes?.data.data);
      setPageCount(Number(getOrdersRes?.data?.pagination?.totalPages))
    }
  }, [getOrdersRes])

  const getOrderById = async () => {
    const orderId = searchRef.current.value;
    if (!orderId) {
      getAllOrders();
      return;
    }

    getOrderByID(`/admin/get-order-by-id?orderId=${orderId}`)
  };

  useEffect(() => {
    if (getOrderByIDRes?.status === 200 || getOrderByIDRes?.status === 201) {
      setAllOrders([getOrderByIDRes?.data.data]);
    }
  }, [getOrderByIDRes])

  useEffect(() => {
    if (error) {
      setAllOrders([]);
    }
  }, [error])


  return (
    <>
      <Wrapper>
        <div className={classes["report-container"]}>
          <div className={classes["report-header"]}>
            <h1 className={classes["recent-Articles"]}>Orders</h1>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
              <div>
                <p>Start Date</p>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className={classes.filter_input}
                />
              </div>
              <div>
                <p>End Date</p>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className={classes.filter_input}
                />
              </div>

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
                <button onClick={() => setIsModalOpen(true)}>
                  <FaDownload />
                </button>
              </div>
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
        />
      )}
    </>
  );
};

export default Orders;
