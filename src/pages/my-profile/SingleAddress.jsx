import { Box } from '@mui/material'
import classes from './MyProfile.module.css';
import React, { useState } from 'react'
import AddAddressModal from '../../components/addAddressModal/AddAddressModal';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import axios from 'axios';
import toast from 'react-hot-toast';

const SingleAddress = ({ address, index, getProfileDetails }) => {

    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);


    const handleDelete = async () => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/delete-user-address/${address._id}`,
                {
                    withCredentials: true,
                }
            );
            toast.success("Address deleted successfully");
            console.log(res.data);
            setIsDeleteModal(false);
            getProfileDetails();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className={classes.address}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h5>Address {index + 1}</h5>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <MdEdit
                            onClick={() => setIsUpdateModal(true)}
                            cursor={"pointer"}
                            size={20}
                        />
                        <MdDelete
                            onClick={() => setIsDeleteModal(true)}
                            cursor={"pointer"}
                            size={20}
                        />
                    </Box>
                </Box>
                {/* <FaLocationDot size={20} /> */}
                <div><b>Address Line:</b> {address?.addressLine}</div>
                <div><b>Landmark:</b> {address?.landmark}</div>
                <div><b>City:</b> {address?.city}</div>
                <div><b>Pincode:</b> {address?.pincode}</div>
                <div><b>Default Address:</b> {address?.defaultAddress ? "Yes" : "No"}</div>
            </div>

            {isDeleteModal && (
                <DeleteModal
                    handleDelete={handleDelete}
                    setState={setIsDeleteModal}
                />
            )}
            {isUpdateModal && (
                <AddAddressModal
                    isOpen={isUpdateModal}
                    setIsAddAddressModalOpen={setIsUpdateModal}
                    Data={address}
                    getAllAddress={getProfileDetails}
                />
            )}
        </>
    )
}

export default SingleAddress