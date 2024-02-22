import { useEffect, useState } from 'react';
import classes from './UpdateBannerModal.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';

import { RxCross2 } from 'react-icons/rx';
import useAuthorization from '../../hooks/useAuthorization';


const UpdateBannerModal = ({ setIsModalOpen, getBannersFromServer, data }) => {
    const { checkAuthorization } = useAuthorization();
    const [info, setInfo] = useState({
        serviceId: "",
        categoryId: ""
    })


    const [allCategories, setAllCategories] = useState([]);
    const [allCategoryServices, setAllCategoryServices] = useState([]);
    const [isSelceted, setIsSelceted] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setIsSelceted(true);
        }
        else {
            setIsSelceted(false);
        }
    }

    const getAllCategories = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-all-category`, { withCredentials: true })
            console.log('categories', data.data)
            setAllCategories(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [])

    const getCategoryServices = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-category-service/${info.categoryId}`, { withCredentials: true });
            console.log("allCategoryServices", data.data);
            setAllCategoryServices(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategoryServices();
    }, [info.categoryId])


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log("info", info);

        const formDataHero = new FormData();

        formDataHero.append("img", data.img);
        formDataHero.append("type", data.type);
        formDataHero.append("serviceId", info.serviceId);

        formDataHero.append("page", data.page);
        formDataHero.append("section", data.section);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_CMS_URL}/upload-banners`,
                formDataHero,
                { withCredentials: true }
            );

            if (response.status === 200) {
                setIsModalOpen(false);
                getBannersFromServer();
                toast.success("Updated successfully!");
            }
        } catch (err) {
            console.log("ERROR", err.message);
            checkAuthorization(err);
        }
    }


    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Update Banner</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.select}>
                        <input onChange={handleCheckbox} value={isSelceted} type="checkbox" name="checkbox" id="checkbox" />
                        Does not want to specify category and service.
                    </div>
                    {!isSelceted &&
                        <>
                            <div className={classes.input_container}>
                                <label htmlFor="categoryId">Category</label>
                                <select onChange={handleOnChange} value={info.categoryId} className={classes.input} name="categoryId" id="categoryId">
                                    <option value={"choose a category"}>Select a category</option>
                                    {allCategories?.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            {info.categoryId &&
                                <div className={classes.input_container}>
                                    <label htmlFor="serviceId">Service</label>
                                    <select onChange={handleOnChange} value={info.serviceId} className={classes.input} name="serviceId" id="serviceId">
                                        <option value={"choose a service"}>Select a service</option>
                                        {allCategoryServices?.map((service) => (
                                            <option key={service._id} value={service._id}>{service.name}</option>
                                        ))}
                                    </select>
                                </div>}
                        </>}

                    <div className={classes.button_wrapper}>
                        <button type="submit" className={classes.button}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateBannerModal