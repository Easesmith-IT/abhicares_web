import { useState } from 'react';
import classes from './AddOfferModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';

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

const AddOfferModal = ({ setIsModalOpen, offer = "", getAllOffers }) => {
    const { checkAuthorization } = useAuthorization();
    const [description, setDescription] = useState(offer?.description || "");
    const [offerInfo, setOfferInfo] = useState({
        name: offer?.name || "",
        offPercentage: offer?.offPercentage || "",
        // date: offer?.date || "",
        status: offer?.status || true,
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setOfferInfo({ ...offerInfo, [name]: value });
    }
    const navigate = useNavigate()


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!offerInfo.name
            || !offerInfo.offPercentage
            || !description
        ) {
            return;
        }
        if (offer) {
            try {
                const { data } = await axios.patch(`${process.env.REACT_APP_ADMIN_API_URL}/update-coupon/${offer._id}`, { ...offerInfo, description }, { withCredentials: true });

                toast.success("Offer updated successfully");
                getAllOffers();
                setIsModalOpen(false);
            } catch (error) {
                console.log(error);
                setIsModalOpen(false);
                checkAuthorization(error);
            }
        }
        else {
            try {
                if (!validateCouponCode(offerInfo.name)) {
                    toast.error('Please enter valid coupon code');
                    return;
                }
                const { data } = await axios.post(`${process.env.REACT_APP_ADMIN_API_URL}/create-coupon`, { ...offerInfo, description }, { withCredentials: true });
                console.log(data);
                toast.success("Offer added successfully");
                getAllOffers();
                setIsModalOpen(false);
            } catch (error) {
                setIsModalOpen(false);
                checkAuthorization(error);
                console.log(error);
            }
        }
    }

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
                        <label htmlFor="offPercentage">Offer Percentage</label>
                        <input className={classes.input} onChange={handleOnChange} value={offerInfo.offPercentage} type="number" name="offPercentage" id="offPercentage" />
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
                        <button className={classes.button}>{offer ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddOfferModal