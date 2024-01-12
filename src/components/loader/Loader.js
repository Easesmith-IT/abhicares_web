import classes from './Loader.module.css';
import loader from '../../assets/rolling.gif';
import LazyImage from '../react-lazyload-image/LazyImage';

const Loader = () => {
  return (
    <div className={classes.img_container}>
      <LazyImage>
        <img src={loader} alt="loader" />
      </LazyImage>
    </div>
  )
}

export default Loader