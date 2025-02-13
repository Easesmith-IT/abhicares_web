import { CiMenuKebab } from "react-icons/ci";
import classes from "./AddressModal.module.css";
import AddAddressModal from "../addAddressModal/AddAddressModal";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import useDeleteApiReq from "../../hooks/useDeleteApiReq";

const Address = ({ data, getAllAddress, setTemporaryAddress }) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { res: deleteUserAddressRes, fetchData: deleteUserAddress, isLoading: deleteUserAddressLoading } = useDeleteApiReq();

  const handleDelete = async () => {
    deleteUserAddress(`/shopping/delete-user-address/${data._id}`)
  };

  useEffect(() => {
    if (deleteUserAddressRes?.status === 200 || deleteUserAddressRes?.status === 201) {
      toast.success("Address deleted successfully");
      setIsDeleteModal(false);
      getAllAddress();
    }
  }, [deleteUserAddressRes])

  const handleOnChange = (e) => {
    setTemporaryAddress(data);
  };

  return (
    <>
      <div className={classes.radio_wrapper}>
        <div>
          <input
            onChange={handleOnChange}
            className={classes.radio}
            type="radio"
            name="radio"
            id="radio"
            value={data.addressLine}
          />
          <div>
            <h4>{data.mobile}</h4>
            <p>{`${data.addressLine},${data.pincode}`}</p>
          </div>
        </div>
        <div>
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
        </div>
      </div>

      {isDeleteModal && (
        <div className={classes.delete_modal_wrapper}>
          <div className={classes.delete_modal}>
            <p>Are you sure to delete ?</p>
            <div className={classes.button_wrapper}>
              <button
                onClick={handleDelete}
                className={classes.delete_modal_button}
              >
                Yes
              </button>
              <button
                onClick={() => setIsDeleteModal(false)}
                className={classes.delete_modal_button}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {isUpdateModal && (
        <AddAddressModal
          isOpen={isUpdateModal}
          setIsAddAddressModalOpen={setIsUpdateModal}
          Data={data}
          getAllAddress={getAllAddress}
        />
      )}
    </>
  );
};

export default Address;
