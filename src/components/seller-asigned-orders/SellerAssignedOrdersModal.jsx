import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import classes from './SellerAssignedOrdersModal.module.css';

import 'react-quill/dist/quill.snow.css';
import useGetApiReq from '../../hooks/useGetApiReq';
import usePostApiReq from '../../hooks/usePostApiReq';
import Loader from '../loader/Loader';
import { useParams } from 'react-router-dom';
import SellerOrderInfoModal from '../seller-info-modal/SellerOrderInfoModal';

const SellerAssignedOrdersModal = ({ setIsSellerAssignedModalOpen }) => {
  const { res: orderbyStatusRes, fetchData: orderbyStatus, isLoading: orderbyStatusLoading } = usePostApiReq();
  const { res: getSellerOrdersListRes, fetchData: getSellerOrdersList, isLoading } = useGetApiReq();
  const [sellerOrders, setSellerOrders] = useState([]);
  const [status, setStatus] = useState("");
  const params = useParams();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });
  const [sellerOrder, setSellerOrder] = useState({})
  const [sellerOrderInfoModal, setSellerOrderInfoModal] = useState(false);

  const handleSellerOrderInfoModal = (data) => {
    setSellerOrder(data);
    setSellerOrderInfoModal(true);
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const getSellerOrders = async () => {
    getSellerOrdersList(`/admin/get-seller-order-list/${params?.partnerId}?startDate=${filters?.startDate}&endDate=${filters?.endDate}`)
  };

  useEffect(() => {
    getSellerOrders();
  }, [filters?.startDate, filters?.endDate])

  useEffect(() => {
    if (getSellerOrdersListRes?.status === 200 || getSellerOrdersListRes?.status === 201) {
      console.log("getSellerOrdersListRes", getSellerOrdersListRes);

      setSellerOrders(getSellerOrdersListRes?.data.sellerOrders);
    }
  }, [getSellerOrdersListRes])

  const handleChange = async (e) => {
    const orderStatus = e.target.value;
    setStatus(orderStatus);
    if (orderStatus === "") {
      getSellerOrders();
      return;
    }

    orderbyStatus(`/admin/get-seller-order-by-status/${params.partnerId}`, { status: orderStatus })
  };

  useEffect(() => {
    if (orderbyStatusRes?.status === 200 || orderbyStatusRes?.status === 201) {
      setSellerOrders(orderbyStatusRes?.data.sellerOrders);
    }
  }, [orderbyStatusRes])

  return (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <div className={classes.heading_container}>
          <h4>Partner Assigned Orders</h4>
          <div className={classes.d_flex}>
            <div style={{ display: "flex", gap: "20px" }}>
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
              <div style={{ display: "flex", alignItems: "end" }}>
                <select
                  onChange={handleChange}
                  value={status}
                  className={classes.select}
                  name="status"
                  id="status"
                >
                  <option value="">Select</option>
                  <option value="alloted">Alloted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <RxCross2
              onClick={() => setIsSellerAssignedModalOpen(false)}
              cursor={"pointer"}
              size={26}
            />
          </div>
        </div>
        <div className={classes.table}>
          <div className={classes.items}>
            <h5>Booking Id</h5>
            <h5>Order Value</h5>
            <h5>Status</h5>
            <h5>Details</h5>
          </div>
          {(isLoading || orderbyStatusLoading) && <Loader />}

          {!isLoading && !orderbyStatusLoading
            && sellerOrders.length === 0
            && <p>No bookings found</p>
          }
          <div className={classes.items_container}>

            {sellerOrders?.map((order) => (
              <div key={order._id} className={classes.items}>
                <p>{order.bookingId}</p>
                <p>{order.orderValue}</p>
                <div>
                  <span className={`${classes.status}`}>{order.status}</span>
                </div>
                <button onClick={() => handleSellerOrderInfoModal(order)} className={classes.button} style={{ color: "#2599ff" }}>View Details</button>
              </div>
            ))}

          </div>
        </div>
      </div>
      {sellerOrderInfoModal &&
        <SellerOrderInfoModal
          setSellerOrderInfoModal={setSellerOrderInfoModal}
          sellerOrder={sellerOrder}
        />
      }
    </div>
  );
}

export default SellerAssignedOrdersModal