import classes from './Settings.module.css'
import Wrapper from '../../Wrapper'
import { useEffect, useState } from 'react';
import AddSubAdminModal from '../../../components/add-subadmin-modal/AddSubAdminModal';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import axios from 'axios';
import SeoModal from '../../../components/seo-modal/SeoModal';

const Settings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [subAdmin, setSubadmin] = useState({});
    const [allSubadmins, setAllSubadmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleUpdateModal = (data) => {
        setSubadmin(data);
        setIsUpdateModalOpen(!isUpdateModalOpen);
    };

    const handleDeleteModal = (id) => {
        setSubadmin(id);
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_ADMIN_API_URL}/delete-availabe-city/${subAdmin}`, { withCredentials: true });
            toast.success("Subadmin deleted successfully");
            setIsDeleteModalOpen(!isDeleteModalOpen);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubadmins = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-sub-admins`, { withCredentials: true });
            console.log("data", data);
            setAllSubadmins(data?.admins);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSubadmins();
    }, [])


    return (
        <Wrapper>
            <div className={classes.settings}>
                <div className={classes.heading_container}>
                    <h1>Settings</h1>
                    <div className={classes.btn_wrapper}>
                        <button onClick={() => setIsSeoModalOpen(true)} className={classes.button}>Manage SEO</button>
                        <button onClick={() => setIsModalOpen(true)} className={classes.button}>Add Subadmin</button>
                    </div>
                </div>

                <div className={classes.container}>
                    {allSubadmins?.map((subadmin) => (
                        <div key={subadmin._id} className={classes.item}>
                            <div className={classes.left}>
                                <p>Name: {subadmin.name}</p>
                                <p>Username: {subadmin.adminId}</p>
                                <p>Role: {subadmin.role}</p>
                                <p>Status: {subadmin.status ? "Active" : "InActive"}</p>
                            </div>
                            <div className={classes.right}>
                                <FiEdit onClick={() => handleUpdateModal(subadmin)} cursor={"pointer"} size={20} />
                                <MdDelete onClick={() => handleDeleteModal("")} cursor={"pointer"} size={22} color='red' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isSeoModalOpen &&
                <SeoModal
                    setIsModalOpen={setIsSeoModalOpen}
                />
            }

            {isModalOpen &&
                <AddSubAdminModal
                    setIsModalOpen={setIsModalOpen}
                    getSubadmins={getSubadmins}
                />
            }

            {isUpdateModalOpen &&
                <AddSubAdminModal
                    setIsModalOpen={setIsUpdateModalOpen}
                    getSubadmins={getSubadmins}
                    subAdmin={subAdmin}
                />
            }

            {/* {isDeleteModalOpen &&
                <Dele
                    setIsModalOpen={setIsUpdateModalOpen}
                />
            } */}
        </Wrapper>
    )
}

export default Settings