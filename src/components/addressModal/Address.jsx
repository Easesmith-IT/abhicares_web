import { CiMenuKebab } from 'react-icons/ci';
import classes from './AddressModal.module.css';
import AddAddressModal from '../addAddressModal/AddAddressModal';
import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import axios from 'axios';

const Address = ({ data,getAllAddress }) => {
    const [isSetting, setIsSetting] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-user-address/${data._id}`, { withCredentials: true });
            console.log(res.data);
            getAllAddress();
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteModal = (id) => { }

    return (
        <>
            <div className={classes.radio_wrapper}>
                <div>
                    <input className={classes.radio} type="radio" name="radio" id="radio" />
                    <div>
                        <h4>{data.mobile}</h4>
                        <p>{`${data.addressLine},${data.pincode}`}</p>
                    </div>
                </div>
                {/* <CiMenuKebab onClick={()=> setIsSetting(!isSetting)} /> */}
                <div>
                    <MdEdit onClick={() => setIsUpdateModal(true)} cursor={"pointer"} size={20} />
                    <MdDelete onClick={() => setIsDeleteModal(true)} cursor={"pointer"} size={20} />
                </div>
            </div>

            {isDeleteModal &&
                <div className={classes.delete_modal_wrapper}>
                    <div className={classes.delete_modal}>
                        <p>Are you sure to delete ?</p>
                        <div className={classes.button_wrapper}>
                            <button onClick={handleDelete} className={classes.delete_modal_button}>Yes</button>
                            <button onClick={() => setIsDeleteModal(false)} className={classes.delete_modal_button}>No</button>
                        </div>
                    </div>
                </div>
            }
            {isUpdateModal &&
                <AddAddressModal
                    isOpen={isUpdateModal}
                    setIsAddAddressModalOpen={setIsUpdateModal}
                    Data={data}
                />
            }
        </>
    )
}

export default Address