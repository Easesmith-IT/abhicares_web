import { useState } from 'react';
import classes from './AddProductModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';

const AddProductModal = ({ setIsModalOpen, serviceId, product = "", getAllProducts }) => {
    const { checkAuthorization } = useAuthorization();
    const [description, setDescription] = useState(product?.description || "");
    const [productInfo, setProductInfo] = useState({
        name: product?.name || "",
        price: product?.price || "",
        offerPrice: product?.offerPrice || "",
        img: product?.imageUrl || ["https://www.shutterstock.com/image-photo/interior-hotel-bathroom-260nw-283653278.jpg"],
        previewImages: []
    });
    const [isImgPrev, setIsImgPrev] = useState(product ? false : true)


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
                setProductInfo((prev) => ({ ...prev, previewImages: [...images] }));
                setProductInfo((prev) => ({ ...prev, img: uploadedImage }));
            });
    }


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProductInfo({ ...productInfo, [name]: value });
    }
    const navigate = useNavigate()

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!productInfo.name || !productInfo.price || !productInfo.offerPrice || !productInfo.img || !description) {
            return;
        }
        const formData = new FormData();
        formData.append("name", productInfo.name);
        formData.append("price", productInfo.price);
        formData.append("offerPrice", productInfo.offerPrice);
        formData.append("serviceId", serviceId);
        for (const img of productInfo.img) {
            formData.append("img", img);
        }
        formData.append("description", description);


        if (product) {
            try {
                const { data } = await axios.patch(`${process.env.REACT_APP_ADMIN_API_URL}/update-product/${product._id}`, formData, { withCredentials: true });
                toast.success("Product updated successfully");
                getAllProducts();
                setIsModalOpen(false);
            } catch (error) {
                console.log(error);
                setIsModalOpen(false);
                checkAuthorization(error);
            }
        }
        else {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_ADMIN_API_URL}/create-product`, formData, { withCredentials: true });
                toast.success("Product added successfully");
                getAllProducts();
                setIsModalOpen(false);
            } catch (error) {
                console.log(error);
                setIsModalOpen(false);
                checkAuthorization(error);
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
                        <input onChange={getImage} multiple={2} type="file" name="img" id="img" />
                    </div>
                    {isImgPrev &&
                        <div className={classes.img_cotainer}>
                            {productInfo?.previewImages?.map((item, index) => (
                                <img key={index} width={190} height={150} src={item.img} alt="product" />
                            ))}
                        </div>}
                    {!isImgPrev &&
                        <div className={classes.img_cotainer}>
                            {productInfo?.img?.map((img, index) => (
                                <img key={index} width={190} height={150} src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${img}`} alt="product" />
                            ))}
                        </div>}
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{product ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProductModal