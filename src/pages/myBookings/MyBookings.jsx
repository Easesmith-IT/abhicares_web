import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import Order from '../../components/order/Order';
import useGetApiReq from '../../hooks/useGetApiReq';
import { readCookie } from '../../utils/readCookie';
import WebsiteWrapper from '../WebsiteWrapper';
import classes from './MyBookings.module.css';

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