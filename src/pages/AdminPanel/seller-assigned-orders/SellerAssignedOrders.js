import axios from 'axios';
import Wrapper from '../../Wrapper'

import classes from "../Shared.module.css";
import sellerAssignedOrdersClasses from "./SellerAssignedOrders.module.css";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import SellerOrderInfoModal from '../../../components/seller-info-modal/SellerOrderInfoModal';

const SellerAssignedOrders = () => {
    const [sellerOrders, setSellerOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [sellerOrder, setSellerOrder] = useState({})
    const [sellerOrderInfoModal, setSellerOrderInfoModal] = useState(false);

    const params = useParams()
    const navigate = useNavigate()
    const { state } = useLocation();

    const token = localStorage.getItem("adUx")
    const headers = {
        Authorization: token
    }


    const getSellerOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-seller-order-list/${params.partnerId}`, { headers });
            setSellerOrders(data.sellerOrders);
            console.log("seller orders", data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        getSellerOrders();
    }, [])

    const handleChange = async (e) => {
        setStatus(e.target.value);
        if (e.target.value === "") {
            getSellerOrders();
            return;
        }
        try {
            if (!token) {
                navigate("/admin/login");
                return;
            }
            const { data } = await axios.post(
                `${process.env.REACT_APP_ADMIN_API_URL}/get-seller-order-by-status/${params.partnerId}`,
                { status: e.target.value },
                { headers }
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
                            <p className={classes.mt}><b>Contact Person Email:</b> {state.contactPerson.email}</p>
                            <p><b>Contact Person Name:</b> {state.contactPerson.name}</p>
                            <p><b>Contact Person Phone:</b> {state.contactPerson.phone}</p>
                            <p><b>Category</b>: {state.categoryId.name}</p>
                            <p><b>Services</b>: {state.services.map((service) => service.serviceId.name).join(", ")}</p>
                        </div>
                    </div>

                    <div className={classes["report-container"]}>
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

                        <div className={classes["report-body"]}>
                            <div className={classes["report-topic-heading"]}>
                                <h3 className={classes["t-op"]} style={{marginRight:"60px"}}>Order Id</h3>
                                <h3 className={classes["t-op"]}>Order Value</h3>
                                <h3 className={classes["t-op"]}>Status</h3>
                                <h3 className={classes["t-op"]}>Details</h3>
                            </div>
                            <div className={classes.items}>
                                {!isLoading
                                    && sellerOrders.length === 0
                                    && <p>No seller order found</p>
                                }

                                {isLoading
                                    && sellerOrders.length === 0
                                    && <Loader />
                                }
                                {sellerOrders?.map((order) => (
                                    <div key={order._id} className={classes.item1}>
                                        <h3 className={classes["t-op-nextlvl"]}>{order._id}</h3>
                                        <h3 className={classes["t-op-nextlvl"]}>{order.orderValue}</h3>
                                        <h3 className={classes["t-op-nextlvl"]}>{order.status}</h3>
                                        <button onClick={() => handleSellerOrderInfoModal(order)} className={classes.button}>View Details</button>
                                    </div>
                                ))}

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
        </>
    )
}

export default SellerAssignedOrders