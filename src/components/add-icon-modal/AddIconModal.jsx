import React,{useRef, useState} from 'react';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';

import classes from '../add-service-modal/AddServiceModal.module.css'

const AddIconModal = ({ setIsUploadIcnModal,serviceId }) => {
  const { checkAuthorization } = useAuthorization();
  const fileInputRef = useRef(null);
  const [imagePreview,setImagePreview] = useState({img:'',previewImage:''})
    const handleOnSubmit = async(e) => {
      e.preventDefault()
          const formData = new FormData();
      formData.append("img", imagePreview.img);
      
          try {
            const { data } = await axios.post(`${process.env.REACT_APP_ADMIN_API_URL}/upload-service-icon/${serviceId}`, formData, { withCredentials: true });
            console.log(data)
        toast.success("Service updated successfully");
        setIsUploadIcnModal(false);
      } catch (error) {
        setIsUploadIcnModal(false);
        checkAuthorization(error);
      }
  }

   const getImage = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setImagePreview({  img: uploadedImage, previewImage: this.result })
    });
  }
  
   
  return (
    <div className={classes.wrapper}>
      <div className={classes.modal} style={{height:'40vh'}}>
        <div className={classes.heading_container}>
          <h4>Upload Icon</h4>
          <div className={classes.d_flex}>
            <RxCross2
              onClick={() => setIsUploadIcnModal(false)}
              cursor={"pointer"}
              size={26}
            />
          </div>
        </div>
        <form onSubmit={handleOnSubmit} className={classes.form}>

          <div className={classes.input_container}>
            <label htmlFor="imageUrl">Image</label>
            <input
              ref={fileInputRef}
              onChange={getImage}
              type="file"
              name="imageUrl"
              id="imageUrl"
            />
            {imagePreview.previewImage &&
              <div className={classes.img_container}>
                <img width={200} height={150} src={imagePreview.previewImage} alt="service" />
              </div>}
    
          </div>

          <div className={classes.button_wrapper}>
            <button className={classes.button}>
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddIconModal