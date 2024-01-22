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

const AdminPage = () => {
  const navigate = useNavigate()

  const [allOrders, setAllOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ADMIN_API_URL}/get-recent-orders`,
        { withCredentials: true }
      );
      setAllOrders(data.data);
      console.log("allOrders", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [])


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
            <button onClick={() => navigate("/admin/orders")} className={classes.view}>View All</button>
          </div>

          <div className={classes["report-body"]}>
            <div className={classes["report-topic-heading"]}>
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
                  <h3 className={classes["t-op-nextlvl"]}>{format(new Date(order.createdAt), "dd-MM-yyyy")}</h3>
                  <h3 className={`${classes["t-op-nextlvl"]}`}>{order.status}</h3>
                  <h3 className={`${classes["t-op-nextlvl"]}`}>{order.orderValue}</h3>
                  <h3 className={classes["t-op-nextlvl"]}>
                    <button onClick={() => navigate(`/admin/Orders/${order._id}`, { state: order })} className={classes.button}>View Details</button>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper >
  );
};

export default AdminPage;
