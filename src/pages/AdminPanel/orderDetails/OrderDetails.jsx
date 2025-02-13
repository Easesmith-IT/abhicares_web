import { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import classes from './OrderDetails.module.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import useAuthorization from '../../../hooks/useAuthorization';
import toast from 'react-hot-toast';
import usePostApiReq from '../../../hooks/usePostApiReq';
import useGetApiReq from '../../../hooks/useGetApiReq';

const OrderDetails = () => {
    const { res: changeOrderStatusRes, fetchData: changeOrderStatus, isLoading: changeOrderStatusLoading } = usePostApiReq();
    const { res: getOrderRes, fetchData: getOrder, isLoading: getOrderLoading } = useGetApiReq();
    const { state: stateData } = useLocation();
    const [totalTaxRs, setTotalTaxRs] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();
    const [state, setState] = useState(stateData || "");
    const [status, setStatus] = useState(stateData?.status);
    const { id } = useParams();
console.log("stateData",stateData);


const getOrderDetails = async () => {
    getOrder(`/admin/get-order-details?orderId=${id}`)
};

useEffect(() => {
    getOrderDetails()
}, [state?._id])

useEffect(() => {
    if (getOrderRes?.status === 200 || getOrderRes?.status === 201) {
            console.log("getOrderRes",getOrderRes);
            setState(getOrderRes?.data?.data);
            setStatus(getOrderRes?.data?.data?.status);
        }
    }, [getOrderRes])

    const handleChange = async (e) => {
        const orderStatus = e.target.value;
        setStatus(() => orderStatus);
        changeOrderStatus(`/admin/change-order-status/${state?._id}`, { status: orderStatus })
    }

    useEffect(() => {
        if (changeOrderStatusRes?.status === 200 || changeOrderStatusRes?.status === 201) {
            toast.success("Order status changed successfully");
            getOrderDetails();
        }
    }, [changeOrderStatusRes])

    useEffect(() => {
        if (state?.items && state?.items.length > 0) {
            let value = 0;
            for (const item of state.items) {
                if (item?.product) {
                    value = value + Number(item.quantity * item.product.offerPrice);
                }
                else {
                    value = value + Number(item.quantity * item.package.offerPrice);
                }
            }
            setSubTotal(() => value);
            const taxRs = (Number(value) * 18) / 100;
            setTotalTaxRs(taxRs);

            const { discountType, couponFixedValue, offPercentage, maxDiscount } = state?.couponId || {};

            if (state?.couponId) {
                if (discountType === "fixed") {
                    setDiscount(couponFixedValue);
                    setSubTotal((prev) => prev - Number(couponFixedValue));
                }
                else {
                    let offerTotal = Math.ceil(value * (Number(offPercentage) / 100));
                    offerTotal = offerTotal > maxDiscount ? maxDiscount : offerTotal;
                    console.log("offerTotal", offerTotal);
                    setDiscount(offerTotal);
                    setSubTotal((prev) => prev - Number(offerTotal));
                }
            }
        }
    }, [state?.orderValue, state?.couponId, state, state?.items, totalTaxRs, navigate]);


    return (
        <Wrapper>
            <div className={classes.wrapper}>
                <div className={classes.left_div}>
                    <div className={classes.info}>
                        <div>
                            <h4>Order Id: {state?.orderId}</h4>
                            {/* <p>seller phone: 1234567890</p> */}
                            <h5>Update Status</h5>
                            <select onChange={handleChange} value={status} className={classes.select} name="status" id="status">
                                <option value="Pending">Pending</option>
                                <option value="OutOfDelivery">OutOfDelivery</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <p>Date of Order: {state?.createdAt && format(new Date(state?.createdAt), "dd-MM-yyyy")}</p>
                            {/* <p>date of appointment: 07/12/2023</p> */}
                            <p>Time of Order: {state?.createdAt && format(new Date(state?.createdAt), "hh:mm aa")}</p>
                            <p>Payment Type: {state?.paymentType}</p>
                            <p>No of Left Bookings: {state?.No_of_left_bookings}</p>
                            <p>Refund Amount: {state?.refundInfo?.amount}</p>
                            <p>Refund Status: {state?.refundInfo?.status}</p>
                        </div>
                    </div>
                    <p style={{ marginTop: "20px" }}>Admin Comment: {state?.adminComment}</p>
                    {/* <h5 className={classes.heading}>Packages</h5>
                    <div className={classes.container}>
                        <div className={classes.item}>
                            <div>
                                <img className={classes.img} src="https://dashui.codescandy.com/dashuipro/assets/images/ecommerce/product-2.jpg" alt="product" />
                                <div>
                                    <h6>package name</h6>
                                    <p>category</p>
                                </div>
                            </div>
                            <p>Qty: 2</p>
                            <p>₹299</p>
                        </div>
                    </div> */}
                    <h5 className={classes.heading}>Products</h5>
                    <div className={classes.container}>
                        {state?.items?.map((item, i) => (
                            <div key={i} className={classes.item}>
                                <div>
                                    <img className={classes.img} src={`${import.meta.env.VITE_APP_IMAGE_URL}/${item.package ? item.package.imageUrl[0] : item.product.imageUrl[0]}`} alt="product" />
                                    <div>
                                        <h6>{item.package ? item.package.name : item.product.name}</h6>
                                        <p>{item.package ? "Package" : "Product"}</p>
                                    </div>
                                </div>
                                <p>Qty: {item.quantity}</p>
                                <p>₹{Number(item.package ? item.package.offerPrice : item.product.offerPrice) * Number(item.quantity)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.right_div}>
                    <div className={classes.right_div_top}>
                        <h5>Order Summary</h5>
                        <div className={classes.heading}>
                            <p>Descriptions</p>
                            <p>Amounts</p>
                        </div>
                        <div className={classes.d_flex}>
                            <p>Sub Total :</p>
                            <p>₹{state?.itemTotal}</p>
                        </div>
                        <div className={classes.d_flex}>
                            <p>Tax (18%) :</p>
                            <p>+ ₹{state?.tax}</p>
                        </div>
                        {state?.discount > 0 && <div className={classes.d_flex}>
                            <p>Discount ('{state?.couponId?.name}') :</p>
                            <p>- ₹{state?.discount}</p>
                        </div>}
                        {state?.referalDiscount > 0 && <div className={classes.d_flex}>
                            <p>Referal Discount :</p>
                            <p>- ₹{state?.referalDiscount}</p>
                        </div>}
                        <div className={classes.d_flex}>
                            <p>Total Amount :</p>
                            <p>₹{state?.orderValue}</p>
                        </div>
                    </div>
                    <div className={classes.right_div_bottom}>
                        <h5>Customer Details</h5>
                        <div className={classes.d_flex}>
                            <p>Customer Name :</p>
                            <p>{state?.user?.name}</p>
                        </div>
                        <div className={classes.d_flex}>
                            <p>Customer Phone :</p>
                            <p>{state?.user.phone}</p>
                        </div>
                        <div className={classes.d_flex}>
                            <p>Customer Address :</p>
                            <p>{`${state?.user.address.addressLine},${state?.user.address.landmark},${state?.user.address.pincode}`}</p>
                        </div>

                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default OrderDetails