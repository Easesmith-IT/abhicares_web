import { useRef, useState } from 'react';
import classes from './AddPackageModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoIosArrowDown } from 'react-icons/io';
import useAuthorization from '../../hooks/useAuthorization';
import { MdClose } from 'react-icons/md';

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
    const fileInputRef = useRef(null);


    const generateTwoDigitID = () => {
        const randomID = Math.floor(Math.random() * 90) + 10;
        return randomID;
    }

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
                    resolve({ img: this.result, id: generateTwoDigitID() });
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

    const handleSelectImgDelete = (index, id) => {
        let imgArr = [...packageInfo.img].filter((_, i) => i !== index);
        let prevImgArr = [...packageInfo.previewImages].filter((item) => item.id !== id);

        if (fileInputRef.current && prevImgArr.length === 0) {
            fileInputRef.current.value = null;
        }

        setPackageInfo({ ...packageInfo, img: imgArr, previewImages: prevImgArr });
    }

    const handleDbImgDelete = (Img) => {
        let arr = [...packageInfo.img].filter((item) => item !== Img);

        setPackageInfo({ ...packageInfo, img: arr });
    }

    const handleProductOnChange = (e, name) => {
        const { value, checked } = e.target;
        if (checked) {
            setPackageInfo({ ...packageInfo, products: [...packageInfo.products, { productId: value, name }] })
        }
        else {
            const filtered = packageInfo.products.filter((product) => product.productId !== value);
            setPackageInfo({ ...packageInfo, products: filtered })
        }
    }

    const handleRemoveProduct = (id) => {
        console.log("id", id);
        const filtered = packageInfo.products.filter((product) => product.productId._id !== id);
        setPackageInfo({ ...packageInfo, products: filtered })
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (
            !packageInfo.name
            || !packageInfo.price
            || !packageInfo.offerPrice
            || packageInfo.img.length === 0
            || packageInfo.products.length === 0
        ) {
            toast.error("All the fields are required");
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

    console.log("package", packageInfo);

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
                                        <input checked={packageInfo.products.some((item) => item.productId === product._id)} onChange={(e) => handleProductOnChange(e, product?.name)} type="checkbox" value={product._id} name={product.name} id={product.name} />
                                    </div>
                                ))}
                            </div>
                        }
                        <div className={classes.product_container}>
                            {packageInfo.products.length > 0 && packageInfo.products.map((item) => (
                                <span key={item.name} className={classes.product}>
                                    {item?.name? item.name: item.productId.name}
                                    <MdClose cursor={"pointer"} size={20} onClick={() => handleRemoveProduct(item.productId._id)} />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="img">Image</label>
                        <input ref={fileInputRef} onChange={getImage} multiple type="file" name="img" id="img" />
                    </div>
                    {isImgPrev &&
                        <div className={classes.img_cotainer}>
                            {packageInfo?.previewImages?.map((item, index) => (
                                <div key={index}>
                                    <img width={190} height={150} src={item.img} alt="package" />
                                    <MdClose onClick={() => handleSelectImgDelete(index, item.id)} className={classes.icon} />
                                </div>
                            ))}
                        </div>}
                    {!isImgPrev &&
                        <div className={classes.img_cotainer}>
                            {packageInfo?.img?.map((img, index) => (
                                <div key={index}>
                                    <img width={190} height={150} src={`${process.env.REACT_APP_IMAGE_URL}/${img}`} alt="package" />
                                    <MdClose onClick={() => handleDbImgDelete(img)} className={classes.icon} />
                                </div>
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