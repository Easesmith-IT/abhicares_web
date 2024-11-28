import parse from 'html-react-parser';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Wrapper from '../../pages/Wrapper';
import classes from './ProductInfoModal.module.css';
import RatingsComp from './RatingsComp';

const ProductInfo = () => {
    const { state: { product, isPackage } } = useLocation();

    console.log("product", product);


    return (
        <Wrapper>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>{isPackage ? "Package" : "Product"} Info</h4>
                    {/* <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsInfoModalOpen(false)} cursor={"pointer"} size={26} />
                    </div> */}
                </div>
                <div className={classes.carousel} >
                    {product?.imageUrl?.map((image) => (
                        <img key={image} className={classes.carousel_img} src={`${process.env.REACT_APP_IMAGE_URL}/${image}`} alt={isPackage ? "Package" : "Product"} />
                    ))}
                </div>
                <div className={classes.contianer}>
                    <h5>{product?.name}</h5>
                    {product?.description && <p>{parse(product?.description)}</p>}
                    <div>
                        <span>₹{product?.price}</span>
                        <span>₹{product?.offerPrice}</span>
                    </div>
                </div>
                <RatingsComp className="" item={product} />
                {isPackage &&
                    <>
                        <h3 className={classes.h3}>Products</h3>
                        <div className={classes.products_cotainer}>
                            {product.products.map((item) => (
                                <div className={classes.product}>
                                    <div>
                                        <img className={classes.img} src={`${process.env.REACT_APP_IMAGE_URL}/${item?.productId?.imageUrl[0]}`} alt="product" />
                                        <div className={classes.product_info}>
                                            <h5>{item?.productId?.name}</h5>
                                            <p>{parse(item?.productId?.description)}</p>
                                            <div className={classes.d_flex}>
                                                <div className={classes.price_cotainer}>
                                                    <p className={classes.price}>₹{item?.productId?.price}</p>
                                                    <p className={classes.price}>₹{item?.productId?.offerPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <RatingsComp className="col" item={item?.productId} />
                                </div>
                            ))}
                        </div>
                    </>}
            </div>
        </Wrapper>
    )
}

export default ProductInfo