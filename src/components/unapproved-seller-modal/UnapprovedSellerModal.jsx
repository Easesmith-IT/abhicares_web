import unapprovedSellerModalClasses from './UnapprovedSellerModal.module.css';
import classes from '../../pages/AdminPanel/Shared.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import Loader from '../loader/Loader';
import usePatchApiReq from '../../hooks/usePatchApiReq';

const UnapprovedSellerModal = ({ setIsUnapprovedSellerModalOpen, getSellers }) => {
    const [allSellers, setAllSellers] = useState([]);
    const navigate = useNavigate()
    const { checkAuthorization } = useAuthorization();
    const [isLoading, setIsLoading] = useState(true);


    const getAllSellers = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_ADMIN_API_URL}/in-review-seller`, { withCredentials: true });
            console.log("appppp", data);
            setAllSellers(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const { res: unapprovedSellerRes, fetchData: unapprovedSellerFetchData } = usePatchApiReq()

    const handleOnChange = async (id) => {
        await unapprovedSellerFetchData(`/admin/update-seller-status/${id}`, { status: "APPROVED" })

    }

    useEffect(() => {
        getAllSellers();
    }, [])

    useEffect(() => {
        if (unapprovedSellerRes?.status === 200 || unapprovedSellerRes?.status === 201) {
            console.log("unapprovedSellerRes", unapprovedSellerRes);
            toast.success("Seller approved");
            getAllSellers();
            getSellers();
        }
    }, [unapprovedSellerRes])
    return (
        <div className={unapprovedSellerModalClasses.wrapper}>
            <div className={unapprovedSellerModalClasses.modal}>
                <div className={unapprovedSellerModalClasses.heading_container}>
                    <h4>Unapproved Seller</h4>
                    <div className={unapprovedSellerModalClasses.d_flex}>
                        <RxCross2 onClick={() => setIsUnapprovedSellerModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <div className={unapprovedSellerModalClasses["report-body"]}>
                    <div className={unapprovedSellerModalClasses["report-topic-heading"]}>
                        <h3 className={classes["t-op"]} style={{ width: "150px" }}>Seller Name</h3>
                        <h3 className={classes["t-op"]} style={{ width: "200px" }}>Service</h3>
                        <h3 className={classes["t-op"]} style={{ width: "150px" }}>Category</h3>
                        <h3 className={classes["t-op"]} style={{ width: "150px" }}>Phone</h3>
                        <h3 className={classes["t-op"]} style={{ width: "150px" }}>Approve</h3>
                    </div>

                    <div className={classes.items}>
                        {!isLoading && allSellers.length === 0 &&
                            <p>No unapproved seller found.</p>
                        }

                        {isLoading
                            && allSellers.length === 0
                            && <Loader />
                        }
                        {allSellers?.map((seller) => (
                            <div key={seller._id} className={unapprovedSellerModalClasses.item1}>
                                <h3 className={classes["t-op-nextlvl"]} style={{ width: "150px" }}>{seller.name}</h3>
                                <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "200px" }}>{seller.services.map((service) => service.name).join(", ")}</h3>
                                <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "150px" }}>{seller.category}</h3>
                                <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "150px" }}>{seller.phone}</h3>
                                <h3 className={`${classes["t-op-nextlvl"]}`} style={{ width: "150px" }}>
                                    {seller.status === "IN-REVIEW" ?
                                        <button onClick={() => handleOnChange(seller._id)} className={unapprovedSellerModalClasses.button}>Approve</button>
                                        : <p>Approved</p>
                                    }
                                </h3>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnapprovedSellerModal