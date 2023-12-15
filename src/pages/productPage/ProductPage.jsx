import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./ProductPage.module.css";
import axios from "axios";

import SubService from "../../components/productPage/SubService";
import Service from "../../components/productPage/Service";
import Modal from "../../components/productInfoModal/Modal";
import CartItem from "../../components/checkout/CartItem";

import { BsStarFill } from "react-icons/bs";
import { AiOutlinePercentage } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetails } from "../../store/slices/cartSlice";
import Product from "../../components/Product";
import Loader from "../../components/loader/Loader";
import WebsiteWrapper from "../WebsiteWrapper";


const ProductPage = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [allPackages, setAllPackages] = useState([]);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [isPackageLoading, setIsPackageLoading] = useState(true);

    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();


    const params = useParams();


    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-product/${params.serviceId}`);
            setAllProducts(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsProductLoading(false);
        }
    };

    const getAllPackages = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/get-service-package/${params?.serviceId}`);
            setAllPackages(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsPackageLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
        getAllPackages();
        (async () => {
            await dispatch(getCartDetails());
        })()
    }, [])

    return (
        <WebsiteWrapper>
            <section className={classes.product_page}>
                <div className={classes.container}>
                    <h1 className={classes.heading}>{state}</h1>
                    <div className={classes.booking}>
                        {/* <div className={classes.star_container}>
                            <BsStarFill color="white" size={15} />
                        </div> */}
                        {/* <span className={classes.booking_span}>4.83 (4.0 M bookings)</span> */}
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
                                    {
                                        !isPackageLoading
                                        && allPackages?.length === 0
                                        && <p>No packages found</p>
                                    }

                                    {isPackageLoading
                                        && allPackages?.length === 0
                                        && <Loader />
                                    }

                                    {allPackages?.map((singlePackage) => (
                                        <SubService
                                            key={singlePackage._id}
                                            singlePackage={singlePackage}
                                            serviceId={params?.serviceId}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={classes.products_cotainer}>
                                <h2>Products</h2>
                                {!isProductLoading
                                    && allProducts?.length === 0
                                    && <p>No products found</p>
                                }

                                {isProductLoading
                                    && allProducts?.length === 0
                                    && <Loader />
                                }

                                {allProducts?.map((product) => (
                                    <Product
                                        product={product}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={classes.sm_cart}>
                            <span className={classes.sm_cart_span}>₹{cart.totalPrice}</span>
                            {cart?.items?.length !== 0 && <button onClick={() => navigate("/checkout")} className={`${classes.button} ${classes.view_cart_button}`}>
                                View Cart
                            </button>}
                        </div>
                        <div className={`${classes.right_section} ${classes.max_lg_hidden}`}>
                            <div className={classes.cart_detail_box}>
                                {cart?.items?.length !== 0 && <button onClick={() => navigate("/checkout")} className={`${classes.button} ${classes.view_cart_button}`}>
                                    <span>₹{cart.totalPrice}</span>
                                    <span>View Cart</span>
                                </button>}
                                {cart?.items?.map((item) => (
                                    <CartItem
                                        key={item._id}
                                        item={item}
                                    />
                                ))}
                                {cart?.items?.length === 0 && <p>No items in your cart</p>}
                                {/* <button className={`${classes.button} ${classes.right_section_common_button}`}>Edit</button> */}
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
        </WebsiteWrapper>
    );
};

export default ProductPage;