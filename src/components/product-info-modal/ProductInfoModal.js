import classes from './ProductInfoModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import parse from 'html-react-parser';
import Carousel from 'react-multi-carousel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ProductInfoModal = ({ setIsInfoModalOpen, product, isPackage }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 550 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 550, min: 0 },
            items: 1
        }
    };

    const ButtonGroup = ({ next, previous }) => {
        return (
            <>
                <button className={`${classes.carousel_button} ${classes.carousel_button_left}`} onClick={() => previous()} ><IoIosArrowBack size={35} /></button>
                <button className={`${classes.carousel_button} ${classes.carousel_button_right}`} onClick={() => next()} ><IoIosArrowForward size={35} /></button>
            </>
        );
    };
    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>{isPackage ? "Package" : "Product"} Info</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsInfoModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <Carousel responsive={responsive} arrows={false} showDots className={classes.carousel} customButtonGroup={<ButtonGroup />} >
                    {product?.imageUrl?.map((image) => (
                        <img key={image} className={classes.carousel_img} src={`${process.env.REACT_APP_IMAGE_URL}/${image}`} alt={isPackage ? "Package" : "Product"} />
                    ))}
                </Carousel>
                <div className={classes.contianer}>
                    <h5>{product?.name}</h5>
                    {product?.description && <p>{parse(product?.description)}</p>}
                    <div>
                        <span>₹{product?.price}</span>
                        <span>₹{product?.offerPrice}</span>
                    </div>
                </div>
                {isPackage &&
                    <>
                        <h3 className={classes.h3}>Products</h3>
                        <div className={classes.products_cotainer}>
                            {product.products.map((item) => (
                                <div className={classes.product}>
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
                            ))}
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default ProductInfoModal