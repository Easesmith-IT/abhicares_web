import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import AddAddressModal from '../../components/addAddressModal/AddAddressModal';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import useDeleteApiReq from '../../hooks/useDeleteApiReq';
import classes from './MyProfile.module.css';

const SingleAddress = ({ address, index, getProfileDetails }) => {
    const { res: deleteAddressRes, fetchData: deleteAddress, isLoading: deleteAddressLoading } = useDeleteApiReq();

    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);


    const handleDelete = async () => {
        deleteAddress(`/shopping/delete-user-address/${address._id}`)
    };

    useEffect(() => {
        if (deleteAddressRes?.status === 200 || deleteAddressRes?.status === 201) {
            toast.success("Address deleted successfully");
            setIsDeleteModal(false);
            getProfileDetails();
        }
    }, [deleteAddressRes])


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