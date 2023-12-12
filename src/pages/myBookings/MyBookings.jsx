import { useEffect, useState } from 'react';
import classes from './MyBookings.module.css';
import OrderInfoModal from '../../components/orderInfoModal/OrderInfoModal';
import Order from '../../components/order/Order';
import axios from 'axios';
import Loader from '../../components/loader/Loader';

const MyBookings = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token");

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-user-bookings`, { headers: { Authorization: token }, withCredentials: true });
      setAllOrders(data.data);
      setLoading(false);
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
        {!loading
          && allOrders?.length === 0
          && <p>No bookings found</p>
        }

        {loading
          && allOrders?.length === 0
          && <Loader />
        }
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