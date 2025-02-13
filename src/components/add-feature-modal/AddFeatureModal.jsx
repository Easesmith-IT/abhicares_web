import { useEffect, useRef, useState } from 'react';
import classes from './AddFeatureModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import usePatchApiReq from '../../hooks/usePatchApiReq';
import usePostApiReq from '../../hooks/usePostApiReq';

const AddFeatureModal = ({ setIsModalOpen, feature, getServiceDetails, serviceId, index }) => {
    const { res: addFeatureRes, fetchData: addFeature, isLoading: addFeatureLoading } = usePostApiReq();
    console.log("index", index);

    const navigate = useNavigate()
    const { checkAuthorization } = useAuthorization();

    const [featureInfo, setFeatureInfo] = useState({
        name: feature?.title || "",
        description: feature?.description || "",
        img: feature?.image || "",
        previewImage: ""
    });
    const [isImgPrev, setIsImgPrev] = useState(feature ? false : true)
    const fileInputRef = useRef(null);

    const getImage = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setFeatureInfo({ ...featureInfo, img: uploadedImage, previewImage: this.result })
        });
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFeatureInfo({ ...featureInfo, [name]: value });
    }

    const handleSelectImgDelete = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
        setFeatureInfo({ ...featureInfo, img: "", previewImage: "" });
    }

    const handleDbImgDelete = () => {
        setFeatureInfo({ ...featureInfo, img: "", previewImage: "" });
    }


    const { res: addFeatureRes, fetchData: addFeatureFetchData } = usePatchApiReq()

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (
            !featureInfo.name
            || !featureInfo.description
            || !featureInfo.img
        ) {
            toast.error("All the fields are required");
            return;
        }
        const formData = new FormData();
        formData.append("title", featureInfo.name);
        formData.append("description", featureInfo.description);
        formData.append("img", featureInfo.img);
        if (feature) {
            formData.append("index", index);
        }


        if (feature) {
            await addFeatureFetchData(`/admin/update-service-feature/${serviceId}`, formData)
        }
        else {
            addFeature(`/admin/add-service-feature/${serviceId}`, formData);
        }
    }

    useEffect(() => {
        if (addFeatureRes?.status === 200 || addFeatureRes?.status === 201) {

            console.log("addFeatureRes", addFeatureRes);
            toast.success("Feature updated successfully");
            setIsModalOpen(false);
            getServiceDetails();
        }
    }, [addFeatureRes])

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>{feature ? "Update" : "Add"} Feature</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="name">Name</label>
                        <input className={classes.input} onChange={handleOnChange} value={featureInfo.name} type="text" name="name" id="name" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="description">Description</label>
                        <input className={classes.input} onChange={handleOnChange} value={featureInfo.description} type="text" name="description" id="description" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="imageUrl">Image</label>
                        <input
                            ref={fileInputRef}
                            onChange={getImage}
                            type="file"
                            name="imageUrl"
                            id="imageUrl"
                        />
                        {featureInfo.previewImage &&
                            <div className={classes.img_container}>
                                <img width={200} height={150} src={featureInfo.previewImage} alt="feature" />
                                {/* <MdClose onClick={handleSelectImgDelete} className={classes.icon} /> */}
                            </div>}
                        {!featureInfo.previewImage && featureInfo.img &&
                            <div className={classes.img_container}>
                                <img width={200} height={150} src={`${import.meta.env.VITE_APP_IMAGE_URL}/${featureInfo.img}`} alt="feature" />
                                {/* <MdClose onClick={handleDbImgDelete} className={classes.icon} /> */}
                            </div>}
                    </div>

                    <div className={classes.button_wrapper}>
                        <button className={classes.button} onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button className={classes.button}>{addFeatureLoading ? "Loading..." : feature ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFeatureModal