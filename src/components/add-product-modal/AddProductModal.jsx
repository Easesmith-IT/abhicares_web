import { useId, useRef, useState } from 'react';
import classes from './AddProductModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import { MdClose } from 'react-icons/md';
import loader from "../../assets/rolling-white.gif";

const AddProductModal = ({ setIsModalOpen, serviceId, product = "", getAllProducts }) => {
    const { checkAuthorization } = useAuthorization();
    const [description, setDescription] = useState(product?.description || "");

    const generateTwoDigitID = () => {
        const randomID = Math.floor(Math.random() * 90) + 10;
        // const randomID = Date.now();

        return randomID;
    }

    const dbImages = product?.imageUrl?.map((image) => ({ img: `${import.meta.env.VITE_APP_IMAGE_URL}/${image}`, id: generateTwoDigitID() }))

    const [productInfo, setProductInfo] = useState({
        name: product?.name || "",
        price: product?.price || "",
        offerPrice: product?.offerPrice || "",
        img: product?.imageUrl || [],
        previewImages: dbImages || [],
        uploadedImages: [],
    });
    const [isImgPrev, setIsImgPrev] = useState(product ? false : true)
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);


    console.log("prev state", productInfo.previewImages);
    console.log("state", productInfo);

    const getImage = (e) => {
        e.preventDefault();
        setIsImgPrev(() => true);
        console.log("img length", productInfo.img.length === 3);
        const uploadedImages = Array.from(e.target.files);
        if (uploadedImages.length > 3) {
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

        Promise.all(uploadedImages.map((img) => readFile(img)))
            .then((images) => {
                const length = uploadedImages.length;
                const Img = [...productInfo?.img]
                const PrevImg = [...productInfo?.previewImages]
                Img.splice(0, length);
                PrevImg.splice(0, length);

                const data = uploadedImages.map((item, index) => {
                    return { img: item, id: images[index].id }
                })

                setProductInfo((prev) => ({
                    ...prev,
                    previewImages: [...PrevImg, ...images],
                    img: Img,
                    uploadedImages: data
                }));
            });
    }



    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProductInfo({ ...productInfo, [name]: value });
    }

    const handleSelectImgDelete = (index, id) => {
        console.log("id", id);
        let imgArr = [...productInfo.img].filter((_, i) => i !== index);
        let prevImgArr = [...productInfo.previewImages].filter((item) => item.id !== id);
        let uploadedImgArr = [...productInfo.uploadedImages].filter((item) => item.id !== id);
        console.log("prev", prevImgArr);
        console.log("db", imgArr);
        if (fileInputRef.current && prevImgArr.length === 0) {
            fileInputRef.current.value = null;
        }

        setProductInfo({ ...productInfo, img: imgArr, previewImages: prevImgArr, uploadedImages: uploadedImgArr });
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!productInfo.name || !productInfo.price || !productInfo.offerPrice || !description) {
            toast.error("All the fields are required");
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", productInfo.name);
        formData.append("price", productInfo.price);
        formData.append("offerPrice", productInfo.offerPrice);
        formData.append("serviceId", serviceId);
        for (const item of productInfo.uploadedImages) {
            formData.append("img", item.img);
        }
        formData.append("imageUrl", JSON.stringify(productInfo.img));
        formData.append("description", description);


        if (product) {
            try {
                const { data } = await axios.patch(`${import.meta.env.VITE_APP_ADMIN_API_URL}/update-product/${product._id}`, formData, { withCredentials: true });
                toast.success("Product updated successfully");
                getAllProducts();
                setIsModalOpen(false);
            } catch (error) {
                console.log(error);
                setIsModalOpen(false);
                checkAuthorization(error);
            } finally {
                setIsLoading(false);
            }
        }
        else {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_APP_ADMIN_API_URL}/create-product`, formData, { withCredentials: true });
                toast.success("Product added successfully");
                getAllProducts();
                setIsModalOpen(false);
            } catch (error) {
                console.log(error);
                setIsModalOpen(false);
                checkAuthorization(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>{product ? "Update" : "Add"} Product</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="name">Name</label>
                        <input className={classes.input} onChange={handleOnChange} value={productInfo.name} type="text" name="name" id="name" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="price">Price</label>
                        <input className={classes.input} onChange={handleOnChange} value={productInfo.price} type="number" name="price" id="price" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="offerPrice">Offer Price</label>
                        <input className={classes.input} onChange={handleOnChange} value={productInfo.offerPrice} type="number" name="offerPrice" id="offerPrice" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="description">Description</label>
                        <ReactQuill theme="snow" value={description} onChange={setDescription} />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="img">Image</label>
                        <input ref={fileInputRef} onChange={getImage} multiple type="file" name="img" id="img" />
                    </div>
                    <div className={classes.img_cotainer}>
                        {productInfo?.previewImages?.map((item, index) => (
                            <div key={index}>
                                <img key={index} width={190} height={150} src={item.img} alt="product" />
                                <MdClose onClick={() => handleSelectImgDelete(index, item.id)} className={classes.icon} />
                            </div>
                        ))}
                    </div>
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{isLoading ? <img className={classes.loader} src={loader} alt="loader" /> : (product ? "Update" : "Add")}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProductModal