import { CiMenuKebab } from "react-icons/ci";
import classes from "./AddressModal.module.css";
import AddAddressModal from "../addAddressModal/AddAddressModal";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const Address = ({ data, getAllAddress, setTemporaryAddress }) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);


  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/delete-user-address/${data._id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Address deleted successfully");
      console.log(res.data);
      setIsDeleteModal(false);
      getAllAddress();
    } catch (error) {
      console.log(error);
    }
  };

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
