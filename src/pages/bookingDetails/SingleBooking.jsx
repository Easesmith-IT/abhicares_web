import { format } from "date-fns";
import React, { useState } from "react";
import RaiseTicketModal from "../../components/raiseTicketModal/RaiseTicketModal";
import AddReviewModal from "../../components/reviewModal/AddReviewModal";
import classes from "./BookingDetails.module.css";
import sharedClasses from "../AdminPanel/Shared.module.css";

const SingleBooking = ({ item, booking }) => {
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);

  console.log("singleBooking", booking);
  console.log("item", item);

  return (
    <>
      <div className={classes.product}>
        <div>
          <img
            className={classes.img}
            src={`${import.meta.env.VITE_APP_IMAGE_URL}/${
              item.package ? item.package.imageUrl[0] : item.product.imageUrl[0]
            }`}
            alt=""
          />
          <small>Type:{item.package ? "Package" : "Product"}</small>
        </div>
        <div className={classes.info}>
          <h5>{item.package ? item.package.name : item.product.name}</h5>
          <div>
            <p>
              <span>Delivery Date: </span>
              {item.bookingId.bookingDate &&
                format(new Date(item.bookingId.bookingDate), "dd-MM-yyyy")}
            </p>
            <p>
              <span>Delivery Time: </span>
              {item.bookingId.bookingTime &&
                format(new Date(item.bookingId.bookingTime), "hh:mm aa")}
            </p>
          </div>
          <p>Qty: {item.quantity}</p>
          <p>
            <span
              className={`${sharedClasses["t-op-nextlvl"]} ${
                sharedClasses.status
              } ${
                item?.bookingId?.status === "cancelled"
                  ? sharedClasses.Cancelled
                  : item?.bookingId?.status === "completed"
                  ? sharedClasses.Completed
                  : item?.bookingId?.status === "alloted"
                  ? sharedClasses.alloted
                  : sharedClasses.OutOfDelivery
              }`}
            >
              {item?.bookingId?.status}
            </span>
          </p>
          <p>
            ₹
            {Number(
              item.package ? item.package.offerPrice : item.product.offerPrice
            ) * Number(item.quantity)}
          </p>
          {/* <div
            style={{ display: "flex", gap: "20px" }}
          > */}
          <button
            onClick={() => setIsAddReviewModalOpen(true)}
            className={classes.button}
          >
            Add Review
          </button>
          <button
            onClick={() => setIsAddTicketModalOpen(true)}
            className={classes.link}
          >
            Issue with order?
          </button>
          {/* </div> */}
        </div>
      </div>

      {isAddReviewModalOpen && (
        <AddReviewModal
          isReviewModalOpen={isAddReviewModalOpen}
          setIsReviewModalOpen={setIsAddReviewModalOpen}
          isBooking
          bookingId={item?.bookingId?._id}
          serviceId={item.package ? item.package._id : item.product._id}
          serviceType={item.package ? "package" : "product"}
          getAllReviewsOfUser={() => {}}
        />
      )}

      {isAddTicketModalOpen && (
        <RaiseTicketModal
          isAddTicketModalOpen={isAddTicketModalOpen}
          setIsAddTicketModalOpen={setIsAddTicketModalOpen}
          booking={booking}
          item={item}
        />
      )}
    </>
  );
};

export default SingleBooking;
