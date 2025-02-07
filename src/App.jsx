
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { Toaster } from "react-hot-toast";
import { GoogleApiWrapper } from "google-maps-react";
import useGeolocation from "./hooks/usegelocation";
import { getCartDetails } from "./store/slices/cartSlice";
import PrivateRoute from "./components/private-route/PrivateRoute";
import useGetApiReq from "./hooks/useGetApiReq";
import usePostApiReq from "./hooks/usePostApiReq";
import { readCookie } from "./utils/readCookie";
import ProtectedRoute from "./components/private-route/ProtectedRoute";
import { changeAdminStatus, changeUserAuthStatus } from "./store/slices/userSlice";


const HomePage = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/aboutUs/AboutUs'));
const ContactUs = lazy(() => import('./pages/contactUs/ContactUs'));
const PrivacyPolicy = lazy(() => import('./pages/privacy&policy/Privacy&Policy'));
const ProductPage = lazy(() => import('./pages/productPage/ProductPage'));
const CheckoutPage = lazy(() => import('./pages/checkoutPage/CheckoutPage'));
const RegisterAsAProfessional = lazy(() => import('./pages/registerAsAProfessional/RegisterAsAProfessional'));
const TermsAndConditions = lazy(() => import("./pages/termsAndConditions/TermsAndConditions"));

const HelpCenter = lazy(() => import("./pages/helpCenter/HelpCenter"));
const MyBookings = lazy(() => import("./pages/myBookings/MyBookings"));
const SuccessPage = lazy(() => import("./pages/successPage/SuccessPage"));
const AntiDiscriminationPolicy = lazy(() => import("./pages/antiDiscriminationPolicy/AntiDiscriminationPolicy"));
const BookingDetails = lazy(() => import("./pages/bookingDetails/BookingDetails"));

// Admin route imports
const AdminLogin = lazy(() => import("./pages/AdminPanel/AdminLogin"));
const AvailableCities = lazy(() => import("./pages/AdminPanel/availableCities/AvailableCities"));
const CategoryServices = lazy(() => import("./pages/AdminPanel/CategoryServices/CategoryServices"));
const AdminAboutUs = lazy(() => import('./pages/AdminPanel/cms/about-us/AboutUs'));
const AdminContactUs = lazy(() => import('./pages/AdminPanel/cms/contact-us/ContactUs'));
const AdminPrivacyPolicy = lazy(() => import('./pages/AdminPanel/cms/privacy-policy/PrivacyPolicy'));
const Customers = lazy(() => import("./pages/AdminPanel/Customers"));
const Dashboard = lazy(() => import("./pages/AdminPanel/Dashboard"));
const AdminHelpCenter = lazy(() => import("./pages/AdminPanel/helpCenter/HelpCenter"));
const HelpCenterFaqs = lazy(() => import("./pages/AdminPanel/helpCenter/HelpCenterFaqs"));
const HelpCenterTickets = lazy(() => import("./pages/AdminPanel/helpCenter/HelpCenterTickets"));
const Enquiry = lazy(() => import("./pages/AdminPanel/Inquiry"));
const Offers = lazy(() => import("./pages/AdminPanel/offers/Offers"));
const Partners = lazy(() => import("./pages/AdminPanel/Partners"));
const Payments = lazy(() => import("./pages/AdminPanel/Payments"));
const ServiceInfoPage = lazy(() => import("./pages/AdminPanel/serviceInfoPage/ServiceInfoPage"));
const Services = lazy(() => import("./pages/AdminPanel/Services"));

const AppBanner = lazy(() => import("./pages/AdminPanel/Banners/AppBanner"));
const Banner = lazy(() => import("./pages/AdminPanel/Banners/Banner"));
const WebsiteBanner = lazy(() => import("./pages/AdminPanel/Banners/WebsiteBanner"));

const Category = lazy(() => import("./pages/AdminPanel/Banners/App/Category"));
const Home = lazy(() => import("./pages/AdminPanel/Banners/App/Home"));
const Product = lazy(() => import("./pages/AdminPanel/Banners/App/Product"));
const Service = lazy(() => import("./pages/AdminPanel/Banners/App/Service"));

const WebCategory = lazy(() => import("./pages/AdminPanel/Banners/Website/Category"));
const WebHome = lazy(() => import("./pages/AdminPanel/Banners/Website/Home"));
const WebProduct = lazy(() => import("./pages/AdminPanel/Banners/Website/Product"));
const WebService = lazy(() => import("./pages/AdminPanel/Banners/Website/Service"));

