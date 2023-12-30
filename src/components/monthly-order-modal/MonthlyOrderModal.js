import unapprovedSellerModalClasses from './MonthlyOrderModal.module.css';
import classes from '../../pages/AdminPanel/Shared.module.css';
import { RxCross2 } from 'react-icons/rx';
import { format } from 'date-fns';
import { useRef } from 'react';

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
    
    console.log("monthlyOrders",monthlyOrders);
    console.log("orders",data);

    const _export = useRef(null);
    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };


    return (
        <div className={unapprovedSellerModalClasses.wrapper}>
            <div className={unapprovedSellerModalClasses.modal}>
                <div className={unapprovedSellerModalClasses.heading_container}>
                    <h4>Monthly Orders</h4>
                    <div className={unapprovedSellerModalClasses.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <div className={classes["report-body"]}>
                    <table className=''>
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
                                    <td>{order._id }</td>
                                    <td>{format(new Date(order.createdAt), "dd-MM-yyyy")}</td>
                                    <td>{order.orderValue}</td>
                                    <td>{format(new Date(order.createdAt), "hh.mm aaaaa'm'")}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <Spreadsheet data={data} columnLabels={["OrderId", "Order Date", "Order Quantity", "Total Value", "Order Time", "User Name", "User Mobile"]} /> */}
                    <button onClick={excelExport}>Download</button>
                </div>
            </div>
        </div>
    )
}

export default MonthlyOrderModal