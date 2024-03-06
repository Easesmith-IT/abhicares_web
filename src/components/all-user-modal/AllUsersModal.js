import allUsersModalClasses from './AllUsersModal.module.css';
import classes from '../../pages/AdminPanel/Shared.module.css';
import { RxCross2 } from 'react-icons/rx';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import html2PDF from 'jspdf-html2canvas';
import axios from 'axios';
import Loader from '../loader/Loader';

const AllUsersModal = ({ setIsModalOpen }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/get-users-data`, { withCredentials: true });
            console.log("all users", data);
            setAllUsers(data?.users);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])


    const downloadUserData = () => {
        html2PDF(document.querySelector("#table"), {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf'
        });
    }

    return (
        <div className={allUsersModalClasses.wrapper}>
            <div className={allUsersModalClasses.modal}>
                <div className={allUsersModalClasses.heading_container}>
                    <h4>All Users</h4>
                    <div className={allUsersModalClasses.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>
                {!isLoading && allUsers?.length === 0 && <p style={{ padding: "20px" }}>No users found</p>}

                <div style={{ marginBottom: "20px" }}>{isLoading && allUsers?.length === 0 && <Loader />}</div>

                {allUsers?.length > 0 &&
                    <div className={classes["report-body"]}>
                        <div id='table' className={allUsersModalClasses.table_wrapper}>
                            <table border={"2px"} className={allUsersModalClasses.table}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Locality</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((item,i) => (
                                        <tr key={i}>
                                            <td style={{ width: "200px", textAlign: "left", paddingInline: "10px" }}>{item?.userInfo?.name}</td>
                                            <td style={{ textAlign: "left", paddingInline: "10px" }}>{item?.userInfo?.phone}</td>
                                            {item?.add ?<td style={{ textAlign: "left", paddingInline: "10px" }}>{`${item?.add?.city}, ${item?.add?.pincode}`}</td>
                                            :<td style={{ textAlign: "left", paddingInline: "10px" }}>No address found.</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={allUsersModalClasses.btn_container}>
                            <button className={allUsersModalClasses.button} onClick={downloadUserData}>Download</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default AllUsersModal