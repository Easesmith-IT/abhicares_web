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
import useGetApiReq from '../../../hooks/useGetApiReq';
import AddCashoutReqModal from '../../../components/update-cashoutReq-modal/AddCashoutReqModal';
import { format } from 'date-fns';
import SellerAssignedOrdersModal from '../../../components/seller-asigned-orders/SellerAssignedOrdersModal';

const SellerAssignedOrders = () => {
    const { res: orderbyStatusRes, fetchData: orderbyStatus, isLoading: orderbyStatusLoading } = usePostApiReq();
    const { res: updatePartnerStatusRes, fetchData: updatePartnerStatus, isLoading: updatePartnerStatusLoading } = usePostApiReq();
    const { res: getSellerOrdersListRes, fetchData: getSellerOrdersList, isLoading } = useGetApiReq();
    const { res: getWalletRes, fetchData: getWallet, isLoading: getWalletLoading } = useGetApiReq();
    const { res: getRequestsRes, fetchData: getRequests, isLoading: getRequestsLoading } = useGetApiReq();
    const { res: getSellersRes, fetchData: getSellers, isLoading: getSellersLoading } = useGetApiReq();
    const [state, setState] = useState("");
    const [sellerOrders, setSellerOrders] = useState([]);
    const [status, setStatus] = useState("");
    const [partnerstatus, setPartnerStatus] = useState("");
    const [sellerOrder, setSellerOrder] = useState({})
    const [sellerOrderInfoModal, setSellerOrderInfoModal] = useState(false);
    const [isViewWalletModalOpen, setIsViewWalletModalOpen] = useState(false);
    const [isAddCashoutReqModalOpen, setIsAddCashoutReqModalOpen] = useState(false);
    const [wallet, setWallet] = useState("");
    const [cashOutRequests, setCashOutRequests] = useState([]);
    const [isSellerAssignedModalOpen, setIsSellerAssignedModalOpen] = useState(false);

    const params = useParams()

    console.log("state", state);
    console.log("partnerstatus", partnerstatus);

    useEffect(() => {
        setPartnerStatus(state?.status)
    }, [state])



    const getSellerOrders = async () => {
        getSellerOrdersList(`/admin/get-seller-order-list/${params.partnerId}`)
    };

    useEffect(() => {
        if (getSellerOrdersListRes?.status === 200 || getSellerOrdersListRes?.status === 201) {
            console.log("getSellerOrdersListRes", getSellerOrdersListRes);

            setSellerOrders(getSellerOrdersListRes?.data.sellerOrders);
        }
    }, [getSellerOrdersListRes])


    const getSellerWallet = async () => {
        getWallet(`/admin/get-seller-wallet/${params?.partnerId}`)
    };

    useEffect(() => {
        if (getWalletRes?.status === 200 || getWalletRes?.status === 201) {
            console.log("getWalletRes", getWalletRes);

            if (getWalletRes?.data.wallet._id) {
                getCashOutRequests(getWalletRes?.data.wallet._id);
                setWallet(getWalletRes?.data.wallet);
            }
        }
    }, [getWalletRes])

    const getCashOutRequests = async (id) => {
        getRequests(`/admin/get-seller-wallet-recent-cashout-requests/${id}`)
    };

    useEffect(() => {
        getSellerOrders();
        getSellerWallet();
    }, [])

    useEffect(() => {
        if (getRequestsRes?.status === 200 || getRequestsRes?.status === 201) {

            console.log("getRequestsRes", getRequestsRes);

            setCashOutRequests(getRequestsRes?.data.cashouts);
        }
    }, [getRequestsRes])

    const handleChange = async (e) => {
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
            setSellerOrders(orderbyStatusRes?.data.sellerOrders);
        }
    }, [orderbyStatusRes])

    const handleSellerOrderInfoModal = (data) => {
        setSellerOrder(data);
        setSellerOrderInfoModal(true);
    }


    const getSeller = async () => {
        getSellers(`/admin/get-seller?sellerId=${params?.partnerId}`)
    };

    useEffect(() => {
        getSeller();
    }, [])

    useEffect(() => {
        if (getSellersRes?.status === 200 || getSellersRes?.status === 201) {
            setState(getSellersRes?.data.data);
        }
    }, [getSellersRes])

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
                    <h2 className={sellerAssignedOrdersClasses.h2}>Partner Info</h2>
                    <div>
                        <div className={sellerAssignedOrdersClasses.contianer}>
                            <p><b>Name:</b> {state?.name}</p>
                            <p><b>Joined Date:</b> {state?.createdAt && format(new Date(state?.createdAt), "dd/MM/yyyy")}</p>
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
                            <p><b>Online/Offline</b>: <span style={{
                                padding: "3px 20px",
                                backgroundColor: state?.online ? "green" : "red",
                                color: "white",
                                width: "100px",
                                borderRadius: "5px",
                                display: "inline-block",
                                textAlign: "center"
                            }}>
                                {state?.online ? "Online" : "Offline"}
                            </span></p>

                            <p className={sellerAssignedOrdersClasses.service_container}><b>Services</b>: {state?.services?.map((service) => <span className={sellerAssignedOrdersClasses.status}>{service?.serviceId?.name}</span>)}</p>
                        </div>
                    </div>

                    <div className={sellerAssignedOrdersClasses.flex} style={{ marginBottom: "30px" }}>
                        <div className={sellerAssignedOrdersClasses["reportContainer"]}>
                            <div className={classes["report-header"]}>
                                <h1 className={classes["recent-Articles"]}>Partner Assigned Orders</h1>
                                <div>
                                    <button onClick={() => setIsSellerAssignedModalOpen(true)} style={{ background: "black", color: "white", padding: "3px 10px" }}>View All</button>
                                </div>
                                {/* <select
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
                                </select> */}
                            </div>

                            <div className={sellerAssignedOrdersClasses["report-body"]}>
                                <div className={sellerAssignedOrdersClasses["report-topic-heading"]}>
                                    <h3 className={classes["t-op"]} style={{ width: "180px" }}>Booking Id</h3>
                                    <h3 className={classes["t-op"]} style={{ width: "110px" }}>Order Value</h3>
                                    <h3 className={classes["t-op"]}>Status</h3>
                                    <h3 className={classes["t-op"]}>Details</h3>
                                </div>
                                {(isLoading || orderbyStatusLoading) && <Loader />}

                                <div className={classes.items}>
                                    {!isLoading && !orderbyStatusLoading
                                        && sellerOrders.length === 0
                                        && <p>No Partner order found</p>
                                    }

                                    {sellerOrders?.map((order) => (
                                        <div key={order._id} className={sellerAssignedOrdersClasses.item1}>
                                            <h3 className={classes["t-op-nextlvl"]} style={{ width: "180px" }}>{order.bookingId}</h3>
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
                                        <p style={{ marginLeft: "10px" }}>₹{wallet?.balance || 0}</p>
                                    </div>
                                </div>
                                <div className={sellerAssignedOrdersClasses.right}>
                                    <div>
                                        <button onClick={() => setIsViewWalletModalOpen(true)} className={sellerAssignedOrdersClasses.button}>View Wallet History</button>
                                        <button onClick={() => setIsAddCashoutReqModalOpen(true)} className={sellerAssignedOrdersClasses.button} style={{ color: "black" }}>Add Cashout</button>
                                    </div>
                                </div>
                            </div>
                            <button className={sellerAssignedOrdersClasses.cash_btn}>Cashout Request</button>
                            <div className={sellerAssignedOrdersClasses.tran_contianer}>
                                {(getWalletLoading || getRequestsLoading)
                                    && cashOutRequests.length === 0
                                    && <Loader />
                                }
                                {!getWalletLoading && !getRequestsLoading
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

            {isSellerAssignedModalOpen &&
                <SellerAssignedOrdersModal
                    isSellerAssignedModalOpen={isSellerAssignedModalOpen}
                    setIsSellerAssignedModalOpen={setIsSellerAssignedModalOpen}
                />
            }

            {isViewWalletModalOpen &&
                <WalletViewModal
                    setIsViewWalletModalOpen={setIsViewWalletModalOpen}
                    getSellerWallet={getSellerWallet}
                    id={wallet?._id}
                />
            }

            {isAddCashoutReqModalOpen &&
                <AddCashoutReqModal
                    getCashOutRequests={getCashOutRequests}
                    setIsUpdateModalOpen={setIsAddCashoutReqModalOpen}
                    walletId={wallet?._id}
                />
            }
        </>
    )
}

export default SellerAssignedOrders