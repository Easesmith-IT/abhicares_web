import { useState } from 'react';
import classes from './AddCityModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';

const AddCityModal = ({ setIsModalOpen, city = "", getAllCities }) => {
    const { checkAuthorization } = useAuthorization();
    const [cityInfo, setCityInfo] = useState({
        city: city?.city || "",
        state: city?.state || "",
        pinCode: "",
    });

    const [pinCodes, setPinCodes] = useState(city?.pinCodes || []);

    console.log("pinCodes", pinCodes);


    const handelAddPincode = () => {
        if (!cityInfo.pinCode) {
            toast.error("Please enter a pincode");
        }

        if (cityInfo.pinCode.length !== 6) {
            toast.error("Pincode length must be 6 digits");
            return;
        }
        setPinCodes((prev) => [...prev, { code: cityInfo.pinCode }]);
        setCityInfo({ ...cityInfo, pinCode: "" });
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCityInfo({ ...cityInfo, [name]: value });
    }
    const navigate = useNavigate()


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!cityInfo.city
            || pinCodes.length === 0
            || !cityInfo.state
        ) {
            toast.error("All fields are required");
            return;
        }
        if (city) {
            try {
                const { data } = await axios.patch(`${import.meta.env.VITE_APP_ADMIN_API_URL}/update-availabe-city/${city._id}`, { ...cityInfo, pinCodes }, { withCredentials: true });
                toast.success("City updated successfully");
                getAllCities();
                setIsModalOpen(false);
            } catch (error) {
                setIsModalOpen(false);
                checkAuthorization(error);
                console.log(error);
            }
        }
        else {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_APP_ADMIN_API_URL}/create-availabe-city`, { ...cityInfo, pinCode: pinCodes }, { withCredentials: true });
                toast.success("City added successfully");
                getAllCities();
                setIsModalOpen(false);
            } catch (error) {
                setIsModalOpen(false);
                checkAuthorization(error);
                console.log(error);
            }
        }
    }

    const handleRemovePincode = (i) => {
        let pincodesArr = [...pinCodes];
        pincodesArr.splice(i, 1);
        setPinCodes(pincodesArr);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>{city ? "Update" : "Add"} City</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="city">City</label>
                        <input className={classes.input} onChange={handleOnChange} value={cityInfo.city} type="text" name="city" id="city" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="state">State</label>
                        <input className={classes.input} onChange={handleOnChange} value={cityInfo.state} type="text" name="state" id="state" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="pinCode">Add Pincodes</label>
                        <div className={classes.inputAndButton}>
                            <input className={classes.input} onChange={handleOnChange} value={cityInfo.pinCode} type="number" name="pinCode" id="pinCode" />
                            <button onClick={handelAddPincode} type='button' className={classes.button}>Add Pincode</button>
                        </div>

                        {pinCodes.length > 0 &&
                            <div>
                                <p className={classes.pincodes_heading}>Added Pincodes:</p>
                                <div className={classes.pincodes}>
                                    {pinCodes.map((pincode, i) =>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <p>{pincode?.code}</p>
                                            <RxCross2 onClick={() => handleRemovePincode(i)} style={{ color: "red" }} cursor={"pointer"} />
                                        </div>
                                    )}
                                </div>
                            </div>}
                    </div>
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{city ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCityModal