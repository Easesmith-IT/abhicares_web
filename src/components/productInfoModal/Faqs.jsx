import axios from "axios";
import FaqLi from "./FaqLi";

import classes from "./Modal.module.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGetApiReq from "../../hooks/useGetApiReq";

const Faqs = () => {
    const [allFaqs, setAllFaqs] = useState([]);
    const { res, fetchData, isLoading } = useGetApiReq();

    const getAllFaqs = async () => {
        fetchData("/shopping/get-all-faq")
    }

    useEffect(() => {
        getAllFaqs();
    }, [])

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("faqs",res);
            
            setAllFaqs(res?.data.data);
        }
    }, [res])

    return (
        <div className={classes.faq}>
            <ul className={classes.faq_ul}>
                {allFaqs?.map((faq, index) => (
                    <FaqLi
                        key={index}
                        faq={faq}
                        index={index}
                    />
                ))}

                {allFaqs.length === 0 && isLoading &&
                    <span>Loading...</span>
                }
                {allFaqs.length === 0 && !isLoading &&
                    <span>No Faqs Found</span>
                }
            </ul>

        </div>
    );
};

export default Faqs;