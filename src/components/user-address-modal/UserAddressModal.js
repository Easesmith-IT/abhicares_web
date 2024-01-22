import { useEffect, useState } from 'react';
import classes from './UserAddressModal.module.css';
import { RxCross2 } from 'react-icons/rx';

import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../loader/Loader';

const UserAddressModal = ({ setIsModalOpen, userId }) => {
    const [allAddresses, setAllAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllAddress = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-all-addresses/${userId}`, { withCredentials: true });
            setAllAddresses(data.addresses)
            console.log("address", data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getAllAddress()
    }, [])


    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>User Addresses</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <div className={classes.addresses_container}>
                    {!isLoading
                        && allAddresses?.length === 0
                        && <p>No address found</p>
                    }

                    {isLoading
                        && allAddresses?.length === 0
                        && <Loader />
                    }

                    {allAddresses && allAddresses.map((address) => (
                        <div className={classes.address}>
                            <div className={classes.partner_left}>
                                <p><b>Address Line:</b> {address.addressLine}</p>
                                <p><b>Landmark:</b> {address.landmark}</p>
                                <p><b>City:</b> {address.city}</p>
                                <p><b>Pincode:</b> {address.pincode}</p>
                                <p><b>Default Address:</b> {`${address.defaultAddress}`}</p>
                                <p><b>Co-ordinates:</b> {`${address.location.coordinates[0]}, ${address.location.coordinates[1]}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserAddressModal