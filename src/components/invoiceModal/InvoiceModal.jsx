import classes from './InvoiceModal.module.css';

import logo from '../../assets/Main Logo V1-02.png';
import { FaXmark } from 'react-icons/fa6';

import html2PDF from 'jspdf-html2canvas';
import { format } from 'date-fns';

const InvoiceModal = ({ setIsInvoiceModalOpen, services, subtotal, taxRate, total, invoiceNumber, invoiceDate, state }) => {
    const downloadInvoice = () => {
        html2PDF(document.querySelector("#invoice_box"), {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf'
        });
    }


    return (
        <div className={classes.container}>
            <div className={classes.invoice_box_wrapper}>
                <FaXmark onClick={() => setIsInvoiceModalOpen(false)} className={classes.icon} />
                <div className={classes.invoice_box} id='invoice_box'>
                    <div className={classes.invoice_top}>
                        <div className={classes.invoice_top_left}>
                            <img className={classes.logo} src={logo} alt="logo" />
                            <div className={classes.info}>
                                <b>From</b>
                                <h3 className={classes.h3}>Company</h3>
                                <p className={classes.p}>Name</p>
                                <p className={classes.p}>email@gmail.com</p>
                                <p className={classes.p}>1234567890</p>
                                <p className={classes.p}>address</p>
                            </div>
                        </div>
                        <div className={classes.invoice_top_right}>
                            <h1 className={classes.h1}>Invoice</h1>
                            <div className={classes.invoice_detail}>
                                <div className={classes.invoice_detail_left}>
                                    <p className={classes.p}>Invoice No</p>
                                    <p className={classes.p}>Invoice Date</p>
                                </div>
                                <div className={classes.invoice_detail_left}>
                                    <p className={classes.p}># {"invoiceNumber"}</p>
                                    {/* <p className={classes.p}>{invoiceDate && format(new Date(invoiceDate), 'dd-MM-yyyy')}</p> */}
                                </div>
                            </div>
                            <b>Bill to</b>
                            <h3 className={classes.h3}>{"state.companyName"}</h3>
                            <p className={classes.p}>{"state.email"}</p>
                            <p className={classes.p}>{"state.phone"}</p>
                            {/* <p className={classes.p}>{`${state.address.houseNumber} ${state.address.streetName} ${state.address.city}, ${state.address.country}, ${state.address.zipCode}`}</p> */}
                        </div>
                    </div>
                    <div className={classes.invoice_bottom}>
                        <div className={classes.table_wrapper}>
                            <table className="">
                                <thead>
                                    <tr className={classes.tr}>
                                        <th className={classes.ml}>Service Name</th>
                                        <th className={classes.ml}>Description</th>
                                        <th className={classes.ml}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {services.map((service, i) => (
                                        <tr key={i} className={classes.tr}>
                                            <td className={classes.ml}>
                                                <p>{service.serviceName}</p>
                                            </td>
                                            <td className={classes.ml}>
                                                <p>{service.desccription}</p>
                                            </td>
                                            <td className={classes.ml}>
                                                <p>₹ {service.price}</p>
                                            </td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.invoice_bottom_calculation}>
                            <div className={classes.invoice_bottom_calculation_left}>
                                <div className={classes.d_flex}>
                                    <b>Subtotal:</b>
                                    <p>₹ {"subtotal"}</p>
                                </div>
                                <div className={classes.d_flex}>
                                    <b>Tax Rate:</b>
                                    <p>{"taxRate"} %</p>
                                </div>
                                <div className={classes.d_flex}>
                                    <b>Total:</b>
                                    <p>₹ {"total"}</p>
                                </div>
                            </div>
                        </div>
                        {/* <p className={classes.p}>{state.note}</p> */}
                    </div>
                </div>
                    <div className={classes.button_wrapper}>
                        <button onClick={downloadInvoice} className={classes.button}>Download Invoice</button>
                    </div>
            </div>
        </div>
    )
}

export default InvoiceModal