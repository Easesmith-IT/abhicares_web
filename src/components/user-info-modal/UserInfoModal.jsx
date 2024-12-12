import classes from './UserInfoModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import parse from 'html-react-parser';
import { format } from 'date-fns';
import { useState } from 'react';
import UserAddressModal from '../user-address-modal/UserAddressModal';

const UserInfoModal = ({ setIsUserInfoModalOpen, user }) => {
    console.log(user);
    const [isUserAddressModalOpen, setIsUserAddressModalOpen] = useState(false);
    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.modal}>
                    <div className={classes.heading_container}>
                        <h4>User Info</h4>
                        <div className={classes.d_flex}>
                            <button onClick={() => setIsUserAddressModalOpen(true)} className={classes.btn}>View all address</button>
                            <RxCross2 onClick={() => setIsUserInfoModalOpen(false)} cursor={"pointer"} size={26} />
                        </div>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <p><b>Name:</b> {user?.name}</p>
                        <p><b>Phone:</b> {user?.phone}</p>
                    </div>
                </div>
            </div>
            {isUserAddressModalOpen &&
                <UserAddressModal
                    userId={user._id}
                    setIsModalOpen={setIsUserAddressModalOpen}
                />
            }
        </>
    )
}

export default UserInfoModal