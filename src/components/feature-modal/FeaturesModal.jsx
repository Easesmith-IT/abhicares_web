import { useEffect, useState } from 'react';
import classes from './FeaturesModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import AddFeatureModal from '../add-feature-modal/AddFeatureModal';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import DeleteModal from '../deleteModal/DeleteModal';
import usePostApiReq from '../../hooks/usePostApiReq';

const FeaturesModal = ({ setIsModalOpen, allFeatures = [], getServiceDetails, serviceId }) => {
    const { res: deleteServiceRes, fetchData: deleteService, isLoading: deleteServiceLoading } = usePostApiReq();
    const { checkAuthorization } = useAuthorization();
    const navigate = useNavigate();
    const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false);
    const [isUpdateFeatureModalOpen, setIsUpdateFeatureModalOpen] = useState(false);
    const [isDeleteFeatureModalOpen, setIsDeleteFeatureModalOpen] = useState(false);
    const [feature, setFeature] = useState("");
    const [index, setIndex] = useState(null);


    const handleDelete = async (e) => {
        e.preventDefault();
        deleteService(`/admin/delete-service-feature/${serviceId}?title=${feature?.title}`)
    }

    useEffect(() => {
        if (deleteServiceRes?.status === 200 || deleteServiceRes?.status === 201) {
            toast.success(deleteServiceRes?.data?.message);
            getServiceDetails();
            setIsDeleteFeatureModalOpen(false);
        }
    }, [deleteServiceRes])

    const handleFeatureEdit = async (data, i) => {
        setFeature(data);
        setIndex(i);
        setIsUpdateFeatureModalOpen(true);
    }

    const handleFeatureDelete = async (data) => {
        setFeature(data);
        setIsDeleteFeatureModalOpen(true);
    }

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.modal}>
                    <div className={classes.heading_container}>
                        <h4>Features</h4>
                        <div className={classes.d_flex}>
                            <button
                                className={classes.button}
                                onClick={() => setIsAddFeatureModalOpen(true)}
                            >Add Feature</button>
                            <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                        </div>
                    </div>
                    <div className={classes.features}>
                        {allFeatures.length === 0 && <p>No features found</p>}

                        {allFeatures?.map((feature, i) => (
                            <div className={classes.feature}>
                                <div className={classes.feature_wrapper}>
                                    <div className={classes.feature_img}>
                                        <img src={`${import.meta.env.VITE_APP_IMAGE_URL}/${feature?.image}`} alt="feature" />
                                    </div>
                                    <div className={classes.feature_content}>
                                        <h5>{feature?.title}</h5>
                                        <p>{feature?.description}</p>
                                    </div>
                                </div>
                                <div className={classes.icons_cotainer}>
                                    <FaEdit onClick={() => handleFeatureEdit(feature, i)} size={22} cursor={"pointer"} />
                                    <MdDelete onClick={() => handleFeatureDelete(feature)} color='red' size={22} cursor={"pointer"} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {isAddFeatureModalOpen &&
                <AddFeatureModal
                    setIsModalOpen={setIsAddFeatureModalOpen}
                    getServiceDetails={getServiceDetails}
                    serviceId={serviceId}
                />
            }

            {isUpdateFeatureModalOpen &&
                <AddFeatureModal
                    setIsModalOpen={setIsUpdateFeatureModalOpen}
                    feature={feature}
                    getServiceDetails={getServiceDetails}
                    serviceId={serviceId}
                    index={index}
                />
            }

            {isDeleteFeatureModalOpen &&
                <DeleteModal
                    handleDelete={handleDelete}
                    setState={setIsDeleteFeatureModalOpen}
                />
            }
        </>
    )
}

export default FeaturesModal