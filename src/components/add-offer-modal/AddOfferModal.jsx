import { useEffect, useState } from 'react';
import classes from './AddOfferModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import usePatchApiReq from '../../hooks/usePatchApiReq';
import usePostApiReq from '../../hooks/usePostApiReq';
import useGetApiReq from '../../hooks/useGetApiReq';
import { format } from 'date-fns';

const validateCouponCode = (code) => {
    const hasSpaces = /\s/.test(code);

    const hasUpperCaseLetters = [...code].every(
        (char) => char === char.toUpperCase()
    );

    if (!hasSpaces && hasUpperCaseLetters) {
        return true;
    }

    return false;

}

function formatCouponCode(input) {
    return input.toUpperCase().replace(/\s+/g, '');
}

const AddOfferModal = ({ setIsModalOpen, offer = "", getAllOffers }) => {
    const { res: addOfferRes, fetchData: addOffer, isLoading: addOfferLoading } = usePostApiReq();
    const { res: getCategoriesRes, fetchData: getCategories, isLoading: getCategoriesLoading } = useGetApiReq();
    const { checkAuthorization } = useAuthorization();
    const [description, setDescription] = useState(offer?.description || "");
    const [selectedItems, setSelectedItems] = useState(offer?.categoryType || []);
    const [isLoading, setIsLoading] = useState(false);
    const [offerInfo, setOfferInfo] = useState({
      name: offer?.name || "",
      offPercentage: offer?.offPercentage || "",
      noOfTimesPerUser: offer?.noOfTimesPerUser || 1,
      status: offer?.status || true,
      type: offer?.discountType || "",
      upTo: offer?.maxDiscount || "",
      offerValue: offer?.fixedCouponValue || offer?.couponFixedValue || "",
      categoryType: selectedItems,
      expiryDate:
        (offer?.expiryDate &&
          format(new Date(offer?.expiryDate), "yyyy-MM-dd")) ||
        "",
    });
    const [allCategories, setAllCategories] = useState([]);
    

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        if (name === "name") {
            value = formatCouponCode(value);
        }
        setOfferInfo({ ...offerInfo, [name]: value });
    }


    const getAllCategories = async () => {
        getCategories("/admin/get-all-category")
    };

    useEffect(() => {
        getAllCategories();
    }, [])

    useEffect(() => {
        if (getCategoriesRes?.status === 200 || getCategoriesRes?.status === 201) {
            setAllCategories(getCategoriesRes?.data?.data);
        }
    }, [getCategoriesRes])

    const navigate = useNavigate()


    console.log("selectedItems", selectedItems);
    console.log("offerInfo", offerInfo);

    // Handle checkbox changes
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedItems((prev) => [...prev, value]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item !== value));
        }
    };

    const { res: updateOfferRes, fetchData: updateOfferFetchData } = usePatchApiReq()

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const { name, offPercentage, type, offerValue, upTo, noOfTimesPerUser, categoryType } = offerInfo;

        const isOfferMissing =
            !name ||
            !expiryDate ||
            !type ||
            !noOfTimesPerUser ||
            selectedItems.length === 0 ||
            (type === "percentage" ? !offPercentage || !upTo : !offerValue);

        const isDescriptionMissing = !description;

        console.log("isDescriptionMissing", isDescriptionMissing);
        console.log("isOfferMissing", isOfferMissing);

        console.log("isOfferMissing || isDescriptionMissing", (isOfferMissing || isDescriptionMissing));

        if (isOfferMissing || isDescriptionMissing) {
            toast.error("All fields are required");
            return;
        }

        if (!validateCouponCode(offerInfo.name)) {
            toast.error('Please enter valid coupon code');
            return;
        }

        if (offer) {
            await updateOfferFetchData(`/admin/update-coupon`, { ...offerInfo, description, maxDiscount: offerInfo.type === "fixed" ? "" : offerInfo.upTo, discountType: offerInfo.type, couponFixedValue: offerInfo.type === "fixed" ? offerInfo.offerValue : "", categoryType: selectedItems, offPercentage: offerInfo.type === "fixed" ? "" : offerInfo.offPercentage, id: offer._id })
        }
        else {
            addOffer("/admin/create-coupon", { ...offerInfo, description, maxDiscount: offerInfo.type === "fixed" ? "" : offerInfo.upTo, discountType: offerInfo.type, couponFixedValue: offerInfo.type === "fixed" ? offerInfo.offerValue : "", categoryType: selectedItems, offPercentage: offerInfo.type === "fixed" ? "" : offerInfo.offPercentage })
        }
    }

    useEffect(() => {
        if (updateOfferRes?.status === 200 || updateOfferRes?.status === 201) {
            console.log("updateOfferRes", updateOfferRes);
            toast.success("Offer updated successfully");
            getAllOffers();
            setIsModalOpen(false);
        }
    }, [updateOfferRes])
  
