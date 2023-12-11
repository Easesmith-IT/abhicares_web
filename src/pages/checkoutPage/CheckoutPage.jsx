import { useEffect, useState } from "react";

import classes from "./CheckoutPage.module.css";

import { AiOutlinePercentage } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Carousel from "react-multi-carousel";

import CartItem from "../../components/checkout/CartItem";
import FrequentlyAddedItems from "../../components/checkout/FrequentlyAddedItems";
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

  const [info, setInfo] = useState({
    productId: "",
    name: "",
    bookingDate: "",
    bookingTime: "Select time (08:00AM-08:00PM)"
  })

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

    getAllAddress();
  }, []);

  const cart = useSelector((state) => state.cart);


  const handleOnclick = () => {
    setIsOpen(!isOpen);
  };


  const handleOrder = async () => {
    if (!address) {
      toast.error("Select address");
      return;
    }

    if (cart?.items.length !== bookingInfo.length) {
      toast.error("Select booking date and time");
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/place-cod-order`, { userAddressId: address._id, bookings: bookingInfo }, { headers: { Authorization: token } });
      setIsLoading(false);


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

      // const res = await axios.post(`${process.env.REACT_APP_API_URL}/create-order-booking/${userId}`, info, { headers: { Authorization: token } });
      // console.log("res", res);


    } catch (error) {
      console.log(error);
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

  return (
    <>
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
                        <h4>{data.name}</h4>
                        <p>{data.bookingDate}</p>
                        <p>{data.bookingTime}</p>
                        <button onClick={() => handleDateTimeChange(index)}>Change</button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleOrder}
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
              {/* <div className={classes.frequently_added}>
                <h4 className={classes.frequently_added_heading}>
                  Frequently added together
                </h4>
                <Carousel
                  responsive={responsive}
                  arrows={false}
                  className={classes.carousel}
                  customButtonGroup={<ButtonGroup />}
                >
                  <FrequentlyAddedItems />
                </Carousel>
              </div> */}

              {/* <div className={classes.checkbox_wrapper}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p className={classes.checkbox_p}>
                  Avoid calling before reaching the location
                </p>
              </div> */}
            </div>

            <div className={classes.offer_box}>
              <div className={classes.logo_box}>
                <AiOutlinePercentage size={20} />
              </div>
              <div>
                <p className={classes.offer_p}>Coupons and offers</p>
                <p className={classes.offer_p}>Login/Sign up to view offers</p>
              </div>
            </div>
            {isShow && (
              <div className={classes.payment_summary}>
                <h4 className={classes.payment_summary_h4}>Payment Summary</h4>
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Item total</p>
                  <p className={classes.payment_summary_p}>
                    ₹{cart.totalPrice}
                  </p>
                </div>
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Tax and Fee</p>
                  <p className={classes.payment_summary_p}>₹0</p>
                </div>
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Total</p>
                  <p className={classes.payment_summary_p}>
                    ₹{cart.totalPrice + 0}
                  </p>
                </div>
              </div>
            )}

            <div className={classes.amount_to_pay_box}>
              <h4 className={classes.amount_to_pay_box_h4}>Amount to pay</h4>
              <div>
                <p className={classes.amount_to_pay}>₹{cart.totalPrice}</p>
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
            <h3>Your order has been placed.</h3>
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
    </>
  );
};

export default CheckoutPage;
