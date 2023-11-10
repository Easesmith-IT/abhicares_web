import { BiMinus, BiPlus } from "react-icons/bi";

import classes from "../../pages/checkoutPage/CheckoutPage.module.css";

const CartItem = () => {
    return (
        <div className={classes.cart_item}>
            <div className={classes.cart_item_left}>
                <p className={classes.p}>AC repair (split/window)</p>
                <ul className={classes.list_container}>
                    <li className={classes.list_item}>Less/ no cooling x1</li>
                    <li className={classes.list_item}>Less/ no cooling x1</li>
                </ul>
            </div>
            <div className={classes.cart_item_right}>
                <button className={classes.button}>
                    <BiMinus size={20} />
                    <span className={classes.quantity}>1</span>
                    <BiPlus size={20} />
                </button>
                <span className={classes.price}>₹299</span>
            </div>
        </div>
    );
};

export default CartItem;