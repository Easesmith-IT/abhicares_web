import { useState } from 'react'
import classes from './CashOutReq.module.css'
import UpdateCashoutReqModal from '../update-cashoutReq-modal/UpdateCashoutReqModal';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const CashOutReq = ({ item = "", getSellerWallet, setIsViewWalletModalOpen }) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <>
            <div className={classes.card}>
                <div>
                    <h6>{item?.cashoutId}</h6>
                    <p>Date : {item.createdAt && format(new Date(item?.createdAt), "dd-MM-yyyy")}</p>
                </div>
                <div>
                    <h6>₹ {item?.value}</h6>
                    <p className={item.status === "cancelled" ? classes.red : item.status === "completed" ? classes.green : classes.blue}>{item?.status}</p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <FaEye size={22} cursor={"pointer"} onClick={() => navigate(`/admin/seller-cashouts/${item?._id}`)} />
                    <button onClick={() => setIsUpdateModalOpen(true)} className={classes.update_btn}>Update</button>
                </div>
            </div>

            {isUpdateModalOpen &&
                <UpdateCashoutReqModal
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                    cashOutReq={item}
                    getSellerWallet={getSellerWallet}
                    setIsViewWalletModalOpen={setIsViewWalletModalOpen}
                />
            }
        </>
    )
}

export default CashOutReq