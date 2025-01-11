import React, { useState } from 'react'
import classes from "./Settings.module.css";
import { FaEdit } from 'react-icons/fa';
import UpdateComisionModal from './UpdateComisionModal';

const SingleComisionComp = ({ item ,getAllCategories}) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    return (
        <>
            <div className={classes.card}>
                <div>
                    <h5>{item?.name}</h5>
                    <p><b>Commission Rate :</b> {item?.commission}%</p>
                    <p><b>Convience Amount :</b> ₹{item?.convenience}</p>
                </div>
                <FaEdit onClick={() => setIsUpdateModalOpen(true)} size={20} style={{ cursor: "pointer" }} />
            </div>
            {isUpdateModalOpen &&
                <UpdateComisionModal
                    getAllComisions={() => { }}
                    setIsModalOpen={setIsUpdateModalOpen}
                    commission={item}
                    getAllCategories={getAllCategories}
                />
            }
        </>
    )
}

export default SingleComisionComp