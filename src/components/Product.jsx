import { useEffect, useState } from 'react';
import classes from '../pages/productPage/ProductPage.module.css'
import parse from "html-react-parser";
import Modal from './productInfoModal/Modal';
import { addItemToCart, getCartDetails } from '../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiMinus, BiPlus } from 'react-icons/bi';


const Product = ({ product }) => {
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
    const {isUser} = useSelector(state => state.user)
    
    useEffect(() => {
        const filtered = cart?.items?.find((item) => item?.product?._id === product._id);
        setProductInCart(filtered)
    }, [cart])



    const handleAddToCart = async () => {

        if (productInCart) {
            let updatedQuantity = productInCart.quantity + 1;
            await dispatch(addItemToCart({ id: product._id, quantity: updatedQuantity }))
            await dispatch(getCartDetails());
        }
        else {
            await dispatch(addItemToCart({ id: product._id, quantity: 1 }))
            await dispatch(getCartDetails());
        }
    }


    const handleOnPlusClick = async () => {
        let updatedQuantity = productInCart.quantity + 1;
        await dispatch(addItemToCart({ id: productInCart.product._id, updatedQuantity }))
        await dispatch(getCartDetails());
    }

    const handleOnMinusClick = async () => {
        let updatedQuantity = productInCart.quantity - 1;
        await dispatch(addItemToCart({ id: productInCart.product._id, updatedQuantity }))
        await dispatch(getCartDetails());
    }


    return (
        <>
            <div className={classes.product}>
                <img onClick={handleOnclick} src={`${process.env.REACT_APP_DOMAIN}/uploads/${product?.imageUrl[0]}`} alt="product" />
                <div className={classes.d_flex}>
                    <h4>{product?.name}</h4>
                    {cart?.items?.find((item) => item.product._id === product._id) ?
                        <button className={classes.button}>
                            <BiMinus size={20} onClick={handleOnMinusClick} />
                            <span className={classes.quantity}>{productInCart?.quantity}</span>
                            <BiPlus size={20} onClick={handleOnPlusClick} />
                        </button>
                        : <button onClick={handleAddToCart} className={classes.button}>Add</button>
                    }
                </div>
                <p>{parse(product.description)}</p>
                <div className={classes.price_cotainer}>
                    <p className={classes.price}>₹{product.price}</p>
                    <p className={classes.price}>₹{product.offerPrice}</p>
                </div>
            </div>
            {
                isOpen && <Modal
                    isOpen={isOpen}
                    handleOnclick={handleOnclick}
                    Data={product}
                />
            }
        </>
    )
}

export default Product