import { useEffect, useState } from 'react';
import classes from './MyBookings.module.css';
import Order from '../../components/order/Order';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import WebsiteWrapper from '../WebsiteWrapper';
import { useNavigate } from 'react-router-dom';
import { readCookie } from '../../utils/readCookie';
import useGetApiReq from '../../hooks/useGetApiReq';

const MyBookings = () => {
  const { res: getUserOrdersRes, fetchData: getUserOrders, isLoading:loading } = useGetApiReq();
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();
  const token = readCookie("userInfo");
  const userId = token?.id;

  const getAllOrders = async () => {
    getUserOrders(`/shopping/get-user-orders?userId=${userId}`)
  }

  useEffect(() => {
    getAllOrders();
  }, [])

  useEffect(() => {
    if (getUserOrdersRes?.status === 200 || getUserOrdersRes?.status === 201) {
      setAllOrders(getUserOrdersRes?.data.data);
    }
}, [getUserOrdersRes])

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