const AdminBookings = lazy(() => import("./pages/AdminPanel/bookingDetails/BookingDetails"));
const Bookings = lazy(() => import("./pages/AdminPanel/bookings/Bookings"));
const Cms = lazy(() => import("./pages/AdminPanel/cms/Cms"));
const AdminOrders = lazy(() => import("./pages/AdminPanel/orderDetails/OrderDetails"));

const Orders = lazy(() => import("./pages/AdminPanel/orders/Orders"));
const SellerAssignedOrders = lazy(() => import("./pages/AdminPanel/seller-assigned-orders/SellerAssignedOrders"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const ProductInfo = lazy(() => import("./components/product-info-modal/ProductInfo"));
const UnautorizedModal = lazy(() => import("./components/unautorized-modal/UnautorizedModal"));
const HelpCenterTicketDetails = lazy(() => import("./pages/AdminPanel/helpCenter/HelpCenterTicketDetails"));
const Reviews = lazy(() => import("./pages/AdminPanel/reviews/Reviews"));
const SendNotifications = lazy(() => import("./pages/AdminPanel/SendNotifications"));
const MangageComision = lazy(() => import("./pages/AdminPanel/settings/MangageComision"));
const Settings = lazy(() => import("./pages/AdminPanel/settings/Settings"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const BlogsCategory = lazy(() => import("./pages/blog/BlogsCategory"));
const SingleBlog = lazy(() => import("./pages/blog/each-blogs"));
const DeleteAccount = lazy(() => import("./pages/delete-account/DeleteAccount"));
const MyProfile = lazy(() => import("./pages/my-profile/MyProfile"));
const WhyUs = lazy(() => import("./pages/whyus/WhyUs"));

function App() {
  const { location } = useGeolocation();
  const dispatch = useDispatch();
  (async () => {
    await dispatch(getCartDetails());
  })()

  const { isOpen } = useSelector((state) => state.auth);
  console.log("env var ==>", import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY);

  const { res, fetchData } = useGetApiReq();
  const { res: refreshRes, fetchData: fetchRefreshData, } = usePostApiReq();
  const { res: logoutRes, fetchData: fetchLogoutData, } = usePostApiReq();

  const { res: res1, fetchData: fetchData1 } = useGetApiReq();
  const { res: refreshRes1, fetchData: fetchRefreshData1, } = usePostApiReq();
  const { res: logoutRes1, fetchData: fetchLogoutData1, } = usePostApiReq();

  const getStatus = () => {
    fetchData("/shopping/status");
  }

  const token = readCookie("userInfo");
  const adminInfo = readCookie("adminInfo");
  console.log("token", token);

  const refreshToken = () => {
    fetchRefreshData("/shopping/refresh");
  }

  const logout = () => {
    fetchLogoutData("/shopping/logout-all", { phone: token?.phone, role: "user" });
  }

  useEffect(() => {
    token?.role === "user" && getStatus();
  }, [])

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      dispatch(changeUserAuthStatus({ isAuthenticated: res?.data?.isAuthenticated }))
      console.log("status response", res);
      res?.data?.shouldLogOut && logout();
      !res?.data?.isAuthenticated && !res?.data?.shouldLogOut && refreshToken();
    }
  }, [res])


  useEffect(() => {
    if (refreshRes?.status === 200 || refreshRes?.status === 201) {
      console.log("refreshRes", refreshRes);
      dispatch(changeUserAuthStatus({ isAuthenticated: true }))
      // window.location.reload();
    }
  }, [refreshRes])

  useEffect(() => {
    if (logoutRes?.status === 200 || logoutRes?.status === 201) {
      console.log("logoutRes", logoutRes);
      dispatch(changeUserAuthStatus({ isAuthenticated: false }))
    }
  }, [logoutRes])


  // admin 
  const getAdminStatus = () => {
    fetchData1("/admin/status");
  }

  const refreshAdminToken = () => {
    fetchRefreshData1("/admin/refresh");
  }

  const logoutAdmin = () => {
    fetchLogoutData1("/admin/logout-all", { adminId: adminInfo?.id, role: "admin" });
  }

  useEffect(() => {
    adminInfo?.role === "admin" && getAdminStatus();
  }, [])

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      dispatch(changeAdminStatus({ isAdminAuthenticated: res1?.data?.isAuthenticated }))
      console.log("status response admin", res1);
      res1?.data?.shouldLogOut && logoutAdmin();
      !res1?.data?.isAuthenticated && !res1?.data?.shouldLogOut && refreshAdminToken();
    }
  }, [res1])


  useEffect(() => {
    if (refreshRes1?.status === 200 || refreshRes1?.status === 201) {
      console.log("refreshRes1", refreshRes1);
      dispatch(changeAdminStatus({ isAdminAuthenticated: true }))
    }
  }, [refreshRes1])

  useEffect(() => {
    if (logoutRes1?.status === 200 || logoutRes1?.status === 201) {
      console.log("logoutRes1", logoutRes1);
      dispatch(changeAdminStatus({ isAdminAuthenticated: false }))
    }
  }, [logoutRes1])

  return (
    <>
      {isOpen && <UnautorizedModal />}

      <Router>
        <Suspense fallback={<div className='fallback'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/why-us" element={<WhyUs />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/single-blog/:id" element={<SingleBlog />} />
            <Route path="/blog-category/:id" element={<BlogsCategory />} />

            <Route path="/termsAndConditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/antiDiscriminationPolicy"
              element={<AntiDiscriminationPolicy />}
            />

            <Route
              path="/registerAsProfessionals"
              element={<RegisterAsAProfessional />}
            />

            <Route path="/services/:serviceId" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/help_center" element={<HelpCenter />} />
              <Route path="/my_bookings" element={<MyBookings />} />
              <Route path="/my_bookings/:id" element={<BookingDetails />} />
              <Route path="/my_profile" element={<MyProfile />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/delete-account" element={<DeleteAccount />} />
            </Route>

            {/* Admin Panel Routes */}

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<PrivateRoute />}>
              <Route path="/admin/dashboard" exact element={<Dashboard />} />

              <Route path="/admin/banners" exact element={<Banner />} />
              <Route path="/admin/banners/app" exact element={<AppBanner />} />
              <Route path="/admin/banners/app/home" exact element={<Home />} />
              <Route
                path="/admin/banners/app/category"
                exact
                element={<Category />}
              />
              <Route
                path="/admin/banners/app/service"
                exact
                element={<Service />}
              />
              <Route
                path="/admin/banners/app/product"
                exact
                element={<Product />}
              />

              <Route
                path="/admin/banners/web"
                exact
                element={<WebsiteBanner />}
              />
              <Route path="/admin/banners/web/home" exact element={<WebHome />} />
              <Route
                path="/admin/banners/web/category"
                exact
                element={<WebCategory />}
              />
              <Route
                path="/admin/banners/web/service"
                exact
                element={<WebService />}
              />
              <Route
                path="/admin/banners/web/product"
                exact
                element={<WebProduct />}
              />

              <Route path="/admin/cms" exact element={<Cms />} />
              <Route
                path="/admin/cms/privacy-policy"
                exact
                element={<AdminPrivacyPolicy />}
              />
              <Route
                path="/admin/cms/about-us"
                exact
                element={<AdminAboutUs />}
              />
              <Route
                path="/admin/cms/contact-us"
                exact
                element={<AdminContactUs />}
              />

              <Route
                path="/admin/banners/website"
                exact
                element={<WebsiteBanner />}
              />

              <Route path="/admin/bookings" element={<Bookings />} />
              <Route path="/admin/bookings/:id" element={<AdminBookings />} />

              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/orders/:id" element={<AdminOrders />} />

              <Route path="/admin/partners" element={<Partners />} />
              <Route
                path="/admin/partners/:partnerId"
                element={<SellerAssignedOrders />}
              />

              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/services" element={<Services />} />
              <Route path="/admin/payments" element={<Payments />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/settings/manage-comision" element={<MangageComision />} />
              <Route path="/admin/reviews" element={<Reviews />} />

              <Route
                path="/admin/services/:categoryId"
                element={<CategoryServices />}
              />
              <Route
                path="/admin/services/:categoryId/product/:serviceId"
                element={<ServiceInfoPage />}
              />
              <Route
                path="/admin/services/:categoryId/product/:serviceId/info"
                element={<ProductInfo />}
              />

              <Route path="/admin/enquiries" element={<Enquiry />} />
              <Route path="/admin/offers" element={<Offers />} />
              <Route
                path="/admin/available-cities"
                element={<AvailableCities />}
              />
              <Route path="/admin/help-center" element={<AdminHelpCenter />} />
              <Route
                path="/admin/help-center/faqs"
                element={<HelpCenterFaqs />}
              />
              <Route
                path="/admin/help-center/tickets"
                element={<HelpCenterTickets />}
              />
              <Route
                path="/admin/help-center/tickets/:ticketId"
                element={<HelpCenterTicketDetails />}
              />
              <Route path="/admin/send-notifications" element={<SendNotifications />} />
            </Route>

            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
      {/* <Toaster /> */}
    </>
  );
}


export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
})(App);

// export default App;

