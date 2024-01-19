import classes from './UnautorizedModal.module.css';
import { IoIosWarning } from "react-icons/io";

const UnautorizedModal = () => {
    return (
        <div className={classes.modal_wrapper}>
            <div className={classes.modal}>
                <p>
                    <IoIosWarning size={50} color='#FF0000' />
                    <span>Unauthorized</span>
                </p>
                <p>You don't have the permission <br /> to perform this action.</p>
                <button onClick={() => { }} className={classes.button}>Ok</button>
            </div>
        </div>
    )
}

export default UnautorizedModal