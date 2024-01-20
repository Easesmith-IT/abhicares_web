import { useEffect, useState } from 'react';
import classes from './WalletViewModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import { useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import CashOutReq from '../cash-out-req/CashOutReq';
import Loader from '../loader/Loader';

const WalletViewModal = ({ setIsViewWalletModalOpen,id,getSellerWallet }) => {
    const [cashOutRequests, setCashOutRequests] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();


    const getCashOutRequests = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_ADMIN_API_URL}/get-seller-wallet-cashout-requests/${id}`, { withCredentials: true }
            );
            setCashOutRequests(data.cashouts);
            console.log("cash req", data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCashOutRequests();
    }, [])



    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Wallet</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsViewWalletModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                {isLoading
                    && cashOutRequests.length === 0
                    && <Loader />
                }
                {!isLoading
                    && cashOutRequests.length === 0
                    && <p>No cashOut Requests found</p>
                }
                <div className={classes.tran_contianer}>
                    {
                        cashOutRequests?.map((item) => (
                            <CashOutReq
                                key={item._id}
                                item={item}
                                getSellerWallet={getSellerWallet}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default WalletViewModal