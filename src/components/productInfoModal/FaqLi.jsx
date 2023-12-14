import { useState } from "react";

import classes from "./Modal.module.css";

const FaqLi = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li onClick={handleOpen} className={`${classes.faq_li_none} ${classes.faq_li} ${index !== 0 && classes.faq_li_border_top}`}>
            <h6 className={classes.faq_li_h6}>{faq.ques}?</h6>
            <p className={`${isOpen ? `${classes.faq_li_p} ${classes.faq_li_p_open}` : classes.faq_li_p}`}>{faq.ans}</p>
        </li>
    );
};

export default FaqLi;