import { format } from 'date-fns';
import html2PDF from 'jspdf-html2canvas';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import usePostApiReq from '../../hooks/usePostApiReq';
import classes from '../../pages/AdminPanel/Shared.module.css';
import monthlyOrderModalClasses from './MonthlyBookingModal.module.css';

const MonthlyBookingModal = ({ setIsModalOpen }) => {
    const { res: monthlyOrdersRes, fetchData: getMonthlyOrders, isLoading: monthlyOrdersLoading } = usePostApiReq();
    const [dateYearInfo, setDateYearInfo] = useState("");
    const [monthlyOrders, setMonthlyOrders] = useState([]);


    const downloadInvoice = () => {
        html2PDF(document.querySelector("#table"), {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf'
        });
    }

    const handleOnChange = (e) => {
        setDateYearInfo(e.target.value);
    };

    const handleOnSubmit = async () => {
        if (!dateYearInfo) {
            return;
        }
        const arr = dateYearInfo.split("-");
        getMonthlyOrders("/admin/get-monthly-bookings", {
            month: arr[1],
            year: arr[0],
        })
    };

    useEffect(() => {
        if (monthlyOrdersRes?.status === 200 || monthlyOrdersRes?.status === 201) {
            setIsModalOpen(true);
            setMonthlyOrders(monthlyOrdersRes?.data.data);
        }
    }, [monthlyOrdersRes])

    return (
        <div className={monthlyOrderModalClasses.wrapper}>
            <div className={monthlyOrderModalClasses.modal}>
                <div className={monthlyOrderModalClasses.heading_container}>
                    <h4>Monthly Bookings</h4>
                    <div className={monthlyOrderModalClasses.d_flex}>
                        <div className={classes.d_flex}>
                            <input
                                onChange={handleOnChange}
                                type="month"
                                name="month"
                                id="month"
                            />
                            <button onClick={handleOnSubmit}>{monthlyOrdersLoading ? "Loading..." : "Submit"}</button>
                        </div>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                {monthlyOrders.length === 0 && <p style={{ padding: "0px 0px 20px 20px" }}>No bookings found.</p>}

                {monthlyOrders.length > 0 &&
                    <div className={classes["report-body"]}>
                        <div id='table' className={monthlyOrderModalClasses.table_wrapper}>
                            <table border={"2px"} className={monthlyOrderModalClasses.table}>
                                <thead>
                                    <tr>
                                        <th>Booking Id</th>
                                        <th>Booking Date</th>
                                        <th>Delivery Date</th>
                                        <th>Total Value</th>
                                        <th>Booking Time</th>
                                        <th>User Name</th>
                                        <th>User Mobile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyOrders.map((booking) => (
                                        <tr>
                                            <td style={{ width: "210px", paddingInline: "10px" }}>{booking?.bookingId}</td>
                                            <td style={{ width: "160px" }}>{format(new Date(booking?.createdAt), "dd-MM-yyyy")}</td>
                                            <td style={{ width: "160px" }}>{format(new Date(booking?.bookingDate), "dd-MM-yyyy")}</td>
                                            <td>{booking?.itemTotalValue}</td>
                                            <td>{booking?.bookingTime && format(new Date(booking.bookingTime), "hh.mm aaaaa'm'")}</td>
                                            <td>{booking?.userId?.name}</td>
                                            <td>{booking?.userId?.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={monthlyOrderModalClasses.btn_container}>
                            <button className={monthlyOrderModalClasses.button} onClick={downloadInvoice}>Download</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default MonthlyBookingModal