import { useEffect, useState } from 'react';
import classes from './SeoModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAuthorization from '../../hooks/useAuthorization';

const SeoModal = ({ setIsModalOpen, subAdmin }) => {
    const [description, setDescription] = useState("");
    const [info, setInfo] = useState({
        title: "",
        page: "",
        desc: "",
    });

    const { checkAuthorization } = useAuthorization();

    const handleSelectChange = async (e) => {
        const { value } = e.target;
        try {
            setInfo((prev) => ({ ...prev, page: value }))
            const { data } = await axios.get(`${process.env.REACT_APP_CMS_URL}/get-seo-by-page?page=${value}`, { withCredentials: true });
            console.log("seo", data);
            setInfo((prev) => ({ ...prev, title: data.seo.seoTitle, desc: data.seo.seoDescription }))
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChange = async (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value })
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log("page", info.page);
        if (!info.title || !info.desc) {
            return;
        }
        try {
            const res = await axios.patch(`${process.env.REACT_APP_CMS_URL}/update-seo-by-page`, { page: info.page, seoDescription: info.desc, seoTitle: info.title }, { withCredentials: true });
            console.log("update seo", res.data);
            if (res.status === 200) {
                toast.success("Seo updated successfully");
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            setIsModalOpen(false);
            checkAuthorization(error);
        }
    }



    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Manage SEO</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="page">Page</label>
                        <select
                            className={classes.input}
                            name="page"
                            value={info.page}
                            onChange={handleSelectChange}
                        >
                            <option value="">Select</option>
                            <option value="womens-salon-spa">Women's salon & spa</option>
                            <option value="makeup-mehandi">Makeup & Mehandi</option>
                            <option value="mens-salon-massage">Men's Salon & Massage</option>
                            <option value="home-care">Home Care</option>
                            <option value="home-repair">Home Repair</option>
                            <option value="appliance-repair">Appliance Repair</option>
                            <option value="home-page">Home Page</option>
                            <option value="about-us">About Us</option>
                            <option value="register-as-professional">Register as Professional</option>
                            <option value="blogs">Blogs</option>
                        </select>
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="title">Title</label>
                        <input className={classes.input} onChange={handleOnChange} value={info.title} type="text" name="title" id="title" placeholder="enter title" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="desc">Description</label>
                        <textarea className={classes.input} onChange={handleOnChange} value={info.desc} name="desc" id="desc" placeholder="enter description" />
                    </div>
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SeoModal