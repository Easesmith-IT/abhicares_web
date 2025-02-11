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
import usePostApiReq from '../../../hooks/usePostApiReq';

const SellerAssignedOrders = () => {
    const { res: orderbyStatusRes, fetchData: orderbyStatus, isLoading: orderbyStatusLoading } = usePostApiReq();
    const { res: updatePartnerStatusRes, fetchData: updatePartnerStatus, isLoading: updatePartnerStatusLoading } = usePostApiReq();
    const [state, setState] = useState("");
    const [sellerOrders, setSellerOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCashReqLoading, setCashReqIsLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [partnerstatus, setPartnerStatus] = useState("");
    const [sellerOrder, setSellerOrder] = useState({})
    const [sellerOrderInfoModal, setSellerOrderInfoModal] = useState(false);
    const [isViewWalletModalOpen, setIsViewWalletModalOpen] = useState(false);
    const [wallet, setWallet] = useState("");
    const [cashOutRequests, setCashOutRequests] = useState([]);

    const params = useParams()

    console.log("state", state);
    console.log("partnerstatus", partnerstatus);

    useEffect(() => {
        setPartnerStatus(state?.status)
    }, [state])



    const getSellerOrders = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_ADMIN_API_URL}/get-seller-order-list/${params.partnerId}`, { withCredentials: true });
            setIsLoading(false);
            setSellerOrders(data.sellerOrders);
            console.log("seller orders", data);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };


    const getSellerWallet = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-seller-wallet/${params?.partnerId}`, { withCredentials: true }
            );
            if (data.wallet._id) {
                getCashOutRequests(data.wallet._id);
                setWallet(data.wallet);
            }
            setCashReqIsLoading(false)
            console.log("wallet", data);
        } catch (error) {
            setCashReqIsLoading(false)
            console.log(error);
        }
    };

    const getCashOutRequests = async (id) => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-seller-wallet-recent-cashout-requests/${id}`, { withCredentials: true }
            );
            setCashOutRequests(data.cashouts);
            console.log("cash req", data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setCashReqIsLoading(false);
        }
    };

    useEffect(() => {
        getSellerOrders();
        getSellerWallet();
    }, [])

    const handleChange = async (e) => {
        setIsLoading(true);
        const orderStatus = e.target.value;
        setStatus(orderStatus);
        if (orderStatus === "") {
            getSellerOrders();
            return;
        }

        orderbyStatus(`/admin/get-seller-order-by-status/${params.partnerId}`, { status: orderStatus })
    };

    useEffect(() => {
        if (orderbyStatusRes?.status === 200 || orderbyStatusRes?.status === 201) {
            setIsLoading(false);
            setSellerOrders(orderbyStatusRes?.data.sellerOrders);
        }
    }, [orderbyStatusRes])

    const handleSellerOrderInfoModal = (data) => {
        setSellerOrder(data);
        setSellerOrderInfoModal(true);
    }


    const getSeller = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_ADMIN_API_URL}/get-seller?sellerId=${params?.partnerId}`, { withCredentials: true }
            );
            console.log("partnerDetails", data);
            setState(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSeller();
    }, [])

    const handleStatusChange = async (e) => {
        updatePartnerStatus("/admin/update-partner-status", { sellerId: params.partnerId, status: partnerstatus })
    };

    useEffect(() => {
        partnerstatus && handleStatusChange()
    }, [partnerstatus])

    useEffect(() => {
        if (updatePartnerStatusRes?.status === 200 || updatePartnerStatusRes?.status === 201) {
            getSeller();
        }
    }, [updatePartnerStatusRes])

    return (
        <>
            <Wrapper>
                <div>
                    <h2 className={sellerAssignedOrdersClasses.h2}>Seller Info</h2>
                    <div>
                        <div className={sellerAssignedOrdersClasses.contianer}>
                            <p><b>Name:</b> {state?.name}</p>
                            <p><b>Gst Number:</b> {state?.gstNumber}</p>
                            <p><b>Phone</b>: {state?.phone}</p>
                            <p><b>Legal Name:</b> {state?.legalName}</p>
                            <p><b>Status:</b> <span className={`${classes.status} ${state.status === "APPROVED" ? sellerAssignedOrdersClasses.active : sellerAssignedOrdersClasses.inactive}`}>{state.status}</span>
                                <select onChange={(e) => setPartnerStatus(e.target.value)} value={partnerstatus} className={sellerAssignedOrdersClasses.select} name="partnerstatus" id="partnerstatus">
                                    <option value="IN-REVIEW">In Review</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="REJECTED">Rejected</option>
                                    <option value="HOLD">Hold</option>
                                </select>
                            </p>
                            <p><b>Address:</b> {`${state?.address?.addressLine}, ${state?.address?.city}, ${state?.address?.state}, ${state?.address?.pincode}`}</p>
                            <p className={classes.mt}><b>Contact Person Email:</b> <span style={{ textDecoration: "underline" }}>{state?.contactPerson?.email}</span></p>
                            <p><b>Contact Person Name:</b> {state?.contactPerson?.name}</p>
                            <p><b>Contact Person Phone:</b> {state?.contactPerson?.phone}</p>
                            <p><b>Category</b>: {state?.categoryId?.name}</p>
                            <p className={sellerAssignedOrdersClasses.service_container}><b>Services</b>: {state?.services?.map((service) => <span className={sellerAssignedOrdersClasses.status}>{service?.serviceId?.name}</span>)}</p>
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
                                            <h3 className={classes["t-op-nextlvl"]}>{order.orderId}</h3>
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
                                        <p>₹ {wallet?.balance || 0}</p>
                                    </div>
                                </div>
                                <div className={sellerAssignedOrdersClasses.right}>
                                    <button onClick={() => setIsViewWalletModalOpen(true)} className={sellerAssignedOrdersClasses.button}>View Wallet</button>
                                </div>
                            </div>
                            <button className={sellerAssignedOrdersClasses.cash_btn}>Cashout Request</button>
                            <div className={sellerAssignedOrdersClasses.tran_contianer}>
                                {isCashReqLoading
                                    && cashOutRequests.length === 0
                                    && <Loader />
                                }
                                {!isCashReqLoading
                                    && cashOutRequests.length === 0
                                    && <p>No cashOut Requests found</p>
                                }
                                {
                                    cashOutRequests?.map((item) => (
                                        <CashOutReq
                                            key={item._id}
                                            item={item}
                                            getSellerWallet={getSellerWallet}
                                        />
                                    ))
                                }
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
                    getSellerWallet={getSellerWallet}
                    id={wallet?._id}
                />
            }
        </>
    )
}

export default SellerAssignedOrders