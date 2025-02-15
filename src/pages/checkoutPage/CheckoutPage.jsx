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
import WebsiteWrapper from "../WebsiteWrapper";
import { BackDropLoader } from "../../components/backdrop-loader/BackDropLoader";
import CelebrationModal from "../../components/celebration-modal/CelebrationModal";
import { Button } from "@mui/material";
import { convertTimeToDate } from "../../utils/timeToDate";
import { parse } from "date-fns";
import { readCookie } from "../../utils/readCookie";
import usePostApiReq from "../../hooks/usePostApiReq";
import useGetApiReq from "../../hooks/useGetApiReq";

const CheckoutPage = () => {
  const { res: calculateChargeRes, fetchData: calculateCharge, isLoading: calculateChargeLoading } = usePostApiReq();
  const { res: getReferralCreditsRes, fetchData: getReferralCredits, isLoading: getReferralCreditsLoading } = usePostApiReq();
  const { res: getCouponDetailsRes, fetchData: getCouponDetails, isLoading: getCouponDetailsLoading, error } = usePostApiReq();
  const { res: getApiKeyRes, fetchData: getApiKey, isLoading: getApiKeyLoading, error: getApiKeyError } = usePostApiReq();
  const { res: createOnlineOrderRes, fetchData: createOnlineOrderFun, isLoading: createOnlineOrderLoading, error: createOnlineOrderError } = usePostApiReq();
  const { res: placeCodOrderRes, fetchData: placeCodOrder, isLoading: placeCodOrderLoading, error: placeCodOrderError } = usePostApiReq();
  const { res: getUserAddressRes, fetchData: getUserAddress } = useGetApiReq();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
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
  const [couponCode, setCouponCode] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [info, setInfo] = useState({
    productId: "",
    name: "",
    bookingDate: "",
    bookingTime: "Select time (08:00AM-08:00PM)"
  })
  const [totalTaxRs, setTotalTaxRs] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [credits, setCredits] = useState(0);
  const [creditsAvailable, setCreditsAvailable] = useState(false);
  const [isCelebrationModalOpen, setIsCelebrationModalOpen] = useState(false);

  console.log("bookingInfo", bookingInfo);

  const token = readCookie("userInfo");
  const userId = token?.id;
  const userName = token?.name;

  const getAllAddress = async () => {
    getUserAddress("/shopping/get-user-address")
  };

  useEffect(() => {
    if (getUserAddressRes?.status === 200 || getUserAddressRes?.status === 201) {
      setAllAddress(getUserAddressRes?.data.data);
      if (!address) {
        let defaultAddress = getUserAddressRes?.data.data.find((add) => add.defaultAddress === true);

        if (!defaultAddress) {
          defaultAddress = getUserAddressRes?.data.data[getUserAddressRes?.data.data.length - 1];
        }
        setAddress(defaultAddress);
      }
    }
  }, [getUserAddressRes])

  useEffect(() => {
    (async () => {
      await dispatch(getCartDetails());
    })();
    setTotalTaxRs((cart.totalPrice * 18) / 100)
    getAllAddress();
  }, []);


  const cart = useSelector((state) => state.cart);
  console.log("cart", cart);
  let serviceCategoryType = []

  useEffect(() => {
    cart?.items?.forEach((element) => {
      if (element?.packageId) {
        serviceCategoryType.push(element?.packageId?.serviceId?.categoryId?._id)
      }
      else {
        serviceCategoryType.push(element?.productId?.serviceId?.categoryId?._id)
      }
    });
  }, [cart])



  // useEffect(() => {
  //   if (cart.items.length === 0) {
  //     navigate("/")
  //   }
  // }, [cart])

  const caluclateCharge = async () => {
    const modifiedItems = cart?.items?.map(item => ({
      type: item?.type,
      serviceId: item?.type === "package" ? item?.packageId?.serviceId : item?.productId?.serviceId,
      quantity: item?.quantity,
      prodId: item?.type === "package" ? item?.packageId?._id : item?.productId?._id
    }))
    console.log("modifiedItems", modifiedItems);

    calculateCharge("/shopping/caluclate-charge", { items: modifiedItems, couponCode })
  };

  useEffect(() => {
    caluclateCharge()
  }, [cart, couponId])

  useEffect(() => {
    if (calculateChargeRes?.status === 200 || calculateChargeRes?.status === 201) {
      console.log("calculateChargeRes", calculateChargeRes);

      setTotalTaxRs(calculateChargeRes?.data?.totalTax)
      setTotal(calculateChargeRes?.data?.totalPayable)
      setOfferValue(calculateChargeRes?.data?.totalDiscount)
    }
  }, [calculateChargeRes])

  // useEffect(() => {
  //   const totalTaxRupee = (cart.totalPrice * 18) / 100;
  //   setTotal((Number(totalTaxRupee) + Number(cart.totalPrice)) - credits);
  //   setTotalTaxRs(totalTaxRupee);
  // }, [getCartDetails, cart, credits]);


  const handleOnclick = () => {
    setIsOpen(!isOpen);
  };

  console.log("bookingInfo", bookingInfo.map((item) => ({ ...item, bookingTime: convertTimeToDate(item.bookingTime) })));


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
    placeCodOrder("/shopping/place-cod-order", { itemTotal: cart.totalPrice, discount: offerValue, tax: totalTaxRs, total: total, userAddressId: address._id, bookings: bookingInfo.map((item) => ({ ...item, bookingTime: parse(item?.bookingTime, 'HH:mm', new Date()) })), city: "Lucknow", couponId, referalDiscount: credits })
  };

  useEffect(() => {
    if (placeCodOrderRes?.status === 200 || placeCodOrderRes?.status === 201) {
      navigate("/success");
    }
  }, [placeCodOrderRes])

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

    getCouponDetails("/shopping/get-coupon-details", { name: offerCode, serviceCategoryType, userId })
  }

  useEffect(() => {
    if (getCouponDetailsRes?.status === 200 || getCouponDetailsRes?.status === 201) {
      console.log("getCouponDetailsRes", getCouponDetailsRes);

      caluclateCharge();
      const { status, _id, name } = getCouponDetailsRes?.data?.data || {};

      if (offerValue > 0) {
        return;
      }

      if (status === "active") {
        setMessage("Valid coupon");
        setCouponId(_id)
        setCouponCode(name)
      }
      else {
        setMessage("Not valid coupon");
        setOfferValue(0);
        // const totalValue = total - Number(0);
        // setTotal(totalValue);
      }
    }
  }, [getCouponDetailsRes])

  useEffect(() => {
    if (error) {
      setMessage("Enter valid coupon code");
      const totalValue = total + Number(offerValue);
      setOfferValue(0);
      setTotal(totalValue);
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  }, [error])


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
    setIsLoading(true);
    getApiKey("/shopping/get-api-key")
  }

  const createOnlineOrder = async () => {
    createOnlineOrderFun("/shopping/create-online-order", { itemTotal: cart.totalPrice, discount: offerValue, totalTax: totalTaxRs, totalPayable: total, userAddressId: address._id, bookings: bookingInfo.map((item) => ({ ...item, bookingTime: convertTimeToDate(item.bookingTime) })), couponId, referalDiscount: credits })
  }

  useEffect(() => {
    if (getApiKeyRes?.status === 200 || getApiKeyRes?.status === 201) {
      createOnlineOrder()
    }
  }, [getApiKeyRes])

  useEffect(() => {
    if (getApiKeyError) {
      setIsLoading(false);
    }
  }, [getApiKeyError])


  useEffect(() => {
    if (createOnlineOrderRes?.status === 200 || createOnlineOrderRes?.status === 201) {
      (async () => {
        try {
          console.log("tax", totalTaxRs);
          const { data } = createOnlineOrderRes || {};
          console.log("razor", data);

          const options = {
            key: getApiKeyRes?.data?.apiKey,
            amount: `${data.razorpayOrder.amount}00`,
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
                setIsLoader(true);
                const res = await axios.post(
                  `${import.meta.env.VITE_APP_API_URL}/payment-verification`, { ...paymentDetails, productId: data.order._id, orderId: data?.order?.orderId },
                  { withCredentials: true }
                );
                console.log("handler", res.data);
                if (res.data.success) {
                  navigate("/success");
                }
              } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
              }
              finally {
                setIsLoader(false);
              }
            },
            prefill: {
              name: userName,
              contact: token?.phone
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
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      })()
    }
  }, [createOnlineOrderRes])

  useEffect(() => {
    if (createOnlineOrderError) {
      setIsLoading(false);
    }
  }, [createOnlineOrderError])

  const getReferralCodeData = async () => {
    getReferralCredits("/shopping/get-referralCredits")
  }

  useEffect(() => {
    userId && getReferralCodeData();
  }, [])

  useEffect(() => {
    if (getReferralCreditsRes?.status === 200 || getReferralCreditsRes?.status === 201) {
      setCredits(getReferralCreditsRes?.data?.credits);
      setCreditsAvailable(getReferralCreditsRes?.data?.creditsAvailable);
      setIsCelebrationModalOpen(getReferralCreditsRes?.data?.creditsAvailable);
    }
  }, [getReferralCreditsRes])

  return (
    <WebsiteWrapper>
      <div>
        {isCelebrationModalOpen &&
          <CelebrationModal
            isModalOpen={isCelebrationModalOpen}
            setIsModalOpen={setIsCelebrationModalOpen}
            credits={credits}
          />
        }
        {isLoader && <BackDropLoader />}
        <div className={`${classes.container} ${classes.checkout_container}`}>
          <div className={classes.checkout_container_left}>
            <div className={classes.login_button_container_guest}>
              {!userName && (
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

              {userName && (
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
                        <img
                          style={{ width: "70px", height: "70px", borderRadius: "10px" }}
                          src={`${import.meta.env.VITE_APP_IMAGE_URL}/${data?.imageUrl[0]}`}
                        />
                        <h6 style={{ marginTop: "10px", fontSize: "16px" }}>{data.name}</h6>
                        <div>
                          <p>{data.bookingDate}</p>
                          <p>{data.bookingTime}</p>
                        </div>
                        <button style={{ color: "#005CC8" }} onClick={() => handleDateTimeChange(index)}>Change</button>
                      </div>
                    ))}
                  </div>
                </div>
                {(address?.defaultAddress || address) && bookingInfo.length === cart?.items.length &&
                  <>
                    <h5 className={classes.select_type_heading}>Select Payment Type</h5>
                    <div className={classes.d_flex}>
                      <div>
                        <input onChange={handlePaymentTypeChange} type="radio" name="paymentType" value="cod" id="cod" />
                        <label style={{ color: "#005CC8" }} htmlFor="cod">Cash on Delivery (COD)</label>
                      </div>
                      <div>
                        <input onChange={handlePaymentTypeChange} type="radio" name="paymentType" value="online" id="online" />
                        <label style={{ color: "#005CC8" }} htmlFor="online">Pay using UPI,Debit Card, wallet</label>
                      </div>
                    </div>
                  </>
                }
                {!address?.defaultAddress && !address && bookingInfo.length === cart?.items.length &&
                  <b className="mt-3" style={{ fontSize: "18px", color: "#CC5500" }}>Select address to continue</b>
                }

                {(address?.defaultAddress || address) && bookingInfo.length === cart?.items.length &&
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
                  </button>}
              </>
            )}

            {bookingInfo.length !== cart?.items.length && userName &&
              <b className="mt-4" style={{ fontSize: "18px", color: "#CC5500" }}>Please select booking date and time to continue.</b>
            }
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
                    image
                  />
                ))}
                {cart.items.length === 0 &&
                  <div style={{ display: "flex", gap: "20px", padding: "10px 0" }}>
                    <h5>Cart is empty</h5>
                    <Button
                      onClick={() => navigate("/")}
                      // style={{
                      //   backgroundColor: "white",
                      //   color: "black"
                      // }}
                      variant="contained"
                    >
                      Shop Now
                    </Button>
                  </div>
                }
              </div>
            </div>

            <div className={classes.offer_box}>
              <div className={classes.logo_box}>
                <AiOutlinePercentage size={20} />
              </div>
              <div>
                <p className={classes.offer_p}>Coupons and offers</p>
                <div className={classes.input_wrapper}>
                  <input onChange={(e) => setOfferCode(e.target.value.toUpperCase())} value={offerCode} className={classes.input} placeholder="Enter coupon code" type="text" name="name" id="name" />
                  <button onClick={handleCheck}>Apply</button>
                </div>
                {message && <p className={message === "Valid coupon" ? classes.green : classes.red}>{message}</p>}
              </div>
            </div>

            {isShow && (
              <div className={classes.payment_summary}>
                <h5 className={classes.payment_summary_h4}>Payment Summary</h5>
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Item total</p>
                  <p className={classes.payment_summary_p}>
                    ₹{cart.totalPrice || 0}
                  </p>
                </div>
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Tax and other charges</p>
                  <p className={classes.payment_summary_p}> + ₹{totalTaxRs || 0}</p>
                </div>
                {offerValue > 0 && <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Discount</p>
                  <p className={classes.payment_summary_p}> - ₹{offerValue || 0}</p>
                </div>}

                {credits > 0 && <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Referal Discount</p>
                  <p className={classes.payment_summary_p}> - ₹{credits || 0}</p>
                </div>}
                <div className={classes.payment_summary_div}>
                  <p className={classes.payment_summary_p}>Total</p>
                  <p className={classes.payment_summary_p}>
                    ₹{Math.round(total || 0)}
                  </p>
                </div>
              </div>
            )}

            <div className={classes.amount_to_pay_box}>
              <h5 className={classes.amount_to_pay_box_h4}>Amount to pay</h5>
              <div>
                <p className={classes.amount_to_pay}>₹{Math.round(total || 0)}</p>
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
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
// })(CheckoutPage);
