import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";

const useDeleteApiReq = () => {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const fetchData = async (url, config = {}) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.delete(url, config);
            if (response.status === 200 || response.status === 201) {
                toast.success(response?.data?.message);
                setRes(response);
                console.log("delete api response", response);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.")
        } finally {
            setIsLoading(false);
        }
    };

    return { res, isLoading, fetchData };


};

export default useDeleteApiReq;