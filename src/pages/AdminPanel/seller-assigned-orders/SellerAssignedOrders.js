import axios from 'axios';
import Wrapper from '../../Wrapper'

import classes from "../Shared.module.css";
import sellerAssignedOrdersClasses from "./SellerAssignedOrders.module.css";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import SellerOrderInfoModal from '../../../components/seller-info-modal/SellerOrderInfoModal';
import { RiWalletLine } from "react-icons/ri";
import WalletViewModal from '../../../components/wallet-view-modal/WalletViewModal';
import CashOutReq from '../../../components/cash-out-req/CashOutReq';

const SellerAssignedOrders = () => {
    const [sellerOrders, setSellerOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [sellerOrder, setSellerOrder] = useState({})
    const [sellerOrderInfoModal, setSellerOrderInfoModal] = useState(false);
    const [isViewWalletModalOpen, setIsViewWalletModalOpen] = useState(false);

    const params = useParams()
    const navigate = useNavigate()
    const { state } = useLocation();



    const getSellerOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-seller-order-list/${params.partnerId}`, { withCredentials: true });
            setIsLoading(false);
            setSellerOrders(data.sellerOrders);
            console.log("seller orders", data);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getSellerOrders();
    }, [])

    const handleChange = async (e) => {
        setStatus(e.target.value);
        if (e.target.value === "") {
            getSellerOrders();
            return;
        }
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_ADMIN_API_URL}/get-seller-order-by-status/${params.partnerId}`,
                { status: e.target.value },
                { withCredentials: true }
            );
            setSellerOrders(data.sellerOrders);
            console.log("order by status", data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSellerOrderInfoModal = (data) => {
        setSellerOrder(data);
        setSellerOrderInfoModal(true);
    }


    return (
        <>
            <Wrapper>
                <div>
                    <h2 className={sellerAssignedOrdersClasses.h2}>Seller Info</h2>
                    <div>
                        <div className={sellerAssignedOrdersClasses.contianer}>
                            <p><b>Name:</b> {state?.name}</p>
                            <p><b>Gst Number:</b> {state.gstNumber}</p>
                            <p><b>Phone</b>: {state.phone}</p>
                            <p><b>Legal Name:</b> {state.legalName}</p>
                            <p><b>Status:</b> {state.status ? "Active" : "InActive"}</p>
                            <p><b>Address:</b> {`${state.address.addressLine}, ${state.address.city}, ${state.address.state}, ${state.address.pincode}`}</p>
                            <p className={classes.mt}><b>Contact Person Email:</b> <span style={{ textDecoration: "underline" }}>{state.contactPerson.email}</span></p>
                            <p><b>Contact Person Name:</b> {state.contactPerson.name}</p>
                            <p><b>Contact Person Phone:</b> {state.contactPerson.phone}</p>
                            <p><b>Category</b>: {state.categoryId.name}</p>
                            <p className={sellerAssignedOrdersClasses.service_container}><b>Services</b>: {state.services.map((service) => <span className={sellerAssignedOrdersClasses.status}>{service.serviceId.name}</span>)}</p>
                        </div>
                    </div>

                    <div className={sellerAssignedOrdersClasses.flex} style={{ marginBottom: "30px" }}>
                        <div className={sellerAssignedOrdersClasses["reportContainer"]}>
                            <div className={classes["report-header"]}>
                                <h1 className={classes["recent-Articles"]}>Seller Assigned Orders</h1>
                                <select
                                    onChange={handleChange}
                                    value={status}
                                    className={classes.select}
                                    name="status"
                                    id="status"
                                >
                                    <option value="">Select</option>
                                    <option value="alloted">Alloted</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className={sellerAssignedOrdersClasses["report-body"]}>
                                <div className={sellerAssignedOrdersClasses["report-topic-heading"]}>
                                    <h3 className={classes["t-op"]} style={{ width: "210px" }}>Order Id</h3>
                                    <h3 className={classes["t-op"]} style={{ width: "110px" }}>Order Value</h3>
                                    <h3 className={classes["t-op"]}>Status</h3>
                                    <h3 className={classes["t-op"]}>Details</h3>
                                </div>
                                {isLoading && <Loader />}

                                <div className={classes.items}>
                                    {!isLoading
                                        && sellerOrders.length === 0
                                        && <p>No seller order found</p>
                                    }

                                    {sellerOrders?.map((order) => (
                                        <div key={order._id} className={sellerAssignedOrdersClasses.item1}>
                                            <h3 className={classes["t-op-nextlvl"]}>{order._id}</h3>
                                            <h3 className={classes["t-op-nextlvl"]} style={{ width: "110px", textAlign: "center" }}>{order.orderValue}</h3>
                                            <h3 className={`${classes["t-op-nextlvl"]} ${sellerAssignedOrdersClasses.status}`}>{order.status}</h3>
                                            <button onClick={() => handleSellerOrderInfoModal(order)} className={classes.button} style={{ color: "#2599ff" }}>View Details</button>
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>
                        <div className={sellerAssignedOrdersClasses["reportContainer"]}>
                            <div className={sellerAssignedOrdersClasses.d_flex}>
                                <div className={sellerAssignedOrdersClasses.left}>
                                    <h3 className={sellerAssignedOrdersClasses.h3}><RiWalletLine size={50} /> Wallet</h3>
                                    <div className={sellerAssignedOrdersClasses.d_flex}>
                                        <h4>Balance</h4>
                                        <p>₹ 4000</p>
                                    </div>
                                </div>
                                <div className={sellerAssignedOrdersClasses.right}>
                                    <button onClick={() => setIsViewWalletModalOpen(true)} className={sellerAssignedOrdersClasses.button}>View Wallet</button>
                                </div>
                            </div>
                            <button className={sellerAssignedOrdersClasses.cash_btn}>Cashout Request</button>
                            <div className={sellerAssignedOrdersClasses.tran_contianer}>
                                {/* <CashOutReq /> */}
                            </div>

                        </div>
                    </div>

                </div>
            </Wrapper>
            {sellerOrderInfoModal &&
                <SellerOrderInfoModal
                    setSellerOrderInfoModal={setSellerOrderInfoModal}
                    sellerOrder={sellerOrder}
                />
            }

            {isViewWalletModalOpen &&
                <WalletViewModal
                    setIsViewWalletModalOpen={setIsViewWalletModalOpen}
                />
            }
        </>
    )
}

export default SellerAssignedOrders