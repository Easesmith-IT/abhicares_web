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

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

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

    console.log(item)

    return (
      <div className={classes.cart_item}>
        <div className={classes.cart_item_left}>
          <p className={classes.p}>{item.product.name}</p>
          {/* <ul className={classes.list_container}>
                    <li className={classes.list_item}>Less/ no cooling x1</li>
                    <li className={classes.list_item}>Less/ no cooling x1</li>
                </ul> */}
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
      </div>
    );
};

export default CartItem;