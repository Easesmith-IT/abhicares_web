import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./ProductPage.module.css";
import loaderClasses from "../../components/loader/Loader.module.css";
import loader from "../../assets/rolling-white.gif";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SubService from "../../components/productPage/SubService";
import CartItem from "../../components/checkout/CartItem";

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
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
  });

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const params = useParams();

  const getSeoForProductPage = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_CMS_URL}/get-seo/${params.serviceId}`
      );
      const { seoTitle, seoDescription } = data?.seo;
      setSeoData({ title: seoTitle, description: seoDescription });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-all-product/${params.serviceId}`
      );
      console.log("services", data);
      setAllProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsProductLoading(false);
    }
  };

  const getAllPackages = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-service-package/${params?.serviceId}`
      );
      console.log("package",data);
      setAllPackages(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPackageLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllPackages();
    getSeoForProductPage();
    (async () => {
      await dispatch(getCartDetails());
    })();
  }, []);

  // console.log("cart",cart);

  return (
    <HelmetProvider>
      <WebsiteWrapper>
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
        </Helmet>
        <section className={classes.product_page}>
          <div className={classes.container}>
            <h1 className={classes.heading}>{state?.name}</h1>
            <div className={classes.booking}>
              {/* <div className={classes.star_container}>
                            <BsStarFill color="white" size={15} />
                        </div> */}
              {/* <span className={classes.booking_span}>4.83 (4.0 M bookings)</span> */}
            </div>

            {/* <div className={classes.min_lg_hidden}>
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
                    </div> */}

            <div className={classes.wrapper}>
              <div className={classes.selected_service}>
                <div>
                  <h2 className={classes.selected_service_h2}>
                    Bestseller Packages
                  </h2>
                  <div className={classes.sub_services_container}>
                    {!isPackageLoading && allPackages?.length === 0 && (
                      <p>No packages found</p>
                    )}

                    {isPackageLoading && allPackages?.length === 0 && <Loader />}

                    {allPackages?.map((singlePackage) => (
                      <SubService
                        key={singlePackage?._id}
                        singlePackage={singlePackage}
                        serviceId={params?.serviceId}
                        setIsCartLoading={setIsCartLoading}
                        features={state?.features}
                      />
                    ))}
                  </div>
                </div>
                <div className={classes.products_cotainer}>
                  <h2>Services</h2>
                  {!isProductLoading && allProducts?.length === 0 && (
                    <p>No products found</p>
                  )}

                  {isProductLoading && allProducts?.length === 0 && <Loader />}

                  {allProducts?.map((product) => (
                    <Product
                      product={product}
                      setIsCartLoading={setIsCartLoading}
                      features={state?.features}
                    />
                  ))}
                </div>
              </div>

              {cart?.items?.length !== 0 && (
                <div className={classes.sm_cart}>
                  <span className={classes.sm_cart_span}>₹{cart.totalPrice}</span>
                  <button
                    onClick={() => navigate("/checkout")}
                    className={`${classes.button} ${classes.view_cart_button}`}
                  >
                    View Cart
                  </button>
                </div>
              )}
              <div
                className={`${classes.right_section} ${classes.max_lg_hidden}`}
              >
                <div className={classes.cart_detail_box}>
                  {cart?.items?.length !== 0 && (
                    <button
                      onClick={() => navigate("/checkout")}
                      className={`${classes.button} ${classes.view_cart_button}`}
                    >
                      <span>₹{cart.totalPrice}</span>
                      <span>
                        {isCartLoading ? (
                          <div className={loaderClasses.img_container}>
                            <img src={loader} alt="loader" />
                            Loading
                          </div>
                        ) : (
                          "View Cart"
                        )}
                      </span>
                    </button>
                  )}
                  {cart?.items?.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                  {cart?.items?.length === 0 && <p>No items in your cart</p>}
                  {/* <button className={`${classes.button} ${classes.right_section_common_button}`}>Edit</button> */}
                </div>
                {/* <div className={classes.offer_container}>
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
                            </div> */}
              </div>
            </div>
          </div>
        </section>
      </WebsiteWrapper>
    </HelmetProvider>
  );
};

export default ProductPage;
