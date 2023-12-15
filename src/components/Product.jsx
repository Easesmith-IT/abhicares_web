import { useEffect, useState } from 'react';
import classes from '../pages/productPage/ProductPage.module.css'
import parse from "html-react-parser";
import Modal from './productInfoModal/Modal';
import {
    addItemToCart,
    deleteItemFromCart,
    getCartDetails,
    updateQty,
} from "../store/slices/cartSlice";
import { useDispatch, useSelector } from 'react-redux';
import { BiMinus, BiPlus } from 'react-icons/bi';


const Product = ({ product }) => {
    const userId = useSelector(state => state.user.userId);
    const [isOpen, setIsOpen] = useState(false);
    const [productInCart, setProductInCart] = useState({});

    const dispatch = useDispatch();

    const handleOnclick = async () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        (async () => {
            await dispatch(getCartDetails());
        })()
    }, [])

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        const filtered = cart?.items?.find((item) => item?.productId?._id === product._id);
        setProductInCart(filtered);
    }, [getCartDetails,cart])



    const handleAddToCart = async () => {

        if (productInCart) {
            let updatedQuantity = productInCart.quantity + 1;
            await dispatch(addItemToCart({ id: product._id }))
            await dispatch(getCartDetails());
        }
        else {
            await dispatch(addItemToCart({ id: product._id }))
            await dispatch(getCartDetails());
        }
    }

    const handleOnPlusClick = async () => {
        await dispatch(
            addItemToCart({ id: productInCart?.productId?._id })
        );
        await dispatch(getCartDetails());
    }

    const handleOnMinusClick = async () => {
        await dispatch(
            deleteItemFromCart({ itemId: productInCart.productId._id })
        );
        await dispatch(getCartDetails());
    }


    return (
        <>
            <div className={classes.product}>
                <img onClick={handleOnclick} src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${product?.imageUrl[0]}`} alt="product" />
                <div className={classes.product_info}>
                    <h5>{product?.name}</h5>
                    <p>{parse(product.description)}</p>
                    <div className={classes.d_flex}>
                        <div className={classes.price_cotainer}>
                            <p className={classes.price}>₹{product.price}</p>
                            <p className={classes.price}>₹{product.offerPrice}</p>
                        </div>
                        {cart?.items?.find((item) => item?.productId?._id === product?._id) ?
                            <button className={classes.button}>
                                <BiMinus size={20} onClick={handleOnMinusClick} />
                                <span className={classes.quantity}>{productInCart?.quantity}</span>
                                <BiPlus size={20} onClick={handleOnPlusClick} />
                            </button>
                            : <button onClick={handleAddToCart} className={`${classes.addToCartBtn}`}>Add</button>
                        }
                    </div>
                </div>
            </div>
            {
                isOpen && <Modal
                    isProduct={true}
                    isOpen={isOpen}
                    handleOnclick={handleOnclick}
                    Data={product}
                />
            }
        </>
    )
}

export default Product