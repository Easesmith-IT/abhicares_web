import React from "react";
import { Link } from "react-router-dom";

import ServiceIcn from "../../../assets/admin-panel/services-icon.png";
import PaymentsIcn from "../../../assets/admin-panel/bank-icon.png";
import DashboardIcn from "../../../assets/admin-panel/dashboard-icon.png";
import PartnersIcn from "../../../assets/admin-panel/partners-icon.png";
import CustomersIcn from "../../../assets/admin-panel/customer-icon.png";
import OffersIcn from "../../../assets/admin-panel/offer-icon.png";

import classes from "../Shared.module.css";

import { MdAnnouncement, MdCategory, MdFeedback, MdHelpOutline, MdNotifications, MdPayment, MdSettings } from 'react-icons/md';
import { FaCalendarCheck, FaLifeRing, FaQuestionCircle, FaRegImages, FaShoppingCart } from "react-icons/fa";
import { GiWorld } from 'react-icons/gi';
import { AiOutlineCustomerService } from "react-icons/ai";

const SideNav = () => {
  const permissions = JSON.parse(localStorage.getItem("perm"));
  // {permissions.dashboard!=='none' && }
  return (
    <nav className={classes.nav}>
      <div className={classes["nav-upper-options"]}>
        {permissions.dashboard && permissions.dashboard !== "none" && (
          <Link
            to="/admin/dashboard"
            className={`${classes["nav-option"]} ${classes.option1}}`}
          >
            <img
              src={DashboardIcn}
              alt="dashboard"
              className={classes["nav-img"]}
            />
            <h3 className={classes.title}>Dashboard</h3>
          </Link>
        )}

        {permissions.banners && permissions.banners !== "none" && (
          <Link
            to="/admin/banners"
            className={`${classes["nav-option"]} ${classes.option1}}`}
          >
            {/* <img
              src={DashboardIcn}
              alt="banners"
              className={classes["nav-img"]}
            /> */}
            <FaRegImages size={30} />
            <h3 className={classes.title}>Banners</h3>
          </Link>
        )}

        {/* <Link
          to="/admin/cms"
          className={`${classes["nav-option"]} ${classes.option2}}`}
          >
          <img src={ServiceIcn} className={classes["nav-img"]} alt="cms" />
          
          <h3 className={classes.title}>CMS</h3>
          </Link> */}

        {permissions.orders && permissions.orders !== "none" && (
          <Link
            to="/admin/orders"
            className={`${classes["nav-option"]} ${classes.option2}}`}
          >
            <FaShoppingCart size={24} />
            {/* <img src={ServiceIcn} className={classes["nav-img"]} alt="orders" /> */}

            <h3 className={classes.title}>Orders</h3>
          </Link>
        )}

        {permissions.bookings && permissions.bookings !== "none" && (
          <Link
            to="/admin/bookings"
            className={`${classes["nav-option"]} ${classes.option2}}`}
          >
            <FaCalendarCheck size={24} />
            {/* <img
              src={ServiceIcn}
              className={classes["nav-img"]}
              alt="bookings"
              /> */}

            <h3 className={classes.title}>Bookings</h3>
          </Link>
        )}

        {permissions.services && permissions.services !== "none" && (
          <Link
            to="/admin/services"
            className={`${classes["nav-option"]} ${classes.option2}}`}
          >
            <MdCategory size={24} />
            {/* <img
              src={ServiceIcn}
              className={classes["nav-img"]}
              alt="services"
              /> */}

            <h3 className={classes.title}>Categories</h3>
          </Link>
        )}

        {permissions.partners && permissions.partners !== "none" && (
          <Link
            to="/admin/partners"
            className={`${classes["nav-option"]} ${classes.option3}}`}
          >
            <img
              src={PartnersIcn}
              alt="Partners"
              className={classes["nav-img"]}
            />
            <h3 className={classes.title}>Partners</h3>
          </Link>
        )}

        {permissions.customers && permissions.customers !== "none" && (
          <Link
            to="/admin/customers"
            className={`${classes["nav-option"]} ${classes.option4}}`}
          >
            <img
              src={CustomersIcn}
              alt="customers"
              className={classes["nav-img"]}
            />
            <h3 className={classes.title}>Customers</h3>
          </Link>
        )}

        {permissions.offers && permissions.offers !== "none" && (
          <Link
            to="/admin/offers"
            className={`${classes["nav-option"]} ${classes.option5}}`}
          >
            <img src={OffersIcn} alt="offers" className={classes["nav-img"]} />
            <h3 className={classes.title}>Offers</h3>
          </Link>
        )}

        {permissions.availableCities && permissions.availableCities !== "none" && (
          <Link
            to="/admin/available-cities"
            className={`${classes["nav-option"]} ${classes.option5}}`}
          >
            {/* <img src={OffersIcn} alt="offers" className={classes["nav-img"]} /> */}
            <GiWorld size={24} />

            <h3 className={classes.title}>Available Cities</h3>
          </Link>
        )}

        {permissions.payments && permissions.payments !== "none" && (
          <Link
            to="/admin/payments"
            className={`${classes["nav-option"]} ${classes.option6}}`}
          >
            <MdPayment size={24} />
            {/* <img
              src={PaymentsIcn}
              alt="payments"
              className={classes["nav-img"]}
              /> */}

            <h3 className={classes.title}>Payments</h3>
          </Link>
        )}

        {permissions.helpCenter && permissions.helpCenter !== "none" && (
          <Link
            to="/admin/help-center"
            className={`${classes["nav-option"]} ${classes.option6}}`}
          >
            <AiOutlineCustomerService size={24} />
            {/* <img
              src={PaymentsIcn}
              alt="help-center"
              className={classes["nav-img"]}
              /> */}

            <h3 className={classes.title}>Help Center</h3>
          </Link>
        )}

        {permissions.enquiry && permissions.enquiry !== "none" && (
          <Link
            to="/admin/enquiries"
            className={`${classes["nav-option"]} ${classes.option6}}`}
          >
            <FaQuestionCircle size={24} />
            {/* <img
              src={PaymentsIcn}
              alt="enquiries"
              className={classes["nav-img"]}
              /> */}

            <h3 className={classes.title}>Enquiries</h3>
          </Link>
        )}
        {permissions.settings && permissions.settings !== "none" && (
          <Link
            to="/admin/settings"
            className={`${classes["nav-option"]} ${classes.option6}}`}
          >
            <MdSettings size={24} />
            {/* <img
              src={PaymentsIcn}
              alt="settings"
              className={classes["nav-img"]}
              /> */}

            <h3 className={classes.title}>Settings</h3>
          </Link>
        )}
        {permissions.reviews && permissions.reviews !== "none" && (
          <Link
            to="/admin/reviews"
            className={`${classes["nav-option"]} ${classes.option6}}`}
          >
            <MdFeedback size={24} />
            {/* <img
              src={PaymentsIcn}
              alt="reviews"
              className={classes["nav-img"]}
              /> */}

            <h3 className={classes.title}>Reviews</h3>
          </Link>
        )}

        {permissions.notifications && permissions.notifications !== "none" && (
          <Link
            to="/admin/send-notifications"
            className={`${classes["nav-option"]} ${classes.option6}}`}
          >
            <MdNotifications style={{ fontSize: "40px" }} />

            <h3 className={classes.title}>Send Notifications</h3>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default SideNav;
