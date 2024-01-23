import monthlyOrderModalClasses from './MonthlyOrderModal.module.css';
import classes from '../../pages/AdminPanel/Shared.module.css';
import { RxCross2 } from 'react-icons/rx';
import { format } from 'date-fns';
import { useRef } from 'react';
import html2PDF from 'jspdf-html2canvas';

const MonthlyOrderModal = ({ setIsModalOpen, monthlyOrders }) => {


    const data = monthlyOrders.map((order) => [
        { OrderId: order._id },
        { date: format(new Date(order.createdAt), "dd-MM-yyyy") },
        { value: 0 },
        { orderValue: order.orderValue },
        { time: format(new Date(order.createdAt), "hh.mm aaaaa'm'") },
        { name: order.user.name },
        { phone: order.user.phone },
    ])


    const downloadInvoice = () => {
        html2PDF(document.querySelector("#table"), {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf'
        });
    }

    return (
        <div className={monthlyOrderModalClasses.wrapper}>
            <div className={monthlyOrderModalClasses.modal}>
                <div className={monthlyOrderModalClasses.heading_container}>
                    <h4>Monthly Orders</h4>
                    <div className={monthlyOrderModalClasses.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                {monthlyOrders.length === 0 && <p style={{padding:"0px 0px 20px 20px"}}>No orders found.</p>}

                {monthlyOrders.length > 0 &&
                    <div className={classes["report-body"]}>
                        <div id='table' className={monthlyOrderModalClasses.table_wrapper}>
                            <table border={"2px"} className={monthlyOrderModalClasses.table}>
                                <thead>
                                    <tr>
                                        <th>OrderId</th>
                                        <th>Order Date</th>
                                        <th>Total Value</th>
                                        <th>Order Time</th>
                                        <th>User Name</th>
                                        <th>User Mobile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyOrders.map((order) => (
                                        <tr>
                                            <td style={{ width: "210px", paddingInline: "10px" }}>{order._id}</td>
                                            <td style={{ width: "160px" }}>{format(new Date(order.createdAt), "dd-MM-yyyy")}</td>
                                            <td>{order.orderValue}</td>
                                            <td>{format(new Date(order.createdAt), "hh.mm aaaaa'm'")}</td>
                                            <td>{order.user.name}</td>
                                            <td>{order.user.phone}</td>
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

export default MonthlyOrderModal