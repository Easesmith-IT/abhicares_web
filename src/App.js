import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { changeUserStatus } from "./store/slices/userSlice";
import { useDispatch } from "react-redux";

import {useEffect} from 'react';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import HomePage from './pages/Home';
import AboutUs from './pages/aboutUs/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import PrivacyPolicy from './pages/privacy&policy/Privacy&Policy';
import ProductPage from './pages/productPage/ProductPage';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
import RegisterAsAProfessional from './pages/registerAsAProfessional/RegisterAsAProfessional';
import TermsAndConditions from "./pages/termsAndConditions/TermsAndConditions";
import { Toaster } from "react-hot-toast";


import HelpCenter from "./pages/HelpCenter";
import MyBookings from "./pages/myBookings/MyBookings";
import SuccessPage from "./pages/successPage/SuccessPage";

import AntiDiscriminationPolicy from "./pages/antiDiscriminationPolicy/AntiDiscriminationPolicy";
import useGeolocation from "./hooks/usegelocation";


function App() {
  const {  location } = useGeolocation();

  // console.log("APP.JS", location);

  return (
    <>
   
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />

            <Route path="/termsAndConditions" element={<TermsAndConditions />} />
            <Route path="/privacy&policy" element={<PrivacyPolicy />} />
            <Route path="/antiDiscriminationPolicy" element={<AntiDiscriminationPolicy />} />

            <Route path="/registerAsProfessionals" element={<RegisterAsAProfessional />} />

            <Route path="/services/:serviceId" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/help_center" element={<HelpCenter />} />
            <Route path="/my_bookings" element={<MyBookings />} />

            <Route path="/success" element={<SuccessPage />} />
          </Routes>
          <Footer />
        </Router>
      <Toaster />
    </>
  );
}

export default App;


  // const userId = useSelector(state => state.user.userId);;