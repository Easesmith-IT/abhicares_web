import { useEffect, useState } from "react";

import classes from "./CheckoutPage.module.css";

import { AiOutlinePercentage } from "react-icons/ai";

import logo from "../../assets/White Logo V2-02.png";

import CartItem from "../../components/checkout/CartItem";
import LoginSignupModal from "../../components/loginSignupModal/LoginSignupModal";
import { useDispatch, useSelector } from "react-redux";
import AddressModal from "../../components/addressModal/AddressModal";
import { getCartDetails } from "../../store/slices/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";
import loader from "../../assets/rolling-white.gif"

import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DateTimeModal from "../../components/dateTimeModal/DateTimeModal";
import useGeolocation from "../../hooks/usegelocation";
import WebsiteWrapper from "../WebsiteWrapper";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.userId);;

  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [bookingInfo, setBookingInfo] = useState([]);
  const [allAddress, setAllAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const [offerCode, setOfferCode] = useState("")
  const [offerValue, setOfferValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [couponId, setCouponId] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [info, setInfo] = useState({
    productId: "",
    name: "",
    bookingDate: "",
    bookingTime: "Select time (08:00AM-08:00PM)"
  })
  const [totalTaxRs, setTotalTaxRs] = useState(0);

  const { location } = useGeolocation();

  console.log("location", location);

  const token = localStorage.getItem("token");

  const getAllAddress = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-user-address`,
        { headers: { Authorization: token } }
      );
      setAllAddress(data.data);
      let defaultAddress = data.data.find((add) => add.defaultAddress === true);

      if (!defaultAddress) {
        defaultAddress = data.data[data.data.length - 1];
      }
      setAddress(defaultAddress);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await dispatch(getCartDetails());
    })();
    setTotalTaxRs((cart.totalPrice * 18) / 100)
    getAllAddress();
  }, []);


  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate("/")
    }
  }, [cart])


  useEffect(() => {
    const totalTaxRupee = (cart.totalPrice * 18) / 100;
    setTotal(Number(totalTaxRupee) + Number(cart.totalPrice));
    setTotalTaxRs(totalTaxRupee);
  }, [getCartDetails, cart]);


  const handleOnclick = () => {
    setIsOpen(!isOpen);
  };


  const handleCodOrder = async () => {
    if (!address) {
      toast.error("Select address");
      return;
    }

    if (cart?.items.length !== bookingInfo.length) {
      toast.error("Select booking date and time");
      return;
    }

    if (paymentType === "") {
      toast.error("Select payment method");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/place-cod-order`, { amount: total, userAddressId: address._id, bookings: bookingInfo, city: "Lucknow", couponId }, { headers: { Authorization: token } });
      setIsLoading(false);

      console.log("cod", data);


      // const { addressLine, pincode, landmark, mobile } = address;
      // const info = {
      //   orderId: data?._id,
      //   userAddress: {
      //     addressLine,
      //     pincode,
      //     landmark,
      //     mobile
      //   },
      //   productDetails: bookingInfo,
      //   orderValue: data?.orderValue
      // }
      setIsSuccessModalOpen(true);

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
      setIsLoading(false);
    }
  };



  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!info.bookingDate || !info.bookingTime) {
      toast.error("Select booking date and time");
      return;

    }
    const findIndex = bookingInfo.findIndex((_, i) => i === index);

    bookingInfo.splice(findIndex, 1, info)
    setBookingInfo(bookingInfo);

    setIsModalOpen(false);
  }


  const handleDateTimeChange = (index) => {
    setIndex(index);

    const findIndex = bookingInfo.findIndex((item, i) => i === index);

    setInfo(bookingInfo[findIndex]);
    setIsModalOpen(true);
  }


  const handleCheck = async () => {
    if (!offerCode) {
      toast.error("Enter coupon code");
      return
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/get-coupon-details`, { name: offerCode },
        { headers: { Authorization: token } }
      );
      if (data.data[0].status === "active") {
        setCouponId(data.data[0]._id);
        setMessage("Offer available");
        const offerTotal = cart.totalPrice * (Number(data.data[0].offPercentage) / 100);
        setOfferValue(offerTotal);
        const totalValue = total - Number(offerTotal);
        setTotal(totalValue);
      }
      else {
        setMessage("Offer not available");
        setOfferValue(0);
        const totalValue = total - Number(0);
        setTotal(totalValue);
      }
    } catch (error) {
      setMessage("Enter valid coupon code");
      setOfferValue(0);
      const totalValue = total - Number(0);
      setTotal(totalValue);
      console.log(error);
    }
  }


  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  }

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleRazorpayPayment = async () => {
    if (paymentType === "" || paymentType !== "online") {
      toast.error("Select payment method");
      return;
    }

    try {

      const { data: { apiKey } } = await axios.post(
        `${process.env.REACT_APP_API_URL}/get-api-key`, {},
        { headers: { Authorization: token } }
      );

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/create-online-order`, { amount: total, userAddressId: address._id, bookings: bookingInfo, city: "Lucknow", couponId },
        { headers: { Authorization: token } }
      );
      console.log("razor", data);

      const options = {
        key: apiKey,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "Abhicares Corp.",
        description: "Test Transaction",
        image: logo,
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
          paymentDetails.razorpay_order_id = response.razorpay_order_id;
          paymentDetails.razorpay_signature = response.razorpay_signature;

          try {
            const res = await axios.post(
              `${process.env.REACT_APP_API_URL}/payment-verification`, { ...paymentDetails, productId: data.order._id },
              { headers: { Authorization: token } }
            );
            console.log("handler", res.data);
            if (res.data.success) {
              navigate("/success");
            }
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
          }
        },
        prefill: {
          name: localStorage.getItem("userName"),
          contact: localStorage.getItem("userPhone")
        },
        notes: {
          address: "Abhicares Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <WebsiteWrapper>
      <div>
        <div className={`${classes.container} ${classes.checkout_container}`}>
          <div className={classes.checkout_container_left}>
            <div className={classes.login_button_container_guest}>
              {!token && (
                <>
                  <p className={classes.heading}>Account</p>
                  <p className={classes.p}>
                    To book the service, please login or sign up
                  </p>
                  <button onClick={handleOnclick} className={classes.button}>
                    Login
                  </button>
                </>
              )}

              {address && (
                <div className={classes.address_container}>
                  {address.defaultAddress && (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      default
                    </span>
                  )}
                  <h4 className={classes.mt}>{address?.mobile}</h4>
                  <p>{`${address?.addressLine},${address?.landmark},${address?.pincode}`}</p>
                </div>
              )}

              {token && (
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className={`${classes.select_address_btn}`}
                >
                  Select different address
                </button>
              )}
            </div>
            {bookingInfo.length !== 0 && (
              <>
                <div className={classes.bookingWrapper}>
                  <div className={classes.booking_info_container}>
                    {bookingInfo && bookingInfo?.map((data, index) => (
                      <div
                        className={classes.booking_info}
                        key={data.productId}
                      >
                        <h6>{data.name}</h6>
                        <p>{data.bookingDate}</p>
                        <p>{data.bookingTime}</p>
                        <button onClick={() => handleDateTimeChange(index)}>Change</button>
                      </div>
                    ))}
                  </div>
                </div>
                <h5 className={classes.select_type_heading}>Select Payment Type</h5>
                <div className={classes.d_flex}>
                  <div>
                    <input onChange={handlePaymentTypeChange} type="radio" name="paymentType" value="cod" id="cod" />
                    <label htmlFor="cod">COD</label>
                  </div>
                  <div>
                    <input onChange={handlePaymentTypeChange} type="radio" name="paymentType" value="online" id="online" />
                    <label htmlFor="online">Online</label>
                  </div>
                </div>
                <button
                  onClick={paymentType === "cod" ? handleCodOrder : handleRazorpayPayment}
                  className={`${classes.continue_btn}`}
                >
                  {isLoading ?
                    <span className={classes.img_container}>
                      <img className={classes.img} src={loader} alt="loader" />
                      Continuing...
                    </span>
                    : "Continue"
                  }
                </button>
              </>
            )}
          </div>

          <div className={classes.cart_checkout_container}>
            <div className={classes.cart}>
              <h3>Your Services</h3>
              <div className={classes.cart_items_container}>
                {cart?.items?.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    isButton
                    setBookingInfo={setBookingInfo}
                    bookingInfo={bookingInfo}
                  />
                ))}
              </div>
            </div>

            <div className={classes.offer_box}>
              <div className={classes.logo_box}>
                <AiOutlinePercentage size={20} />
              </div>
              <div>
                <p className={classes.offer_p}>Coupons and offers</p>
                <div className={classes.input_wrapper}>
                  <input onChange={(e) => setOfferCode(e.target.value)} value={offerCode} className={classes.input} placeholder="Enter coupon code" type="text" name="name" id="name" />
                  <button onClick={handleCheck}>Apply</button>
                </div>
                {message && <p className={message === "Offer available" ? classes.green : classes.red}>{message}</p>}
              </div>
            </div>
            {isShow && (
              <div className={classes.payment_summary}>
                <h5 className={classes.payment_summary_h4}>Payment Summary</h5>
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Item total</p>
                  <p className={classes.payment_summary_p}>
                    ₹{cart.totalPrice}
                  </p>
                </div>
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Tax and Fee(18% GST)</p>
                  <p className={classes.payment_summary_p}> + ₹{totalTaxRs}</p>
                </div>
                {<div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Discount</p>
                  <p className={classes.payment_summary_p}> - ₹{offerValue}</p>
                </div>}
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Total</p>
                  <p className={classes.payment_summary_p}>
                    ₹{total}
                  </p>
                </div>
              </div>
            )}

            <div className={classes.amount_to_pay_box}>
              <h5 className={classes.amount_to_pay_box_h4}>Amount to pay</h5>
              <div>
                <p className={classes.amount_to_pay}>₹{total}</p>
                <button
                  onClick={() => setIsShow(!isShow)}
                  className={classes.view_break_up_button}
                >
                  {isShow ? "Close" : "View"} breakup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginSignupModal isOpen={isOpen} handleOnclick={handleOnclick} />
      {isAddressModalOpen && (
        <AddressModal
          isOpen={isAddressModalOpen}
          setIsAddressModalOpen={setIsAddressModalOpen}
          setAddress={setAddress}
          getAllAddress={getAllAddress}
          allAddress={allAddress}
        />
      )}

      {isSuccessModalOpen && (
        <div className={classes.modal_wrapper}>
          <div className={classes.modal}>
            <div>
              <FaCheckCircle size={80} color="green" />
            </div>
            <h5>Your order has been placed.</h5>
            <button
              onClick={() => navigate("/my_bookings")}
              className={classes.button}
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {isModalOpen &&
        <DateTimeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          info={info}
          setInfo={setInfo}
          handleOnSubmit={handleOnSubmit}
        />
      }
    </WebsiteWrapper>
  );
};

export default CheckoutPage;
