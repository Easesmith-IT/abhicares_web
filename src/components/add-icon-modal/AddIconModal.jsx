import { useEffect, useRef, useState } from 'react';
import classes from './AddIconModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import usePostApiReq from '../../hooks/usePostApiReq';

const AddIconModal = ({ setIsModalOpen, serviceId, getServiceDetails }) => {
    const { res: addIconRes, fetchData: addIcon, isLoading: addIconLoading } = usePostApiReq();
    const { checkAuthorization } = useAuthorization();
    const [iconInfo, setIconInfo] = useState({
        icon: "",
        iconPrev: "",
    });
    const [isImgPrev, setIsImgPrev] = useState(false);
    const fileInputRef = useRef(null);

    const getImage = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setIconInfo({ ...iconInfo, icon: uploadedImage, iconPrev: this.result })
        });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!iconInfo.icon) {
            toast.error("Choose icon");
            return;
        }

        const formData = new FormData();
        formData.append("img", iconInfo.icon);

        addIcon(`/admin/upload-service-icon/${serviceId}`, formData)
    }

    useEffect(() => {
        if (addIconRes?.status === 200 || addIconRes?.status === 201) {
            toast.success("Icon added successfully");
            setIsModalOpen(false);
            getServiceDetails();
        }
    }, [addIconRes])

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Upload Icon</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="icon">Icon</label>
                        <input
                            ref={fileInputRef}
                            onChange={getImage}
                            type="file"
                            name="icon"
                            id="icon"
                        />
                        {iconInfo.iconPrev &&
                            <div className={classes.img_container}>
                                <img width={200} height={150} src={iconInfo.iconPrev} alt="feature" />
                                {/* <MdClose onClick={handleSelectImgDelete} className={classes.icon} /> */}
                            </div>}
                        {!iconInfo.iconPrev && iconInfo.icon &&
                            <div className={classes.img_container}>
                                <img width={200} height={150} src={`${import.meta.env.VITE_APP_IMAGE_URL}/${iconInfo.icon}`} alt="feature" />
                                {/* <MdClose onClick={handleDbImgDelete} className={classes.icon} /> */}
                            </div>}
                    </div>
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{addIconLoading ? "Uploading..." : "Upload"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddIconModal