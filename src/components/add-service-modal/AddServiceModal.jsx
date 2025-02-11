import { useEffect, useRef, useState } from 'react';
import classes from './AddServiceModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import { MdClose } from "react-icons/md";
import usePostApiReq from '../../hooks/usePostApiReq';

const AddServiceModal = ({ setIsModalOpen, categoryId, service = "", getCategoryServices }) => {
  const { res: addServiceRes, fetchData: addService, isLoading: addServiceLoading } = usePostApiReq();
  const { checkAuthorization } = useAuthorization();
  const [description, setDescription] = useState(service?.description || "");
  const [serviceInfo, setServiceInfo] = useState({
    name: service?.name || "",
    startingPrice: service?.startingPrice || "",
    img: service?.imageUrl || "",
    appHomepage: service?.appHomepage || false,
    webHomepage: service?.webHomepage || false,
    previewImage: ""
  });
  const fileInputRef = useRef(null);

  const getImage = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setServiceInfo({ ...serviceInfo, img: uploadedImage, previewImage: this.result })
    });
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setServiceInfo({ ...serviceInfo, [name]: value });
  }

  const handleSelectImgDelete = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setServiceInfo({ ...serviceInfo, img: "", previewImage: "" });
  }

  const handleDbImgDelete = () => {
    setServiceInfo({ ...serviceInfo, img: "", previewImage: "" });
  }


  const navigate = useNavigate()

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!serviceInfo.name || !serviceInfo.startingPrice || !serviceInfo.img || !description) {
      toast.error("All the fields are required");
      return;
    }
    const formData = new FormData();
    formData.append("name", serviceInfo.name);
    formData.append("startingPrice", serviceInfo.startingPrice);
    formData.append("description", description);
    formData.append("appHomepage", serviceInfo.appHomepage);
    formData.append("webHomepage", serviceInfo.webHomepage);
    formData.append("img", serviceInfo.img);
    formData.append("categoryId", categoryId);

    if (service) {
      try {
        const { data } = await axios.patch(`${import.meta.env.VITE_APP_ADMIN_API_URL}/update-service/${service._id}`, formData, { withCredentials: true });
        toast.success("Service updated successfully");
        getCategoryServices();
        setIsModalOpen(false);
      } catch (error) {
        setIsModalOpen(false);
        checkAuthorization(error);
      }
    }
    else {
      addService("/admin/create-service", formData)
    }
  }

  useEffect(() => {
    if (addServiceRes?.status === 200 || addServiceRes?.status === 201) {
      toast.success("Service added successfully");
      getCategoryServices();
      setIsModalOpen(false);
    }
  }, [addServiceRes])


  return (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <div className={classes.heading_container}>
          <h4>{service ? "Update" : "Add"} Service</h4>
          <div className={classes.d_flex}>
            <RxCross2
              onClick={() => setIsModalOpen(false)}
              cursor={"pointer"}
              size={26}
            />
          </div>
        </div>
        <form onSubmit={handleOnSubmit} className={classes.form}>
          <div className={classes.input_container}>
            <label htmlFor="name">Name</label>
            <input
              className={classes.input}
              onChange={handleOnChange}
              value={serviceInfo.name}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="startingPrice">Starting Price</label>
            <input
              className={classes.input}
              onChange={handleOnChange}
              value={serviceInfo.startingPrice}
              type="number"
              name="startingPrice"
              id="startingPrice"
            />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="description">Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />
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
            {serviceInfo.previewImage &&
              <div className={classes.img_container}>
                <img width={200} height={150} src={serviceInfo.previewImage} alt="service" />
                <MdClose onClick={handleSelectImgDelete} className={classes.icon} />
              </div>}
            {!serviceInfo.previewImage && serviceInfo.img &&
              <div className={classes.img_container}>
                <img width={200} height={150} src={`${import.meta.env.VITE_APP_IMAGE_URL}/${serviceInfo.img}`} alt="service" />
                <MdClose onClick={handleDbImgDelete} className={classes.icon} />
              </div>}
          </div>
          <div className={classes.input_container}>
            <label htmlFor="appHomepage">App Homepage</label>
            <select
              onChange={handleOnChange}
              value={serviceInfo.appHomepage}
              className={classes.input}
              name="appHomepage"
              id="appHomepage"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className={classes.input_container}>
            <label htmlFor="webHomepage">Web Homepage</label>
            <select
              onChange={handleOnChange}
              value={serviceInfo.webHomepage}
              className={classes.input}
              name="webHomepage"
              id="webHomepage"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          {/* <div className={classes.input_container}>
                        <label htmlFor="totalProducts">Total Products</label>
                        <input className={classes.input} onChange={handleOnChange} value={serviceInfo.totalProducts} type="number" name="totalProducts" id="totalProducts" />
                    </div> */}
          <div className={classes.button_wrapper}>
            <button className={classes.button}>
              {addServiceLoading ? "Loading..." : service ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServiceModal