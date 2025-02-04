import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";

const usePatchApiReq = () => {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (url, sendData, config = {}) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.patch(url, sendData, config);
            console.log("res", response);
            if (response.status === 200 || response.status === 201) {
                toast.success(response.data.message);
                setRes(response);
            }
        } catch (error) {
            console.log("patch api error =>", error);
            toast.error(error.response?.data?.message || "An error occurred.")
        } finally {
            setIsLoading(false);
        }
    };

    return { res, isLoading, fetchData };


};

export default usePatchApiReq;