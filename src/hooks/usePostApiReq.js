import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";

const usePostApiReq = () => {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const fetchData = async (url, sendData, config = {}) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(url, sendData, { ...config, withCredentials: true });
            console.log("res", response);
            if (response.status === 200 || response.status === 201) {
                setRes(response);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log("post api error =>", error);
            toast.error(error.response?.data?.message || "An error occurred.")
        } finally {
            setIsLoading(false);
        }
    };

    return { res, isLoading, fetchData };


};

export default usePostApiReq;