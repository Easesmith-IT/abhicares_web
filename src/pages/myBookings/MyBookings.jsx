import { useEffect, useState } from 'react';
import classes from './MyBookings.module.css';
import Order from '../../components/order/Order';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import WebsiteWrapper from '../WebsiteWrapper';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-user-orders?userId=${userId}`, { withCredentials: true });
      console.log(data);
      setAllOrders(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, [])



  return (
    <WebsiteWrapper>
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
          {allOrders?.map((order, index) => (
            <Order
              index={index}
              key={order._id}
              order={order}
            />
          ))}
        </div>
      </section>
    </WebsiteWrapper>
  )
}

export default MyBookings