import { MdCancel } from 'react-icons/md'
import classes from './OrderInfoModal.module.css'

const OrderInfoModal = ({ setIsInfoModalOpen }) => {
    return (
        <div className={classes.modal_overlay}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h2>Booking Info</h2>
                    <MdCancel onClick={() => setIsInfoModalOpen(false)} size={22} cursor={"pointer"} />
                </div>
                <h3>Order1</h3>
                <div className={classes.p_container}>
                    <p className={classes.qty}>Qty: 1</p>
                    <p>booking date: 05/12/2023</p>
                    <p>appointment date: 05/12/2023</p>
                </div>
                <h3>Products</h3>
                <div className={classes.product_contaner}>
                    <div className={classes.product}>
                        <img className={classes.img} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAJ1BMVEX09PTMzMz4+PjV1dXR0dHJycnt7e3j4+PZ2dnx8fHf39/q6urc3Nx8cu+jAAABuUlEQVR4nO3Z626DIBiA4coZ9P6vd9BaD52LkGV8LHmfn3ZN3+BA1McDAAAAAAAAAAAAAADgH4muSezdt5ipiVm65ilt2/qmyWrVsc/nPtsk/73vWKjzkCTfIOUvhH59JdA0jYcyBJ4cAmOsWUHEAmPSxoT5djSlAuNUlht7P0GlAs26HNr55gtCgX5bhe9+XChw2a8nn0HOnc66UGDYA89TWcV85FgoE6jSvhc4fx7LoWOz0AjO2//gaa+i3PPYcQyFAtV2jt2xL67VZi+UWmZUKJuayRxnxLuvjOF2XO5SNy8h+Hjq27ey+xiOs1nYx+81edYxHCfQfeyj15kySuDH+L3GcIDA6Nc+961vvU7LBkZt07MvXt3q2bIGiQaWrFJ4cX63VVwyMD73XDZdnt8BAuO6J7Tpp1t54cDp9hZeNPA9fqMGXk7bgQJj1SMawcCl6hGSYGAg8LeBNX2yI1glyN24hype7qapkvR2q4JEYHkyWOvx6Buoljw5jW5QLolLx4forvktRF5ter7LUT7vspreQtip51uIXDinljOsdbp7xPkHjW269wEAAAAAAAAAAAAAgJF9AWqwFQ8Ed9TQAAAAAElFTkSuQmCC" alt="" />
                        <div className={classes.info}>
                            <h4>Product1</h4>
                            <p>Qty: 1</p>
                            <p>₹1000</p>
                        </div>
                    </div>
                </div>
                <h4>Track Order</h4>
                <div>
                    <div className={classes.progress}></div>
                    <div className={classes.d_flex}>
                        <p></p>
                        <p>Out for delivary</p>
                        <p>Delivered</p>
                    </div>
                </div>
                <hr />
                <p className={classes.p}>Total Price:₹1000</p>
            </div>
        </div>
    )
}

export default OrderInfoModal