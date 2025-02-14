import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import classes from './AddUserModal.module.css';

import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import usePatchApiReq from '../../hooks/usePatchApiReq';
import usePostApiReq from '../../hooks/usePostApiReq';

const AddUserModal = ({ setIsModalOpen, user = "", getAllUsers }) => {
    const { res: addUserRes, fetchData: addUser, isLoading: addUserLoading } = usePostApiReq();
    const [userInfo, setUserInfo] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        status: user?.status || true
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    const { res: updateUserRes, fetchData: addUserFetchData } = usePatchApiReq()

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!userInfo.name
            || !userInfo.phone
            || !userInfo.status
        ) {
            alert("alert")
            return;
        }
        if (user) {
            await addUserFetchData(`/admin/update-user/${user._id}`, { ...userInfo })

        }
        else {
            addUser("/admin/create-user", { ...userInfo })
        }
    }

    useEffect(() => {
        if (addUserRes?.status === 200 || addUserRes?.status === 201) {
            toast.success("User created successfully");
            getAllUsers();
            setIsModalOpen(false);
        }
    }, [addUserRes])

    useEffect(() => {
        if (updateUserRes?.status === 200 || updateUserRes?.status === 201) {
            toast.success("User updated successfully");
            getAllUsers();
            setIsModalOpen(false);
        }
    }, [updateUserRes])
    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>{user ? "Update" : "Add"} User</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                <form onSubmit={handleOnSubmit} className={classes.form}>
                    <div className={classes.input_container}>
                        <label htmlFor="name">Name</label>
                        <input className={classes.input} onChange={handleOnChange} value={userInfo.name} type="text" name="name" id="name" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="phone">Phone</label>
                        <input className={classes.input} onChange={handleOnChange} value={userInfo.phone} type="number" name="phone" id="phone" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="status">Status</label>
                        <select onChange={handleOnChange} value={userInfo.status} className={classes.input} name="status" id="status">
                            <option value="true">Active</option>
                            <option value="false">InActive</option>
                        </select>
                    </div>
                    <div className={classes.button_wrapper}>
                        <button className={classes.button}>{user ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUserModal