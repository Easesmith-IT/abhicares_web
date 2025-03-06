import { useState } from "react";
import classes from "./Order.module.css";
import OrderInfoModal from "../orderInfoModal/OrderInfoModal";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Order = ({ order, index }) => {
  console.log("single order", order);
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleOnclick = () => {
    navigate(`/my_bookings/${order._id}`, { state: order });
    setIsInfoModalOpen(true);
  };
  return (
    <>
      <div onClick={handleOnclick} className={classes.order}>
        <div>
          {order.items.map((item, index) => (
            <img
              key={index}
              className={classes.img}
              src={`${import.meta.env.VITE_APP_IMAGE_URL}/${
                item?.product?.imageUrl[0]
                  ? item?.product?.imageUrl[0]
                  : item?.package?.imageUrl[0]
              }`}
              alt=""
            />
          ))}
        </div>

        <div>
          <p style={{ color: "grey" }}>#{order.orderId}</p>
          <p>Date : {format(new Date(order.createdAt), "dd-MM-yyyy")}</p>
        </div>
        <div>
          <p>Order Value : ₹{order.orderValue}</p>
          <div className={classes.order_bottom}>
            <p>Order Status :</p>
            <div
              className={` ${classes.status} ${
                order.status === "Cancelled"
                  ? classes.Cancelled
                  : order.status === "Completed"
                  ? classes.Completed
                  : order.status === "Pending"
                  ? classes.pending
                  : classes.OutOfDelivery
              }`}
            >
              {order?.status}
            </div>
          </div>
        </div>
      </div>
      {isInfoModalOpen && (
        <OrderInfoModal setIsInfoModalOpen={setIsInfoModalOpen} order={order} />
      )}
    </>
  );
};

export default Order;
