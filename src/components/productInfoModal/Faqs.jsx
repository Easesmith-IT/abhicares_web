import FaqLi from "./FaqLi";

import classes from "./Modal.module.css";

const Faqs = () => {

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
            <p className={classes.faq_heading}>Frequently asked questions</p>
            <ul className={classes.faq_ul}>
                {faqData?.map((faq, index) => (
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