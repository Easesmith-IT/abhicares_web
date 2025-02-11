import { AiOutlineClose } from 'react-icons/ai'
import classes from './RaiseTicketModal.module.css'
import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { readCookie } from '../../utils/readCookie'
import usePostApiReq from '../../hooks/usePostApiReq'

const RaiseTicketModal = ({ isAddTicketModalOpen, setIsAddTicketModalOpen, booking, item }) => {
    const { res: raiseTicketRes, fetchData: raiseTicket, isLoading: raiseTicketLoading } = usePostApiReq();
    const token = readCookie("userInfo");
    const userId = token?.id;

    console.log("booking", booking);


    const [ticketInfo, setTicketInfo] = useState({
        issue: "",
        description: "",
        userId: userId,
        sellerId: booking?.bookingId?.sellerId || "",
        raisedBy: "customer",
        bookingId: item?.bookingId?._id || "",
        serviceType: item?.product ? item?.product?.serviceId?.categoryId : item?.package?.serviceId?.categoryId || "",
        ticketType: "Booking",
        serviceId: item?.product ? item?.product?.serviceId?._id : item?.package?.serviceId?._id || "",
        date: format(new Date(), "dd/MM/yyyy")
    });

    console.log("ticketInfo", ticketInfo);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTicketInfo({ ...ticketInfo, [name]: value });
    }

    const handleAddTicket = async () => {
        if (!ticketInfo.issue || !ticketInfo.description) {
            toast.error("All fields are required");
            return;
        }

        raiseTicket("/shopping/raise-ticket", ticketInfo);
    }

    useEffect(() => {
        if (raiseTicketRes?.status === 200 || raiseTicketRes?.status === 201) {
            setIsAddTicketModalOpen(false);
            toast.success("Ticket raised successfully");
        }
    }, [raiseTicketRes])


    return (
        <div
            className={`${classes.modal_overlay} ${isAddTicketModalOpen ? classes.modal_open : classes.modal_close}`}
        >
            <div className={classes.modal_wrapper}>
                <button
                    onClick={() => setIsAddTicketModalOpen(false)}
                    className={classes.modal_close}
                >
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal}>
                    <p className={classes.p}>Raised Ticket</p>
                    <div className={classes.mt}>
                        <label htmlFor="description">Description</label>
                        <div className={classes.input_box}>
                            <input
                                className={classes.input}
                                onChange={handleOnChange}
                                value={ticketInfo.description}
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Enter your description"
                            />
                        </div>
                    </div>

                    {/* Issue Field */}
                    <div className={classes.mt}>
                        <label htmlFor="issue">Issue</label>
                        <div className={classes.input_box}>
                            <input
                                className={classes.input}
                                onChange={handleOnChange}
                                value={ticketInfo.issue}
                                type="text"
                                name="issue"
                                id="issue"
                                placeholder="Enter the issue"
                            />
                        </div>
                    </div>

                    <button onClick={handleAddTicket} className={classes.button}>
                        {raiseTicketLoading ? "Loading..." : " Proceed"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RaiseTicketModal