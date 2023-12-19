import unapprovedSellerModalClasses from './MonthlyOrderModal.module.css';
import classes from '../../pages/AdminPanel/Shared.module.css';
import { RxCross2 } from 'react-icons/rx';
import Spreadsheet from "react-spreadsheet";
import { format } from 'date-fns';
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { useRef } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

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
                    <ExcelExport data={data} ref={_export}>
                        <Grid
                            style={{
                                height: "420px",
                            }}
                            data={data}
                        >
                            <GridColumn field="OrderId" title="Order ID" width="50px" />
                            <GridColumn field="date" title="Order Date" width="50px" />
                            <GridColumn field="orderValue" title="Order Value" width="50px" />
                        </Grid>
                    </ExcelExport>
                    {/* <Spreadsheet data={data} columnLabels={["OrderId", "Order Date", "Order Quantity", "Total Value", "Order Time", "User Name", "User Mobile"]} /> */}
                    <button onClick={excelExport}>Download</button>
                </div>
            </div>
        </div>
    )
}

export default MonthlyOrderModal