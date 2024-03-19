import classes from './CelebrationModal.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import congratsIcon from "../../assets/congrats-icon.png"

const CelebrationModal = ({ setIsModalOpen, isModalOpen,credits }) => {
    return (
        <div className={`${classes.modal_overlay} ${isModalOpen ? classes.modal_open : classes.modal_close}`}>
            <div className={classes.modal_wrapper}>
                <button onClick={() => setIsModalOpen(false)} className={classes.modal_close}>
                    <AiOutlineClose size={20} />
                </button>
                <div className={classes.modal}>
                    <img src={congratsIcon} alt="congrats" />
                    <h3>Congratulations!</h3>
                    <p className={classes.text}>You got ₹{credits} extra discount on this order from your referal credits.</p>
                    <button onClick={()=> setIsModalOpen(false)} className={classes.button}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default CelebrationModal