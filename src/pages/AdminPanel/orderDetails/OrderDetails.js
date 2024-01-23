import { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import classes from './OrderDetails.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import useAuthorization from '../../../hooks/useAuthorization';
import toast from 'react-hot-toast';

const OrderDetails = () => {
    const { state } = useLocation();
    console.log(state);
    const [totalTaxRs, setTotalTaxRs] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();
    const [status, setStatus] = useState(state?.status);

    const { checkAuthorization } = useAuthorization();


    const handleChange = async (e) => {
        setStatus(() => e.target.value);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_ADMIN_API_URL}/change-order-status/${state._id}`, { status: e.target.value }, { withCredentials: true }
            );
            console.log('status', data);
            toast.success("Order status changed successfully");
        } catch (error) {
            console.log(error);
            setStatus(() => state?.status);
            checkAuthorization(error);
        }
    }

    useEffect(() => {
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

        if (state.couponId) {
            const localDiscount = (Number(subTotal) * Number(state.couponId.offPercentage)) / 100;
            console.log("discount", localDiscount);
            setDiscount(localDiscount);
            setSubTotal((prev) => prev - Number(localDiscount));
        }
    }, [state.orderValue, state.couponId, totalTaxRs, navigate]);


    return (
        <Wrapper>
            <div className={classes.wrapper}>
                <div className={classes.left_div}>
                    <div className={classes.info}>
                        <div>
                            {/* <h4>seller name</h4>
                            <p>seller phone: 1234567890</p> */}
                            <select onChange={handleChange} value={status} className={classes.select} name="status" id="status">
                                <option value="Pending">Pending</option>
                                <option value="OutOfDelivery">OutOfDelivery</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <p>order date: {format(new Date(state.createdAt), "dd-MM-yyyy")}</p>
                            <p>date of appointment: 07/12/2023</p>
                            <p>time of appointment: 12:00</p>
                        </div>
                    </div>
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
                        {state.items?.map((item, i) => (
                            <div key={i} className={classes.item}>
                                <div>
                                    <img className={classes.img} src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${item.package ? item.package.imageUrl[0] : item.product.imageUrl[0]}`} alt="product" />
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
                            <p>₹{state.itemTotal}</p>
                        </div>
                        <div className={classes.d_flex}>
                            <p>Tax (18%) :</p>
                            <p>₹{state.tax}</p>
                        </div>
                        {discount > 0 && <div className={classes.d_flex}>
                            <p>Discount ('{state?.couponId?.name}') :</p>
                            <p>₹{state.discount}</p>
                        </div>}
                        <div className={classes.d_flex}>
                            <p>Total Amount :</p>
                            <p>₹{state.orderValue}</p>
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
                            <p>{state.user.phone}</p>
                        </div>
                        <div className={classes.d_flex}>
                            <p>Customer Address :</p>
                            <p>{`${state.user.address.addressLine},${state.user.address.landmark},${state.user.address.pincode}`}</p>
                        </div>

                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default OrderDetails