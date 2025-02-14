import { useState } from 'react'
import classes from './CashOutReq.module.css'
import UpdateCashoutReqModal from '../update-cashoutReq-modal/UpdateCashoutReqModal';
import { format } from 'date-fns';

const CashOutReq = ({ item = "", getSellerWallet, setIsViewWalletModalOpen }) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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
                <button onClick={() => setIsUpdateModalOpen(true)} className={classes.update_btn}>Update</button>
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