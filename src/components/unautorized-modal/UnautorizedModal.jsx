import { useDispatch } from 'react-redux';
import { checkAuthorizationFun } from '../../store/slices/autorizationSlice';
import classes from './UnautorizedModal.module.css';
import { IoIosWarning } from "react-icons/io";

const UnautorizedModal = () => {
    const dispatch = useDispatch();

    const handleCloseModal = async () => {
        await dispatch(checkAuthorizationFun(false))
    }

    return (
        <div className={classes.modal_wrapper}>
            <div className={classes.modal}>
                <p>
                    <IoIosWarning size={50} color='#FF0000' />
                    <span>Unauthorized</span>
                </p>
                <p>You don't have the permission <br /> to perform this action.</p>
                <button onClick={handleCloseModal} className={classes.button}>Ok</button>
            </div>
        </div>
    )
}

export default UnautorizedModal