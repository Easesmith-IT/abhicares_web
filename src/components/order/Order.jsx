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
        <div className={classes.order_top}>
          <div>
            {order.items.map((item,index) => (
              <img key={index}
                className={classes.img}
                src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${item?.product?.imageUrl[0] ? item?.product?.imageUrl[0] :item?.package?.imageUrl[0]}`}
                alt=""
              />
            ))}
          </div>

          <div className={classes.info}>
            <p style={{color:'grey'}}>#{order._id}</p>
            {/* <p>{`${order.products[0].product.name}, ${order.products[1] && order.products[1].product.name}, ...`}</p> */}
            <p>{format(new Date(order.createdAt), "dd-MM-yyyy")}</p>
            <p>Qty: 1</p>
          </div>
        </div>
        <hr />
        <div className={classes.order_bottom}>
          <p>Track Order</p>
          <div>
            <div className={classes.progress}></div>
            <div className={classes.d_flex}>
              <p className={classes.p}></p>
              <p>Out for delivary</p>
              <p className={classes.p}>Delivered</p>
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
