import React, { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import classes from "../../AdminPanel/shared.module.css";
import sellerAssignedOrdersClasses from "../seller-assigned-orders/SellerAssignedOrders.module.css";
import useGetApiReq from '../../../hooks/useGetApiReq';
import Loader from '../../../components/loader/Loader';
import WalletViewModal from '../../../components/wallet-view-modal/WalletViewModal';
import { RiWalletLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import CashOutReq from '../../../components/cash-out-req/CashOutReq';
import { format } from 'date-fns';
import UpdateCashoutReqModal from '../../../components/update-cashoutReq-modal/UpdateCashoutReqModal';

const SellerCashoutDetails = () => {
    const { res: getSellerCashoutRes, fetchData: getSellerCashout, isLoading: getSellerCashoutLoading } = useGetApiReq();
    const { res: getRequestsRes, fetchData: getRequests, isLoading: getRequestsLoading } = useGetApiReq();

    const [state, setState] = useState("");
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [cashout, setCashout] = useState("");
    const [isViewWalletModalOpen, setIsViewWalletModalOpen] = useState(false);
    const [wallet, setWallet] = useState("");
    const [cashOutRequests, setCashOutRequests] = useState([]);
    const params = useParams();
    console.log("params?.cashoutId", params?.cashoutId);
    console.log("wallet", wallet);


    const getSingleCashout = async () => {
        getSellerCashout(`/admin/get-seller-cashout-detail?cashoutId=${params?.cashoutId}`)
    };

    useEffect(() => {
        getSingleCashout();
    }, [])

    useEffect(() => {
        if (getSellerCashoutRes?.status === 200 || getSellerCashoutRes?.status === 201) {
            console.log("getSellerCashoutRes", getSellerCashoutRes);
            setCashout(getSellerCashoutRes?.data?.cashout)
            setState(getSellerCashoutRes?.data?.cashout?.sellerWalletId?.sellerId)
            getCashOutRequests(getSellerCashoutRes?.data?.cashout?.sellerWalletId?._id);
            setWallet(getSellerCashoutRes?.data?.cashout?.sellerWalletId);
        }
    }, [getSellerCashoutRes])

    const getCashOutRequests = async (id) => {
        getRequests(`/admin/get-seller-wallet-recent-cashout-requests/${id}`)
    };


    useEffect(() => {
        if (getRequestsRes?.status === 200 || getRequestsRes?.status === 201) {

            console.log("getRequestsRes", getRequestsRes);

            setCashOutRequests(getRequestsRes?.data.cashouts);
        }
    }, [getRequestsRes])

    return (
        <Wrapper>
            <div>
                <h2 className={sellerAssignedOrdersClasses.h2}>Seller Info</h2>
                <div>
                    <div className={sellerAssignedOrdersClasses.contianer}>
                        <p><b>Name:</b> {state?.name}</p>
                        <p><b>Gst Number:</b> {state?.gstNumber}</p>
                        <p><b>Phone</b>: {state?.phone}</p>
                        <p><b>Legal Name:</b> {state?.legalName}</p>
                        <p><b>Status:</b> <span className={`${classes.status} ${state.status === "APPROVED" ? sellerAssignedOrdersClasses.active : sellerAssignedOrdersClasses.inactive}`}>{state.status}</span></p>
                        <p><b>Address:</b> {`${state?.address?.addressLine}, ${state?.address?.city}, ${state?.address?.state}, ${state?.address?.pincode}`}</p>
                        <p className={classes.mt}><b>Contact Person Email:</b> <span style={{ textDecoration: "underline" }}>{state?.contactPerson?.email}</span></p>
                        <p><b>Contact Person Name:</b> {state?.contactPerson?.name}</p>
                        <p><b>Contact Person Phone:</b> {state?.contactPerson?.phone}</p>
                    </div>
                </div>
                <div className={sellerAssignedOrdersClasses.flex} style={{ marginBottom: "30px" }}>
                    <div className={sellerAssignedOrdersClasses["reportContainer"]}>
                        <div className={classes["report-header"]}>
                            <h1 className={classes["recent-Articles"]}>Cashout Details</h1>
                            <button onClick={() => setIsUpdateModalOpen(true)} className={sellerAssignedOrdersClasses.button}>Update</button>
                        </div>

                        <div className={sellerAssignedOrdersClasses["report-body"]}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <p><b>Cashout Id:</b> {cashout?.cashoutId}</p>
                                <p><b>Description:</b> {cashout?.description}</p>
                                <p><b>Status:</b> <span className={cashout.status === "cancelled" ? classes.red : cashout.status === "completed" ? classes.green : classes.blue}>{cashout?.status}</span></p>
                                <p><b>Amount:</b> ₹{cashout?.value}</p>
                                <p><b>Date:</b> {cashout?.createdAt && format(new Date(cashout?.createdAt), "dd-MM-yyyy")}</p>
                            </div>
                        </div>

                    </div>
                    <div className={sellerAssignedOrdersClasses["reportContainer"]}>
                        <div className={sellerAssignedOrdersClasses.d_flex}>
                            <div className={sellerAssignedOrdersClasses.left}>
                                <h3 className={sellerAssignedOrdersClasses.h3}><RiWalletLine size={50} /> Wallet</h3>
                                <div className={sellerAssignedOrdersClasses.d_flex}>
                                    <h4>Balance:</h4>
                                    <p style={{ marginLeft: "10px" }}>₹{wallet?.balance || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isViewWalletModalOpen &&
                <WalletViewModal
                    setIsViewWalletModalOpen={setIsViewWalletModalOpen}
                    getSellerWallet={getSellerWallet}
                    id={wallet?._id}
                />
            }

            {isUpdateModalOpen &&
                <UpdateCashoutReqModal
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                    cashOutReq={cashout}
                    getSellerWallet={getSingleCashout}
                    setIsViewWalletModalOpen={setIsViewWalletModalOpen}
                />
            }
        </Wrapper>
    )
}

export default SellerCashoutDetails