import { BiMinus, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import classes from "../../pages/checkoutPage/CheckoutPage.module.css";
import {
  addItemToCart,
  deleteItemFromCart,
  getCartDetails,
  updateQty,
} from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DateTimeModal from "../dateTimeModal/DateTimeModal";
import toast from "react-hot-toast";

const CartItem = ({ item, bookingInfo, setBookingInfo, isButton }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectButton, setIsSelectButton] = useState(true);
  const [info, setInfo] = useState({
    productId: item.type === "product" ? item?.productId?._id : "",
    packageId: item.type === "package" ? item?.packageId?._id : "",
    name: item.type === "product" ? item?.productId?.name : item?.packageId?.name,
    imageUrl: item.type === "product" ? item?.productId?.imageUrl : item?.packageId?.imageUrl,
    bookingDate: "",
    bookingTime: ""
  })

  console.log("item",item);
  

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!info.bookingDate || !info.bookingTime) {
      toast.error("Select booking date and time");
      return;
    }
    setIsModalOpen(false);
    setBookingInfo([...bookingInfo, info]);
  }

  useEffect(() => {
    const find = item.type === "product" ? bookingInfo?.findIndex((data) => data?.productId === item?.productId?._id) : bookingInfo?.findIndex((data) => data?.packageId === item?.packageId?._id)
    if (find >= 0) {
      setIsSelectButton(false);
    }
    else {
      setIsSelectButton(true);
    }
  }, [bookingInfo])



  const handleOnPlusClick = async () => {
    await dispatch(
      addItemToCart({ id: item.type === "product" ? item.productId._id : item.packageId._id, type: item.type })
    );
    await dispatch(getCartDetails());
  };

  const handleOnMinusClick = async () => {
    await dispatch(
      deleteItemFromCart({
        itemId: item.type === "product" ? item.productId._id : item.packageId._id,
        type: item.type
      })
    );
    await dispatch(getCartDetails());
  };


  // console.log(item.type, item?.quantity);
  // console.log(item.type, item?.quantity * item.type === "product" ? item.productId.offerPrice : item?.packageId?.offerPrice);

  return (
    <>
      <div className={classes.cart_item}>
        <div className={classes.cart_item_left}>
          <p className={classes.p}>{item?.type === "product" ? item?.productId?.name : item?.packageId?.name}</p>
        </div>

        <div className={classes.cart_item_right}>
          <button className={classes.button}>
            <BiMinus size={20} onClick={handleOnMinusClick} />
            <span className={classes.quantity}>{item?.quantity}</span>
            <BiPlus size={20} onClick={handleOnPlusClick} />
          </button>
          {/* <MdDelete size={20} onClick={handleCartItemDelete} /> */}
          <span className={classes.price}>₹{Number(item?.quantity) * Number(item.type === "product" ? item.productId.offerPrice : item?.packageId?.offerPrice)}</span>
        </div>
        {isButton && isSelectButton && <button style={{color:"#005CC8"}} onClick={() => setIsModalOpen(true)} className={classes.link}>Select Date and Time</button>}
      </div>

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

export default CartItem;