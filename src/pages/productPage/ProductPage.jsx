import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./ProductPage.module.css";
import axios from "axios";
import parse from "html-react-parser";

import SubService from "../../components/productPage/SubService";
import Service from "../../components/productPage/Service";
import Modal from "../../components/productInfoModal/Modal";
import CartItem from "../../components/checkout/CartItem";

import { BsStarFill } from "react-icons/bs";
import { AiOutlinePercentage } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";


const ProductPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    const handleOnclick = async () => {
        setIsOpen(!isOpen);
    };


    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-product/${params.serviceId}`);
            console.log(data);
            setAllProducts(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <>
            <section className={classes.product_page}>
                <div className={classes.container}>
                    <h1 className={classes.heading}>Salon Classic</h1>
                    <div className={classes.booking}>
                        <div className={classes.star_container}>
                            <BsStarFill color="white" size={15} />
                        </div>
                        <span className={classes.booking_span}>4.83 (4.0 M bookings)</span>
                    </div>

                    <div className={classes.min_lg_hidden}>
                        <div className={classes.offer}>
                            <div className={classes.offer_left_div}>
                                <div className={classes.offer_img_outer_div}>
                                    <AiOutlinePercentage color="white" size={20} />
                                </div>
                            </div>
                            <div className={""}>
                                <p className={classes.offer_left_div_p}>20% of on Kotak Silk cards</p>
                                <p className={`${classes.offer_left_div_p} ${classes.offer_left_div_first_p}`}>20% of up to INR 350</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.wrapper}>
                        <div className={classes.selected_service}>
                            <div>
                                <h2 className={classes.selected_service_h2}>Bestseller Packages</h2>
                                <div className={classes.sub_services_container}>
                                    <SubService
                                        handleOnclick={handleOnclick}
                                    />
                                    <SubService
                                        handleOnclick={handleOnclick}
                                    />
                                </div>
                            </div>
                            <div className={classes.products_cotainer}>
                                <h2>Products</h2>
                                {allProducts?.map((product) => (
                                    <div key={product._id} className={classes.product}>
                                        <img src={`${process.env.REACT_APP_DOMAIN}/uploads/${product.imageUrl[0]}`} alt="product" />
                                        <h4>{product.name}</h4>
                                        <p>{parse(product.description)}</p>
                                        <div className={classes.price_cotainer}>
                                        <p className={classes.price}>₹{product.price}</p>
                                        <p className={classes.price}>₹{product.offerPrice}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={classes.sm_cart}>
                            <span className={classes.sm_cart_span}>₹669</span>
                            <button onClick={() => navigate("/checkout")} className={`${classes.button} ${classes.view_cart_button}`}>
                                View Cart
                            </button>
                        </div>
                        <div className={`${classes.right_section} ${classes.max_lg_hidden}`}>
                            <div className={classes.cart_detail_box}>
                                <button onClick={() => navigate("/checkout")} className={`${classes.button} ${classes.view_cart_button}`}>
                                    <span>₹669</span>
                                    <span>View Cart</span>
                                </button>
                                <CartItem />
                                <button className={`${classes.button} ${classes.right_section_common_button}`}>Edit</button>
                            </div>
                            <div className={classes.offer_container}>
                                <div className={classes.offer}>
                                    <div className={classes.offer_left_div}>
                                        <div className={classes.offer_img_outer_div}>
                                            <AiOutlinePercentage color="white" size={20} />
                                        </div>
                                    </div>
                                    <div className={""}>
                                        <p className={classes.offer_left_div_p}>20% of on Kotak Silk cards</p>
                                        <p className={`${classes.offer_left_div_p} ${classes.offer_left_div_first_p}`}>20% of up to INR 350</p>
                                    </div>
                                </div>
                                <button className={`${classes.button} ${classes.right_section_common_button}`}>
                                    View More Offers
                                    <FiChevronDown size={21} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={isOpen}
                handleOnclick={handleOnclick}
            />
        </>
    );
};

export default ProductPage;