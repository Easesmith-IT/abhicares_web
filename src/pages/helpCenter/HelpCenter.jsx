import classes from './HelpCenter.module.css'
import Faqs from "../../components/productInfoModal/Faqs"
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const HelpCenter = () => {
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);

  const handleMultiSelectClose = ()=>{
    setIsMultiSelectOpen(!isMultiSelectOpen);
    setIsOtherOpen(false);
  }

  const handleOtherClose = ()=>{
    setIsMultiSelectOpen(false);
    setIsOtherOpen(false);
  }

  return (
    <section className={classes.help_center}>
      <h2 className={classes.help_center_title}>Help Center</h2>
      <div className={classes.box}>
        <form>
          <div className={classes.input_box}>
            <input
              className={classes.input}
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
            />
          </div>
          <div className={classes.input_box}>
            <input
              className={classes.input}
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter mobile number"
            />
          </div>
          <div className={classes.input_box}>
            <input
              className={classes.input}
              type="text"
              name="description"
              id="description"
              placeholder="Enter description"
            />
          </div>
          <div className={classes.input_box}>
            <div onClick={handleMultiSelectClose} className={`${classes.input} ${classes.d_flex}`}>
              <span>Select issue</span>
              <IoIosArrowDown />
            </div>
            {isMultiSelectOpen &&
              <div className={classes.multi_select}>
                <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="having an issue with changing my number">Having an issue with changing my number</label>
                <label className={classes.label} onClick={handleMultiSelectClose} htmlFor="having an issue with changing my number">Having an issue with changing my number</label>
                <label onClick={() => setIsOtherOpen(true)} htmlFor="">other</label>
                {isOtherOpen &&
                  <div>
                    <div className={classes.input_box}>
                      <input
                        className={classes.input}
                        type="text"
                        name="other"
                        id="other"
                        placeholder="Enter your issue"
                      />
                    </div>
                    <div className={classes.button_wrapper}>
                      <button onClick={handleOtherClose} className={classes.button}>Ok</button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
          <div className={classes.button_wrapper}>
            <button className={classes.button}>Submit</button>
          </div>
        </form>
      </div>
      <div>
        <h3 className={classes.h3}>Frequently asked questions</h3>
      </div>
      <Faqs />
    </section>
  )
}

export default HelpCenter