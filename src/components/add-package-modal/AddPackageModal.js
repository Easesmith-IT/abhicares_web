import { useState } from 'react';
import classes from './AddPackageModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoIosArrowDown } from 'react-icons/io';
import useAuthorization from '../../hooks/useAuthorization';

const AddPackageModal = ({ setIsModalOpen, serviceId, getAllPackage, allProducts, selectedPackage }) => {
    const navigate = useNavigate()
    const { checkAuthorization } = useAuthorization();

    const [packageInfo, setPackageInfo] = useState({
        name: selectedPackage?.name || "",
        price: selectedPackage?.price || "",
        offerPrice: selectedPackage?.offerPrice || "",
        img: selectedPackage?.imageUrl || [],
        products: selectedPackage?.products || [],
        previewImages: []
    });
    const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
    const [isImgPrev, setIsImgPrev] = useState(selectedPackage ? false : true)




    const getImage = (e) => {
        e.preventDefault();
        setIsImgPrev(() => true);
        const uploadedImage = Array.from(e.target.files);
        if (uploadedImage.length > 3) {
            toast.error("Cannot upload files more than 3");
            e.target.value = null;
            return;
        }

        const readFile = (img) => {
            return new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(img);
                fileReader.addEventListener("load", function () {
                    resolve({ img: this.result });
                });
            });
        };

        Promise.all(uploadedImage.map(img => readFile(img)))
            .then(images => {
                setPackageInfo((prev) => ({ ...prev, previewImages: [...images] }));
                setPackageInfo((prev) => ({ ...prev, img: uploadedImage }));
            });
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPackageInfo({ ...packageInfo, [name]: value });
    }

    const handleProductOnChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPackageInfo({ ...packageInfo, products: [...packageInfo.products, { productId: value }] })
        }
        else {
            const filtered = packageInfo.products.filter((product) => product.productId !== value);
            setPackageInfo({ ...packageInfo, products: filtered })
        }
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (
            !packageInfo.name
            || !packageInfo.price
            || !packageInfo.offerPrice
            || !packageInfo.img
        ) {
            return;
        }
        const formData = new FormData();
        formData.append("name", packageInfo.name);
        formData.append("price", packageInfo.price);
        formData.append("offerPrice", packageInfo.offerPrice);
        formData.append("serviceId", serviceId);
        formData.append("products", JSON.stringify(packageInfo.products));
        for (const img of packageInfo.img) {
            formData.append("img", img);
        }


        if (selectedPackage) {
            try {
                const { data } = await axios.patch(`${process.env.REACT_APP_ADMIN_API_URL}/update-package/${selectedPackage._id}`, formData, { withCredentials: true });
                toast.success("Package updated successfully");
                getAllPackage();
                setIsModalOpen(false);
            } catch (error) {
                setIsModalOpen(false);
                checkAuthorization(error);
                console.log(error);
            }
        }
        else {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_ADMIN_API_URL}/create-package`, formData, { withCredentials: true });
                toast.success("Package added successfully");
                getAllPackage();
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
                    <h4>{selectedPackage ? "Update" : "Add"} Package</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="name">Name</label>
                        <input className={classes.input} onChange={handleOnChange} value={packageInfo.name} type="text" name="name" id="name" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="price">Price</label>
                        <input className={classes.input} onChange={handleOnChange} value={packageInfo.price} type="number" name="price" id="price" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="offerPrice">Offer Price</label>
                        <input className={classes.input} onChange={handleOnChange} value={packageInfo.offerPrice} type="number" name="offerPrice" id="offerPrice" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="Products">Products</label>
                        <div onClick={() => setIsMultiSelectOpen(!isMultiSelectOpen)} className={`${classes.input} ${classes.d_flex}`}>
                            select product
                            <IoIosArrowDown />
                        </div>
                        {isMultiSelectOpen &&
                            <div className={classes.multi_select}>
                                {allProducts?.map((product) => (
                                    <div key={product._id} className={classes.d_flex}>
                                        <label htmlFor={product.name}>{product.name}</label>
                                        <input checked={packageInfo.products.some((item) => item.productId === product._id)} onChange={handleProductOnChange} type="checkbox" value={product._id} name={product.name} id={product.name} />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="img">Image</label>
                        <input onChange={getImage} multiple type="file" name="img" id="img" />
                    </div>
                    {isImgPrev &&
                        <div className={classes.img_cotainer}>
                            {packageInfo?.previewImages?.map((item, index) => (
                                <img key={index} width={190} height={150} src={item.img} alt="product" />
                            ))}
                        </div>}
                    {!isImgPrev &&
                        <div className={classes.img_cotainer}>
                            {packageInfo?.img?.map((img, index) => (
                                <img key={index} width={190} height={150} src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${img}`} alt="product" />
                            ))}
                        </div>}
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{selectedPackage ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPackageModal