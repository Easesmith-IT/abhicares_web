import { useEffect, useState } from "react";
import Wrapper from "../../Wrapper";
import classes from "./BookingDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import AssignedPartnerModal from "../../../components/assigned-partner-modal/AssignedPartnerModal";
import useAuthorization from "../../../hooks/useAuthorization";
import toast from "react-hot-toast";

const BookingDetails = () => {
  // const { state } = useLocation();
  // console.log(state);
  const { checkAuthorization } = useAuthorization();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [totalTaxRs, setTotalTaxRs] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const [status, setStatus] = useState(booking?.status || "");
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);


  const getBooking = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ADMIN_API_URL}/get-booking-details/${id}`,
        { withCredentials: true }
      );

      setBooking(data.bookingDetails);
      setStatus(data.bookingDetails.status);
      console.log("booking", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    setStatus(() => e.target.value);
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_ADMIN_API_URL}/update-seller-order-status/${booking._id}`,
        { status: e.target.value },
        { withCredentials: true }
      );
      toast.success("Booking status changed successfully");
      console.log("status", data);
      getBooking();
    } catch (error) {
      console.log(error);
      setStatus(() => booking?.status);
      checkAuthorization(error);
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  useEffect(() => {
    setTotalTaxRs((booking?.orderValue * 18) / 100);
    setTotal(Number(totalTaxRs) + Number(booking?.orderValue));
    if (booking?.couponId) {
      setDiscount(
        (booking?.orderValue * booking?.couponId?.offPercentage) / 100
      );
    }
  }, [booking?.orderValue, booking?.couponId, totalTaxRs, navigate]);

  const handlePartnerModal = () => {
    setIsPartnerModalOpen(true);
  };

  return (
    <>
      <Wrapper>
        <div>
          {booking && (
            <div className={classes.wrapper}>
              <div className={classes.left_div}>
                <div className={classes.info}>
                  <div>
                    {/* <h4>seller name</h4>
                                <p>seller phone: 1234567890</p> */}
                    <h4>Update Status</h4>
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
                      <option value="not-alloted">Not Alloted</option>
                    </select>
                  </div>
                  <div>
                    <p>
                      booking date:{" "}
                      {format(new Date(booking.createdAt), "dd-MM-yyyy")}
                    </p>
                    <p>
                      date of appointment:{" "}
                      {format(new Date(booking.bookingDate), "dd-MM-yyyy")}
                    </p>
                    <p>time of appointment: {booking.bookingTime}</p>
                    {(!booking.sellerId || status === "not-alloted") && (
                      <button
                        onClick={handlePartnerModal}
                        className={classes.button}
                      >
                        Assign to partner
                      </button>
                    )}

                    {booking.sellerId && status !== "not-alloted" && (
                      <div className="mt-4">
                        <h5>Assigned to Seller</h5>
                        <p>{booking.sellerId.name}</p>
                        <p>{booking.sellerId.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* <h5 className={classes.heading}>Packages</h5>
                    <div className={classes.container}>
                        <div className={classes.item}>
                            <div>
                                <img className={classes.img} src="https://dashui.codescandy.com/dashuipro/assets/images/ecommerce/product-2.jpg" alt="product" />
                                <div>
                                    <h6>package name</h6>
                                    <p>category</p>
                                </div>
                            </div>
                            <p>Qty: 2</p>
                            <p>₹299</p>
                        </div>
                    </div> */}
                <h5 className={classes.heading}>Products</h5>
                <div className={classes.container}>
                  <div className={classes.item}>
                    <div>
                      <img
                        className={classes.img}
                        src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${booking.package
                          ? booking.package.imageUrl[0]
                          : booking.product.imageUrl[0]
                          }`}
                        alt="product"
                      />
                      <div>
                        <h6>
                          {booking.package
                            ? booking.package.name
                            : booking.product.name}
                        </h6>
                        <p>{booking.package ? "Package" : "Product"}</p>
                      </div>
                    </div>
                    <p>Qty: {booking.quantity}</p>
                    <p>
                      ₹
                      {Number(
                        booking.package
                          ? booking.package.offerPrice
                          : booking.product.offerPrice
                      ) * Number(booking.quantity)}
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes.right_div}>
                <div className={classes.right_div_top}>
                  <h5>Booking Summary</h5>
                  <div className={classes.heading}>
                    <p>Descriptions</p>
                    <p>Amounts</p>
                  </div>
                  {/* <div className={classes.d_flex}>
                  <p>Sub Total :</p>
                  <p>₹{booking.orderValue}</p>
                </div> */}
                  {/* <div className={classes.d_flex}>
                  <p>Tax (18%) :</p>
                  <p>₹{totalTaxRs}</p>
                </div> */}
                  {/* <div className={classes.d_flex}>
                  <p>Discount ('{booking?.couponId?.name}') :</p>
                  <p>₹{discount}</p>
                </div> */}
                  <div className={classes.d_flex}>
                    <p>Total Amount :</p>
                    <p>₹{booking.orderValue}</p>
                  </div>
                </div>
                <div className={classes.right_div_bottom}>
                  <h5>Customer Details</h5>
                  <div className={classes.d_flex}>
                    <p>Customer Name :</p>
                    <p>{booking?.userId?.name}</p>
                  </div>
                  <div className={classes.d_flex}>
                    <p>Customer Phone :</p>
                    <p>{booking?.userId?.phone}</p>
                  </div>
                  <div className={classes.d_flex}>
                    <p>Customer Address :</p>
                    <p>{`${booking.userAddress.addressLine},${booking.userAddress.landmark},${booking.userAddress.pincode}`}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={classes.location_container}>
            <div className={classes.location_container_left}>
              <h3>Current Location</h3>
              <p>Lorem ipsum dolor sit amet.</p>
              <div className={classes.d_flex}>
                <h6>Distance :</h6>
                <span>4.8 KM</span>
              </div>
              <div className={classes.d_flex}>
                <h6>Time :</h6>
                <span>48 min</span>
              </div>
            </div>
            <div className={classes.location_container_right}>
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1779.6251435072468!2d81.01217178855312!3d26.863788036925076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be29384000001%3A0x130b41299ab7c3c1!2sEasesmith!5e0!3m2!1sen!2sin!4v1704691511201!5m2!1sen!2sin"
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </Wrapper>

      {isPartnerModalOpen && (
        <AssignedPartnerModal
          setIsModalOpen={setIsPartnerModalOpen}
          serviceId={
            booking.product
              ? booking.product.serviceId
              : booking.package.serviceId
          }
          bookingId={booking._id}
          getBooking={getBooking}
        />
      )}
    </>
  );
};

export default BookingDetails;
