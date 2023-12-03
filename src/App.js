import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import { Provider } from "react-redux";
import { store } from "./store/store";
import HelpCenter from "./pages/HelpCenter";
import MyBookings from "./pages/MyBookings";

function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/termsAndConditions" element={<TermsAndConditions />} />
            <Route path="/privacy&policy" element={<PrivacyPolicy />} />
            <Route path="/services/:serviceId" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/registerAsProfessionals" element={<RegisterAsAProfessional />} />
            <Route path="/help_center" element={<HelpCenter />} />
            <Route path="/my_bookings" element={<MyBookings />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
      <Toaster />
    </>
  );
}

export default App;
