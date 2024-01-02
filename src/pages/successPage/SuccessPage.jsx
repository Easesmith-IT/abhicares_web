import { FaCheckCircle } from 'react-icons/fa'
import WebsiteWrapper from '../WebsiteWrapper'
import classes from './SuccessPage.module.css'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <WebsiteWrapper>
      <div className={classes.modal_wrapper}>
        <div className={classes.modal}>
          <div>
            <FaCheckCircle size={80} color="green" />
          </div>
          <h5 className={classes.h5}>Payment successful. Your order has been placed.</h5>
          <button
            className={classes.button}
            onClick={() => navigate("/my_bookings")}
          >
            Go to my orders
          </button>
        </div>
      </div>
    </WebsiteWrapper >
  )
}

export default SuccessPage