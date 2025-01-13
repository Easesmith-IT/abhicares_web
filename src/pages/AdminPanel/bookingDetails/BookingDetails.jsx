import { useEffect, useState } from "react";
import Wrapper from "../../Wrapper";
import classes from "./BookingDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import AssignedPartnerModal from "../../../components/assigned-partner-modal/AssignedPartnerModal";
import MapContainer from "./MapContainer";
import useAuthorization from "../../../hooks/useAuthorization";
import toast from "react-hot-toast";

const BookingDetails = () => {
  // const { state } = useLocation();
  // console.log(state);
  const { checkAuthorization } = useAuthorization();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [mapData, setMapData] = useState({
    time: '',
    distance: ''
  });
  const [totalTaxRs, setTotalTaxRs] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const [status, setStatus] = useState(booking?.status || "");
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const getBooking = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-booking-details/${id}`,
        { withCredentials: true }
      );

      setBooking(data.bookingDetails);
      setIsLoading(false)
      setStatus(data.bookingDetails.status);
      console.log("booking", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async () => {

    if (status === '') return

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_ADMIN_API_URL}/update-seller-order-status/${booking._id}`,
        { status: status },
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


  const getDistanceAndTimeBetweenTwoPoints = async () => {
    try {
      console.log("booking 123", booking);
      if (booking) {
        const sourceCoordinates = `${booking.currentLocation.location[0]},${booking.currentLocation.location[1]}`;
        const destinationCoordinates = `${booking.userAddress.location.coordinates[0]},${booking.userAddress.location.coordinates[1]}`;

        //  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${sourceCoordinates}&destinations=${destinationCoordinates}&key=AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I`;
        const apiUrl = `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-the-distance-routes?origins=${sourceCoordinates}&destinations=${destinationCoordinates}`;
        const res = await axios.get(apiUrl, { withCredentials: true });

        setMapData({
          distance: res?.data?.rows[0]?.elements[0]?.distance?.text,
          time: res?.data?.rows[0]?.elements[0]?.duration?.text,
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      getDistanceAndTimeBetweenTwoPoints();
    }
  }, [isLoading]);

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
  let localTime = booking?.bookingTime && new Date(booking?.bookingTime);
  let hours = localTime && localTime?.getHours();
  console.log("hours", hours);


  return (
    <>
      <Wrapper>
        <div>
          {booking && (
            <div className={classes.wrapper}>
              <div className={classes.left_div}>
                <div className={classes.info}>
                  <div>
                    <h4>Booking Id: {booking?.bookingId}</h4>
                    {/* <h4>seller name</h4>
                                <p>seller phone: 1234567890</p> */}
                    {booking.autoAssigned && <p style={{ color: 'green' }}><i>Auto Assigned</i></p>}
                    <div style={{ display: "flex", alignItems: "start", gap: "10px" }}>
                      <h4>Update Status</h4>
                      <select
                        value={status}
                        onChange={(e) => setStatus(() => e.target.value)}
                        className={classes.select}
                        name="status"
                        id="status"
                      >
                        <option value="">Select</option>
                        {/* <option value="alloted">Alloted</option> */}
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        {/* <option value="not-alloted">Not Alloted</option> */}
                      </select>

                      <button
                        onClick={updateStatus}
                        className={classes.button}
                        style={{ marginLeft: "10px" }}
                      >
                        Update
                      </button>
                    </div>
                    <p style={{marginTop:"10px"}}>Payment Status: {booking?.paymentStatus}</p>
                    <p style={{marginTop:"10px"}}>Refund Amount: {booking?.refundInfo?.amount}</p>
                    <p style={{marginTop:"10px"}}>Refund Status: {booking?.refundInfo?.status}</p>
                  </div>
                  <div>
                    <p>
                      Date of Booking:{" "}
                      {format(new Date(booking.bookingDate), "dd-MM-yyyy")}
                    </p>
                    {/* <p>
                      date of appointment:{" "}
                      {format(new Date(booking.bookingDate), "dd-MM-yyyy")}
                    </p> */}
                    <p>Time of Booking: {booking.bookingTime && format(new Date(booking?.bookingTime), "hh:mm aa")}</p>
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

                <h5 className={classes.heading}>Products</h5>
                <div className={classes.container}>
                  <div className={classes.item}>
                    <div>
                      <img
                        className={classes.img}
                        src={`${import.meta.env.VITE_APP_IMAGE_URL}/${booking.package
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
          {booking && (
            <div className={classes.location_container}>
              <div>
                <h3>Current Location</h3>
                <p>Service Man is on the way...</p>
                <div className={classes.d_flex}>
                  <h6>Distance :</h6>
                  <span>{mapData.distance !== "" && mapData.distance}</span>
                </div>
                <div className={classes.d_flex}>
                  <h6>Time :</h6>
                  <span>{mapData.time !== "" && mapData.time}</span>
                </div>
              </div>
              <div>
                <MapContainer
                  sellerStatus={booking.currentLocation?.status}
                  bookingStatus={booking.status}
                  location={{
                    user: booking.userAddress?.location?.coordinates,
                    seller: booking.currentLocation?.location,
                  }}
                />
              </div>
            </div>
          )}
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
