import { BounceLoader } from 'react-spinners'
import classes from './BackDropLoader.module.css'

export const BackDropLoader = () => {
  return (
    <div className={classes.back_drop}>
        <BounceLoader color="#000" />
    </div>
  )
}