useEffect(() => {
        if (addOfferRes?.status === 200 || addOfferRes?.status === 201) {
            toast.success("Offer added successfully");
            getAllOffers();
            setIsModalOpen(false);
        }
    }, [addOfferRes])


    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>{offer ? "Update" : "Add"} Offer</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="name">Coupon Code (in block letters and without space)</label>
                        <input className={classes.input} onChange={handleOnChange} value={offerInfo.name} type="text" name="name" id="name" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="categoryType">Category</label>
                        <div className={classes.categories}>
                            {allCategories.length > 0 && !getCategoriesLoading && allCategories?.map((item) => (
                                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                    <input
                                        style={{ width: "20px", height: "20px" }}
                                        type="checkbox"
                                        value={item?._id}
                                        id={item?._id}
                                        name={item?._id}
                                        checked={selectedItems.some((selected) => selected === item?._id)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor={item?._id}>{item?.name}</label>
                                </div>
                            ))}

                            {allCategories.length === 0 && getCategoriesLoading &&
                                <p>Loading...</p>
                            }

                            {allCategories.length === 0 && !getCategoriesLoading &&
                                <p>No Categories found</p>
                            }
                        </div>
                    </div>

                    {!offer &&
                        <div className={classes.input_container}>
                            <label htmlFor="type">Coupon Type</label>
                            <select className={classes.input} onChange={handleOnChange} value={offerInfo.type} name="type" id="type">
                                <option value="">Select Coupon Type</option>
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                            </select>
                        </div>}

                    {offerInfo.type === "percentage" &&
                        <>
                            <div className={classes.input_container}>
                                <label htmlFor="offPercentage">Offer Percentage</label>
                                <input className={classes.input} onChange={handleOnChange} value={offerInfo.offPercentage} type="number" name="offPercentage" id="offPercentage" />
                            </div>
                            <div className={classes.input_container}>
                                <label htmlFor="upTo">Up To</label>
                                <input className={classes.input} onChange={handleOnChange} value={offerInfo.upTo} type="number" name="upTo" id="upTo" />
                            </div>
                        </>
                    }
                    {offerInfo.type === "fixed" &&
                        <>
                            <div className={classes.input_container}>
                                <label htmlFor="offerValue">Offer Value</label>
                                <input className={classes.input} onChange={handleOnChange} value={offerInfo.offerValue} type="number" name="offerValue" id="offerValue" />
                            </div>
                        </>
                    }
                    <div className={classes.input_container}>
                        <label htmlFor="noOfTimesPerUser">No of Times Per User</label>
                        <input className={classes.input} onChange={handleOnChange} value={offerInfo.noOfTimesPerUser} type="number" name="noOfTimesPerUser" id="noOfTimesPerUser" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input className={classes.input} onChange={handleOnChange} value={offerInfo.expiryDate} type="date" name="expiryDate" id="expiryDate" />
                    </div>
                    {/* <div className={classes.input_container}>
                        <label htmlFor="date">Date</label>
                        <input className={classes.input} onChange={handleOnChange} value={offerInfo.date} type="date" name="date" id="date" />
                    </div> */}
                    {offer && <div className={classes.input_container}>
                        <label htmlFor="status">Status</label>
                        <select className={classes.input} onChange={handleOnChange} value={offerInfo.status} name="status" id="status">
                            <option value="active">Active</option>
                            <option value="inactive">InActive</option>
                        </select>
                    </div>}
                    <div className={classes.input_container}>
                        <label htmlFor="description">Description</label>
                        <ReactQuill theme="snow" value={description} onChange={setDescription} />
                    </div>
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{addOfferLoading ? "Loading..." : offer ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddOfferModal