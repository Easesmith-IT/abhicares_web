import { BiMinus, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import classes from "../../pages/checkoutPage/CheckoutPage.module.css";
import {
  addItemToCart,
  deleteItemFromCart,
  getCartDetails,
  updateQty,
} from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DateTimeModal from "../dateTimeModal/DateTimeModal";
import toast from "react-hot-toast";

const CartItem = ({ item, bookingInfo, setBookingInfo, isButton }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState({
    productId: item?.product?._id,
    name: item?.product?.name,
    bookingDate: "",
    bookingTime: ""
  })

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!info.bookingDate || !info.bookingTime) {
      toast.error("Select booking date and time");
      return;
    }
    setIsModalOpen(false);
    setBookingInfo([...bookingInfo, info])
  }


  const handleOnPlusClick = async () => {
    let updatedQuantity = item.quantity + 1;
    await dispatch(
      updateQty({ id: item.product._id, quantity: updatedQuantity })
    );
    await dispatch(getCartDetails());
  };

  const handleOnMinusClick = async () => {
    let updatedQuantity = item.quantity - 1;
    await dispatch(
      updateQty({
        id: item.product._id,
        quantity: updatedQuantity,
      })
    );
    await dispatch(getCartDetails());
  };

  const handleCartItemDelete = async () => {
    await dispatch(deleteItemFromCart({ itemId: item.product._id }));
    await dispatch(getCartDetails());
  }


  return (
    <>
      <div className={classes.cart_item}>
        <div className={classes.cart_item_left}>
          <p className={classes.p}>{item.product.name}</p>
        </div>

        <div className={classes.cart_item_right}>
          <button className={classes.button}>
            <BiMinus size={20} onClick={handleOnMinusClick} />
            <span className={classes.quantity}>{item?.quantity}</span>
            <BiPlus size={20} onClick={handleOnPlusClick} />
          </button>
          <MdDelete size={20} onClick={handleCartItemDelete} />
          <span className={classes.price}>₹{item.itemTotalOfferPrice}</span>
        </div>
        {isButton && <button onClick={() => setIsModalOpen(true)} className={classes.link}>Select Date and Time</button>}
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