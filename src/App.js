import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import HomePage from './pages/Home';
import AboutUs from './pages/aboutUs/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import ProductPage from './pages/productPage/ProductPage';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
import RegisterAsAProfessional from './pages/registerAsAProfessional/RegisterAsAProfessional';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/registerAsProfessionals" element={<RegisterAsAProfessional />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
