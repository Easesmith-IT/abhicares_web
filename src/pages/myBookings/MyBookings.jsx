import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './MyBookings.module.css';
import OrderInfoModal from '../../components/orderInfoModal/OrderInfoModal';
import Order from '../../components/order/Order';
import axios from 'axios';

const MyBookings = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const userId = useSelector(state => state.user.userId);;

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-user-orders/${userId}`, { withCredentials: true });
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
        {/* <table className={classes.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={handleOnclick}>
              <td>
                <img className={classes.img} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAJ1BMVEX09PTMzMz4+PjV1dXR0dHJycnt7e3j4+PZ2dnx8fHf39/q6urc3Nx8cu+jAAABuUlEQVR4nO3Z626DIBiA4coZ9P6vd9BaD52LkGV8LHmfn3ZN3+BA1McDAAAAAAAAAAAAAADgH4muSezdt5ipiVm65ilt2/qmyWrVsc/nPtsk/73vWKjzkCTfIOUvhH59JdA0jYcyBJ4cAmOsWUHEAmPSxoT5djSlAuNUlht7P0GlAs26HNr55gtCgX5bhe9+XChw2a8nn0HOnc66UGDYA89TWcV85FgoE6jSvhc4fx7LoWOz0AjO2//gaa+i3PPYcQyFAtV2jt2xL67VZi+UWmZUKJuayRxnxLuvjOF2XO5SNy8h+Hjq27ey+xiOs1nYx+81edYxHCfQfeyj15kySuDH+L3GcIDA6Nc+961vvU7LBkZt07MvXt3q2bIGiQaWrFJ4cX63VVwyMD73XDZdnt8BAuO6J7Tpp1t54cDp9hZeNPA9fqMGXk7bgQJj1SMawcCl6hGSYGAg8LeBNX2yI1glyN24hype7qapkvR2q4JEYHkyWOvx6Buoljw5jW5QLolLx4forvktRF5ter7LUT7vspreQtip51uIXDinljOsdbp7xPkHjW269wEAAAAAAAAAAAAAgJF9AWqwFQ8Ed9TQAAAAAElFTkSuQmCC" alt="order" />
              </td>
              <td>Order1</td>
              <td>₹1000</td>
              <td>Pending</td>
              <td>05/12/2023</td>
            </tr>
            <tr onClick={handleOnclick}>
              <td>
                <img className={classes.img} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAJ1BMVEX09PTMzMz4+PjV1dXR0dHJycnt7e3j4+PZ2dnx8fHf39/q6urc3Nx8cu+jAAABuUlEQVR4nO3Z626DIBiA4coZ9P6vd9BaD52LkGV8LHmfn3ZN3+BA1McDAAAAAAAAAAAAAADgH4muSezdt5ipiVm65ilt2/qmyWrVsc/nPtsk/73vWKjzkCTfIOUvhH59JdA0jYcyBJ4cAmOsWUHEAmPSxoT5djSlAuNUlht7P0GlAs26HNr55gtCgX5bhe9+XChw2a8nn0HOnc66UGDYA89TWcV85FgoE6jSvhc4fx7LoWOz0AjO2//gaa+i3PPYcQyFAtV2jt2xL67VZi+UWmZUKJuayRxnxLuvjOF2XO5SNy8h+Hjq27ey+xiOs1nYx+81edYxHCfQfeyj15kySuDH+L3GcIDA6Nc+961vvU7LBkZt07MvXt3q2bIGiQaWrFJ4cX63VVwyMD73XDZdnt8BAuO6J7Tpp1t54cDp9hZeNPA9fqMGXk7bgQJj1SMawcCl6hGSYGAg8LeBNX2yI1glyN24hype7qapkvR2q4JEYHkyWOvx6Buoljw5jW5QLolLx4forvktRF5ter7LUT7vspreQtip51uIXDinljOsdbp7xPkHjW269wEAAAAAAAAAAAAAgJF9AWqwFQ8Ed9TQAAAAAElFTkSuQmCC" alt="order" />
              </td>
              <td>Order1</td>
              <td>1000</td>
              <td>Pending</td>
              <td>05/12/2023</td>
            </tr>
          </tbody>
        </table> */}
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