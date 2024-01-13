
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";


import HomePage from './pages/Home';
import AboutUs from './pages/aboutUs/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import PrivacyPolicy from './pages/privacy&policy/Privacy&Policy';
import ProductPage from './pages/productPage/ProductPage';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
import RegisterAsAProfessional from './pages/registerAsAProfessional/RegisterAsAProfessional';
import TermsAndConditions from "./pages/termsAndConditions/TermsAndConditions";
import { Toaster } from "react-hot-toast";
import { GoogleApiWrapper } from "google-maps-react";


import HelpCenter from "./pages/helpCenter/HelpCenter";
import MyBookings from "./pages/myBookings/MyBookings";
import SuccessPage from "./pages/successPage/SuccessPage";

import AntiDiscriminationPolicy from "./pages/antiDiscriminationPolicy/AntiDiscriminationPolicy";
import useGeolocation from "./hooks/usegelocation";
import BookingDetails from "./pages/bookingDetails/BookingDetails";


// Admin route imports
import AdminPrivacyPolicy from './pages/AdminPanel/cms/privacy-policy/PrivacyPolicy';
import AdminAboutUs from './pages/AdminPanel/cms/about-us/AboutUs';
import AdminContactUs from './pages/AdminPanel/cms/contact-us/ContactUs';
import Dashboard from "./pages/AdminPanel/Dashboard";
import Partners from "./pages/AdminPanel/Partners";
import Customers from "./pages/AdminPanel/Customers";
import Services from "./pages/AdminPanel/Services";
import Payments from "./pages/AdminPanel/Payments";
import CategoryServices from "./pages/AdminPanel/CategoryServices/CategoryServices";
import ServiceInfoPage from "./pages/AdminPanel/serviceInfoPage/ServiceInfoPage";
import Enquiry from "./pages/AdminPanel/Inquiry";
import Offers from "./pages/AdminPanel/offers/Offers";
import AvailableCities from "./pages/AdminPanel/availableCities/AvailableCities";
import AdminHelpCenter from "./pages/AdminPanel/helpCenter/HelpCenter";
import HelpCenterFaqs from "./pages/AdminPanel/helpCenter/HelpCenterFaqs";
import HelpCenterTickets from "./pages/AdminPanel/helpCenter/HelpCenterTickets";
import AdminLogin from "./pages/AdminPanel/AdminLogin"

import Banner from "./pages/AdminPanel/Banners/Banner";
import AppBanner from "./pages/AdminPanel/Banners/AppBanner";
import WebsiteBanner from "./pages/AdminPanel/Banners/WebsiteBanner";

import Home from "./pages/AdminPanel/Banners/App/Home";
import Category from "./pages/AdminPanel/Banners/App/Category";
import Product from "./pages/AdminPanel/Banners/App/Product";
import Service from "./pages/AdminPanel/Banners/App/Service";

import WebHome from "./pages/AdminPanel/Banners/Website/Home";
import WebCategory from "./pages/AdminPanel/Banners/Website/Category";
import WebProduct from "./pages/AdminPanel/Banners/Website/Product";
import WebService from "./pages/AdminPanel/Banners/Website/Service";

import Cms from "./pages/AdminPanel/cms/Cms";
import Bookings from "./pages/AdminPanel/bookings/Bookings";
import AdminBookings from "./pages/AdminPanel/bookingDetails/BookingDetails";
import AdminOrders from "./pages/AdminPanel/orderDetails/OrderDetails";

import { getCartDetails } from "./store/slices/cartSlice";
import ErrorPage from "./pages/ErrorPage";
import Orders from "./pages/AdminPanel/orders/Orders";
import SellerAssignedOrders from "./pages/AdminPanel/seller-assigned-orders/SellerAssignedOrders";

import Blog from "./pages/blog/Blog";
import SingleBlog from "./pages/blog/each-blogs";
import BlogsCategory from "./pages/blog/BlogsCategory";



function App() {
  const { location } = useGeolocation();
  const dispatch = useDispatch();
  (async () => {
    await dispatch(getCartDetails());
  })()



  return (
    <>

      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />

          <Route path="/blog" element={<Blog />} />
          <Route path='/single-blog/:id' element={<SingleBlog/>}/>
          <Route path='/blog-category/:id' element={<BlogsCategory/>}/>

          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/antiDiscriminationPolicy" element={<AntiDiscriminationPolicy />} />

          <Route path="/registerAsProfessionals" element={<RegisterAsAProfessional />} />

          <Route path="/services/:serviceId" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/help_center" element={<HelpCenter />} />
          <Route path="/my_bookings" element={<MyBookings />} />
          <Route path="/my_bookings/:id" element={<BookingDetails />} />

          <Route path="/success" element={<SuccessPage />} />


          {/* Admin Panel Routes */}

          <Route path="/admin/login" element={<AdminLogin />} />
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

          <Route path="/admin/banners/web" exact element={<WebsiteBanner />} />
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
          <Route path="/admin/cms/about-us" exact element={<AdminAboutUs />} />
          <Route path="/admin/cms/contact-us" exact element={<AdminContactUs />} />

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
          <Route path="/admin/partners/:partnerId" element={<SellerAssignedOrders />} />

          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/payments" element={<Payments />} />

          <Route
            path="/admin/services/:categoryId"
            element={<CategoryServices />}
          />
          <Route
            path="/admin/services/:categoryId/product/:serviceId"
            element={<ServiceInfoPage />}
          />

          <Route path="/admin/enquiries" element={<Enquiry />} />
          <Route path="/admin/offers" element={<Offers />} />
          <Route path="/admin/available-cities" element={<AvailableCities />} />
          <Route path="/admin/help-center" element={<AdminHelpCenter />} />
          <Route path="/admin/help-center/faqs" element={<HelpCenterFaqs />} />
          <Route
            path="/admin/help-center/tickets"
            element={<HelpCenterTickets />}
          />

          <Route path="/*" element={<ErrorPage />} />

        </Routes>
      </Router>
      <Toaster />
    </>
  );
}


// export default GoogleApiWrapper({
//   apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
// })(App);

export default App;

