import { useState } from 'react';
import classes from './AddSubAdminModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthorization from '../../hooks/useAuthorization';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import UpdatePwd from '../update-password-modal/UpdatePwd';

const AddSubAdminModal = ({ setIsModalOpen, subAdmin, getSubadmins }) => {
    const [info, setInfo] = useState({
        name: subAdmin?.name || "",
        password: subAdmin?.password || "",
        role: subAdmin?.role || "",
        adminId: subAdmin?.adminId || ""
    });
    const [isPasswordHide, setIsPasswordHide] = useState(true);
     const [updatePwdModal, setUpdatePwdModal] = useState(false);

    const { checkAuthorization } = useAuthorization();


    const [permissions, setPermissions] = useState({
        dashboard: subAdmin?.permissions.dashboard || "",
        banners: subAdmin?.permissions.banners || "",
        orders: subAdmin?.permissions.orders || "",
        bookings: subAdmin?.permissions.bookings || "",
        services: subAdmin?.permissions.services || "",
        partners: subAdmin?.permissions.partners || "",
        customers: subAdmin?.permissions.customers || "",
        offers: subAdmin?.permissions.offers || "",
        availableCities: subAdmin?.permissions.availableCities || "",
        payments: subAdmin?.permissions.payments || "",
        enquiry: subAdmin?.permissions.enquiry || "",
        helpCenter: subAdmin?.permissions.helpCenter || "",
        settings: subAdmin?.permissions.settings || "",
        reviews: subAdmin?.permissions.reviews || "",
        notifications: subAdmin?.permissions.notifications || "",
        sellerCashout: subAdmin?.permissions.sellerCashout || "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const handlePasswordShowHide = () => {
        setIsPasswordHide(!isPasswordHide);
    };

    const handlePermissionChange = (key, value) => {
        setPermissions({ ...permissions, [key]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!info.adminId
            || !info.name
            || !info.password
            || !info.role
            || !permissions.dashboard
            || !permissions.banners
            || !permissions.orders
            || !permissions.bookings
            || !permissions.services
            || !permissions.partners
            || !permissions.customers
            || !permissions.offers
            || !permissions.availableCities
            || !permissions.payments
            || !permissions.enquiry
            || !permissions.helpCenter
            || !permissions.settings
            || !permissions.reviews
            || !permissions.notifications
            || !permissions.sellerCashout
        ) {
          toast.error("All fields are required")
            return;
        }
        if (subAdmin) {
            try {
                const { data } = await axios.patch(`${import.meta.env.VITE_APP_ADMIN_API_URL}/update-sub-admin/${subAdmin._id}`, { ...info, permissions }, { withCredentials: true });
                toast.success("SubAdmin updated successfully");
                setIsModalOpen(false);
                getSubadmins();
            } catch (error) {
                console.log(error);
                setIsModalOpen(false);
                checkAuthorization(error);
            }
        }
        else {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_APP_ADMIN_API_URL}/create-Admin`, { ...info, permissions }, { withCredentials: true });
                toast.success("SubAdmin added successfully");
                setIsModalOpen(false);
                getSubadmins();
            } catch (error) {
                console.log(error);
                setIsModalOpen(false);
                checkAuthorization(error);
            }
        }
    }



    return (
      <div className={classes.wrapper}>
        <div className={classes.modal}>
          <div className={classes.heading_container}>
            <h4>{subAdmin ? "Update" : "Add"} Sub Admin</h4>
            <div className={classes.d_flex}>
              <RxCross2
                onClick={() => setIsModalOpen(false)}
                cursor={"pointer"}
                size={26}
              />
            </div>
          </div>
          <form className={classes.form}>
            <div className={classes.input_container}>
              <label htmlFor="adminId">User Name</label>
              <input
                className={classes.input}
                onChange={handleOnChange}
                value={info.adminId}
                type="text"
                name="adminId"
                id="adminId"
                placeholder="enter your username"
              />
            </div>
            <div className={classes.input_container}>
              <label htmlFor="name">Name</label>
              <input
                className={classes.input}
                onChange={handleOnChange}
                value={info.name}
                type="text"
                name="name"
                id="name"
                placeholder="enter your name"
              />
            </div>
            {!subAdmin && (
              <div className={classes.input_container}>
                <label htmlFor="password">Password</label>
                <input
                  className={classes.input}
                  onChange={handleOnChange}
                  value={info.password}
                  type={isPasswordHide ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="enter your password"
                />
                {isPasswordHide ? (
                  <FaEyeSlash
                    className={classes.icon}
                    onClick={handlePasswordShowHide}
                  />
                ) : (
                  <FaEye
                    className={classes.icon}
                    onClick={handlePasswordShowHide}
                  />
                )}
              </div>
            )}
            <div className={classes.input_container}>
              <label htmlFor="role">Role</label>
              <select
                className={classes.input}
                name="role"
                value={info.role}
                onChange={handleOnChange}
              >
                <option value="">Select</option>
                <option value="subAdmin">Sub Admin</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className={classes.input_container}>
              <label htmlFor="">permissions</label>
              <div>
                {Object.keys(permissions).map((key, index) => (
                  <div key={key} className={classes.permission}>
                    <p>{key}</p>
                    <div className={classes.d_flex}>
                      <div className={classes.d_flex}>
                        <input
                          onChange={(e) => handlePermissionChange(key, "read")}
                          type="radio"
                          name={`${key}-read`}
                          id={`${key}-read`}
                          value={permissions[key]}
                          checked={permissions[key] === "read"}
                        />
                        <span>read</span>
                      </div>
                      <div className={classes.d_flex}>
                        <input
                          onChange={(e) => handlePermissionChange(key, "write")}
                          type="radio"
                          name={`${key}-write`}
                          id={`${key}-write`}
                          value={permissions[key]}
                          checked={permissions[key] === "write"}
                        />
                        <span>write</span>
                      </div>
                      <div className={classes.d_flex}>
                        <input
                          onChange={(e) => handlePermissionChange(key, "none")}
                          type="radio"
                          name={`${key}-none`}
                          id={`${key}-none`}
                          value={permissions[key]}
                          checked={permissions[key] === "none"}
                        />
                        <span>none</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.button_wrapper}>
              {subAdmin && (
                <button
                  className={classes.button}
                                onClick={(e) => { e.preventDefault(); setUpdatePwdModal(true)}}
                >
                  Update Password
                </button>
              )}
              <button className={classes.button} onClick={handleOnSubmit}>
                {subAdmin ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
        {updatePwdModal && (
                <UpdatePwd setIsModalOpen={setUpdatePwdModal} adminId={subAdmin?.adminId} />
        )}
      </div>
    );
}

export default AddSubAdminModal