import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";

const useGetApiReq = () => {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const fetchData = async (url, config = {}) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(url, config);
            if (response.status === 200 || response.status === 201) {
                setRes(response);
            }
        } catch (error) {
            console.log("error",error);
            toast.error(error.response?.data?.message || "An error occurred.")
            // await dispatch(handleErrorModal({ isOpen: true, message: error.response?.data?.message || "An error occurred.", isLogoutBtn: true }));
        } finally {
            setIsLoading(false);
        }
    };

    return { res, isLoading, fetchData };


};

export default useGetApiReq;