import { useEffect, useState } from 'react';
import classes from './AddSellerModal.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

import { RxCross2 } from 'react-icons/rx';
import { IoIosArrowDown } from "react-icons/io";
import useAuthorization from '../../hooks/useAuthorization';
import { MdClose } from "react-icons/md";
import usePostApiReq from '../../hooks/usePostApiReq';
import useGetApiReq from '../../hooks/useGetApiReq';


const AddSellerModal = ({ setIsModalOpen, seller = "", getAllSellers }) => {
    const { res: addSellerRes, fetchData: addSeller, isLoading: addSellerLoading } = usePostApiReq();
    const { res: getCategoriesRes, fetchData: getCategories, isLoading: getCategoriesLoading } = useGetApiReq();
    const { res: getServicesRes, fetchData: getServices, isLoading: getServicesLoading } = useGetApiReq();
    const { checkAuthorization } = useAuthorization();
    console.log('seller', seller)
    const [sellerInfo, setSellerInfo] = useState({
        name: seller?.name || "",
        legalName: seller?.legalName || "",
        gstNumber: seller?.gstNumber || "",
        phone: seller?.phone || "",
        password: seller?.password || "",
        categoryId: seller?.categoryId?._id || "",
        services: seller?.services?.map((service) => ({ serviceId: service?.serviceId?._id, name: service?.serviceId?.name })) || [],
        status: seller?.status
    });

    const [address, setAddress] = useState({
        state: seller?.address?.state || "",
        city: seller?.address?.city || "",
        addressLine: seller?.address?.addressLine || "",
        pincode: seller?.address?.pincode || "",
    });

    const [coordinates, setCoordinates] = useState({
        latitude: seller?.address?.location?.coordinates[0] || "",
        longitude: seller?.address?.location?.coordinates[1] || "",
    });

    const [contactPerson, setContactPerson] = useState({
        name: seller?.contactPerson?.name || "",
        phone: seller?.contactPerson?.phone || "",
        email: seller?.contactPerson?.email || "",
    });
    const [allCategories, setAllCategories] = useState([]);
    const [allCategoryServices, setAllCategoryServices] = useState([]);
    const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);


    const handleServiceOnChange = (e, name) => {
        const { value, checked } = e.target;
        console.log("value: " + value);

        if (checked) {
            setSellerInfo({ ...sellerInfo, services: [...sellerInfo.services, { serviceId: value, name }] })
        }
        else {
            const filtered = sellerInfo.services.filter((service) => service.serviceId !== value);
            console.log("filtered", filtered);

            setSellerInfo({ ...sellerInfo, services: filtered })
        }
    }

    // const handleRemoveService = (id) => {
    //     console.log("id", id);
    //     const filtered = sellerInfo.services.filter((service) => service.serviceId !== id);
    //     setSellerInfo({ ...sellerInfo, services: filtered })
    // }

    const handleContactPersonOnChange = (e) => {
        const { name, value } = e.target;
        setContactPerson({ ...contactPerson, [name]: value });
    }

    const handleLocationOnChange = (e) => {
        const { name, value } = e.target;
        setCoordinates({ ...coordinates, [name]: value });
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setSellerInfo({ ...sellerInfo, [name]: value });
        setAddress({ ...address, [name]: value });
    }

    const navigate = useNavigate()

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

    const getCategoryServices = async () => {
        getServices(`/admin/get-category-service/${sellerInfo.categoryId}`)
    };

    useEffect(() => {
        sellerInfo.categoryId && getCategoryServices();
    }, [sellerInfo.categoryId])

    useEffect(() => {
        if (getServicesRes?.status === 200 || getServicesRes?.status === 201) {
            setAllCategoryServices(getServicesRes?.data?.data);
        }
    }, [getServicesRes])


    console.log("seller state", sellerInfo);
    console.log("contactPerson state", contactPerson);

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            toast.error("Geolocation not supported");
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // setLocation({ ...location, coordinates: [latitude, longitude] });
            toast.success("Location got");
        }

        function error() {
            toast.error("Unable to retrieve your location");
        }
    }




    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!sellerInfo.name
            || !sellerInfo.legalName
            || !sellerInfo.gstNumber
            || !sellerInfo.phone
            || !sellerInfo.password
            || !sellerInfo.categoryId
            || sellerInfo.services.length === 0
            || !coordinates.latitude
            || !coordinates.longitude
            || !address.addressLine
            || !address.city
            || !address.pincode
            || !address.state
            || !contactPerson.name
            || !contactPerson.email
            || !contactPerson.phone
        ) {
            toast.error("Please fill all the fields");
            console.log("seller", sellerInfo);

            return;
        }
        const allData = {
            name: sellerInfo.name,
            legalName: sellerInfo.legalName,
            gstNumber: sellerInfo.gstNumber,
            phone: sellerInfo.phone,
            password: sellerInfo.password,
            status: sellerInfo.status,
            categoryId: sellerInfo.categoryId,
            services: sellerInfo.services,
            address: {
                state: address.state,
                city: address.city,
                pincode: address.pincode,
                addressLine: address.addressLine,
                location: {
                    type: "Point",
                    coordinates: [coordinates.latitude, coordinates.longitude]
                }
            },
            contactPerson
        }

        if (seller) {
            try {
                const { data } = await axios.patch(`${import.meta.env.VITE_APP_ADMIN_API_URL}/update-seller/${seller._id}`, allData, { withCredentials: true });
                toast.success("Seller updated successfully");
                getAllSellers();
                setIsModalOpen(false);
            } catch (error) {
                console.log(error);
                setIsModalOpen(false);
                checkAuthorization(error);
            }
        }
        else {
            addSeller("/admin/create-seller", allData)
        }
    }

    useEffect(() => {
        if (addSellerRes?.status === 200 || addSellerRes?.status === 201) {
            toast.success("Seller added successfully");
            getAllSellers();
            setIsModalOpen(false);
        }
    }, [addSellerRes])


    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>{seller ? "Update" : "Add"} Seller</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="name">Name</label>
                        <input className={classes.input} onChange={handleOnChange} value={sellerInfo.name} type="text" name="name" id="name" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="legalName">Legal Name</label>
                        <input className={classes.input} onChange={handleOnChange} value={sellerInfo.legalName} type="text" name="legalName" id="legalName" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="gstNumber">GST Number</label>
                        <input className={classes.input} onChange={handleOnChange} value={sellerInfo.gstNumber} type="text" name="gstNumber" id="gstNumber" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="phone">Phone</label>
                        <input className={classes.input} onChange={handleOnChange} value={sellerInfo.phone} type="text" name="phone" id="phone" />
                    </div>
                    {!seller && <div className={classes.input_container}>
                        <label htmlFor="password">Password</label>
                        <input className={classes.input} onChange={handleOnChange} value={sellerInfo.password} type="password" name="password" id="password" />
                    </div>}
                    <div className={classes.input_container}>
                        <label htmlFor="state">State</label>
                        <input className={classes.input} onChange={handleOnChange} value={address.state} type="text" name="state" id="state" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="city">City</label>
                        <input className={classes.input} onChange={handleOnChange} value={address.city} type="text" name="city" id="city" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="addressLine">Address Line</label>
                        <input className={classes.input} onChange={handleOnChange} value={address.addressLine} type="text" name="addressLine" id="addressLine" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="pincode">Pincode</label>
                        <input className={classes.input} onChange={handleOnChange} value={address.pincode} type="text" name="pincode" id="pincode" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="contactPersonName">Contact Person Name</label>
                        <input className={classes.input} onChange={handleContactPersonOnChange} value={contactPerson.name} type="text" name="name" id="name" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="contactPersonPhone">Contact Person Phone</label>
                        <input className={classes.input} onChange={handleContactPersonOnChange} value={contactPerson.phone} type="text" name="phone" id="phone" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="contactPersonEmail">Contact Person Email</label>
                        <input className={classes.input} onChange={handleContactPersonOnChange} value={contactPerson.email} type="email" name="email" id="email" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="status">Status</label>
                        <select onChange={handleOnChange} value={sellerInfo.status} className={classes.input} name="status" id="status">
                            <option value="">Select</option>
                            {/* ["IN-REVIEW", "APPROVED", "REJECTED", "HOLD"] */}
                            <option value="IN-REVIEW">In Review</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="HOLD">Hold</option>
                        </select>
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="categoryId">Category</label>
                        <select onChange={handleOnChange} value={sellerInfo.categoryId} className={classes.input} name="categoryId" id="categoryId">
                            <option value={"choose a category"}>choose a category</option>
                            {allCategories?.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    {sellerInfo.categoryId && <div className={classes.input_container}>
                        <label htmlFor="servicesId">Services</label>
                        {/* <div onClick={() => setIsMultiSelectOpen(!isMultiSelectOpen)} className={`${classes.input} ${classes.d_flex}`}>
                            select service
                            <IoIosArrowDown />
                        </div> */}
                        <div className={classes.multi_select}>
                            {allCategoryServices?.map((service) => (
                                <div key={service._id} className={classes.d_flex}>
                                    <label htmlFor={service.name}>{service.name}</label>
                                    <input style={{ width: "20px", height: "20px" }} checked={sellerInfo.services.some((item) => item?.serviceId?._id ? item.serviceId._id === service._id : item.serviceId === service._id)} onChange={(e) => handleServiceOnChange(e, service.name)} type="checkbox" value={service._id} name={service.name} id={service.name} />
                                </div>
                            ))}
                            {allCategoryServices.length === 0 && getServicesLoading &&
                                <p>Loading...</p>
                            }

                            {allCategoryServices.length === 0 && !getServicesLoading &&
                                <p>No service found</p>
                            }
                        </div>
                        {/* <div className={classes.service_container}>
                            {sellerInfo.services.length > 0 && sellerInfo.services.map((item) => (
                                <span key={item.name} className={classes.service}>
                                    {item?.name ? item.name : item.serviceId.name}
                                    <MdClose cursor={"pointer"} size={20} onClick={() => handleRemoveService(item.serviceId._id)} />
                                </span>
                            ))}
                        </div> */}
                    </div>}
                    <div className={classes.input_container}>
                        <label htmlFor="latitude">Latitude</label>
                        <input className={classes.input} onChange={handleLocationOnChange} value={coordinates.latitude} type="number" name="latitude" id="latitude" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="longitude">Longitude</label>
                        <input className={classes.input} onChange={handleLocationOnChange} value={coordinates.longitude} type="number" name="longitude" id="longitude" />
                    </div>
                    {/* <button type='button' className={classes.button} onClick={handleLocationClick}>Get Location</button> */}

                    <div className={classes.button_wrapper}>
                        <button type="submit" className={classes.button}>
                            {addSellerLoading ? "Loading..." : seller ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSellerModal