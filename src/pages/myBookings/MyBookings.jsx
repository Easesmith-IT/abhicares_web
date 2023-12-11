import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './MyBookings.module.css';
import OrderInfoModal from '../../components/orderInfoModal/OrderInfoModal';
import Order from '../../components/order/Order';
import axios from 'axios';

const MyBookings = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const token = localStorage.getItem("token");

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-user-bookings`, { headers: { Authorization: token },withCredentials:true });
      setAllOrders(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, [])



  return (
    <>
      <section className={classes.my_bookings}>
        <h1>MyBookings</h1>
        <div className={classes.bookings_container}>
          {allOrders?.map((order) => (
            <Order
              key={order._id}
              order={order}
            />
          ))}
        </div>
      </section>
      {isInfoModalOpen &&
        <OrderInfoModal
          setIsInfoModalOpen={setIsInfoModalOpen}
        />
      }
    </>
  )
}

export default MyBookings