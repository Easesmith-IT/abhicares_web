import { useEffect, useState } from "react";
import classes from "../pages/productPage/ProductPage.module.css";
import loaderClasses from "../components/loader/Loader.module.css";
import loader from "../assets/rolling-white.gif";
import parse from "html-react-parser";
import Modal from "./productInfoModal/Modal";
import {
  addItemToCart,
  deleteItemFromCart,
  getCartDetails,
  changeCartLoadingState,
} from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiMinus, BiPlus } from "react-icons/bi";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product = ({ product, setIsCartLoading, flag = true, features }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productInCart, setProductInCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);

  const dispatch = useDispatch();

  const handleOnclick = async () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    (async () => {
      await dispatch(getCartDetails());
    })();
  }, []);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const filtered = cart?.items?.find(
      (item) => item?.productId?._id === product._id
    );
    setProductInCart(filtered);
  }, [getCartDetails, cart]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    if (flag) {
      setIsCartLoading(true);
    }

    await dispatch(addItemToCart({ id: product._id, type: "product" }));
    await dispatch(getCartDetails());
    setIsLoading(false);
    if (flag) {
      setIsCartLoading(false);
    }
  };

  const handleOnPlusClick = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    await dispatch(
      addItemToCart({ id: productInCart?.productId?._id, type: "product" })
    );
    await dispatch(getCartDetails());
    setIsLoading(false);
  };

  const handleOnMinusClick = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    await dispatch(
      deleteItemFromCart({
        itemId: productInCart.productId._id,
        type: "product",
      })
    );
    await dispatch(getCartDetails());
    setIsLoading(false);
  };

  return (
    <>
      {isImgLoading && <Skeleton height={260} />}
      <div className={classes.product} onClick={handleOnclick}>
        <img
          style={{ display: !isImgLoading ? "block" : "none" }}
          onLoad={() => setIsImgLoading(false)}
          className={classes.img}
          src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${product?.imageUrl[0]}`}
          alt="product"
        />
        <div className={classes.product_info}>
          <h5>{product?.name}</h5>
          <p>{parse(product.description)}</p>
          <div className={classes.d_flex}>
            <div className={classes.price_cotainer}>
              <p className={classes.price}>₹{product.price}</p>
              <p className={classes.price}>₹{product.offerPrice}</p>
            </div>
            {cart?.items?.find(
              (item) => item?.productId?._id === product?._id
            ) ? (
              <button className={classes.button}>
                <BiMinus size={20} onClick={handleOnMinusClick} />
                <span className={classes.quantity}>
                  {productInCart?.quantity}
                </span>
                <BiPlus size={20} onClick={handleOnPlusClick} />
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`${classes.addToCartBtn}`}
              >
                {isLoading ? (
                  <div className={loaderClasses.img_container}>
                    <img src={loader} alt="loader" />
                    Adding...
                  </div>
                ) : (
                  "Add"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal
          isProduct={true}
          isOpen={isOpen}
          handleOnclick={handleOnclick}
          Data={product}
          features={features}
        />
      )}
    </>
  );
};

export default Product;
