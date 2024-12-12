import axios from "axios";
import FaqLi from "./FaqLi";

import classes from "./Modal.module.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Faqs = () => {
    const [allFaqs, setAllFaqs] = useState([]);

    const getAllFaqs = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/get-all-faq`, { withCredentials: true });
            console.log(data);
            setAllFaqs(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllFaqs();
    }, [])


    const faqData = [
        {
            ques: "Will the professional bring the tools needed for the service?",
            ans: "Yes, all the tools required during the process will be brought in by the professional. However, the technician do not carry a ladder, please arrange for one if the AC is at a height."
        },
        {
            ques: "Will the professional bring the tools needed for the service?",
            ans: "Yes, all the tools required during the process will be brought in by the professional. However, the technician do not carry a ladder, please arrange for one if the AC is at a height."
        },
        {
            ques: "Will the professional bring the tools needed for the service?",
            ans: "Yes, all the tools required during the process will be brought in by the professional. However, the technician do not carry a ladder, please arrange for one if the AC is at a height."
        },
    ];

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
            </ul>

        </div>
    );
};

export default Faqs;