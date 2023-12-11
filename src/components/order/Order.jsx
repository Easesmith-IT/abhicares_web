import { useState } from 'react';
import classes from './Order.module.css'
import OrderInfoModal from '../orderInfoModal/OrderInfoModal';
import { format } from 'date-fns';

const Order = ({ order }) => {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    console.log(order);

    const handleOnclick = () => {
        setIsInfoModalOpen(true);
    }
    return (
        <>
            <div onClick={handleOnclick} className={classes.order}>
                <div className={classes.order_top}>
                    <img className={classes.img} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAJ1BMVEX09PTMzMz4+PjV1dXR0dHJycnt7e3j4+PZ2dnx8fHf39/q6urc3Nx8cu+jAAABuUlEQVR4nO3Z626DIBiA4coZ9P6vd9BaD52LkGV8LHmfn3ZN3+BA1McDAAAAAAAAAAAAAADgH4muSezdt5ipiVm65ilt2/qmyWrVsc/nPtsk/73vWKjzkCTfIOUvhH59JdA0jYcyBJ4cAmOsWUHEAmPSxoT5djSlAuNUlht7P0GlAs26HNr55gtCgX5bhe9+XChw2a8nn0HOnc66UGDYA89TWcV85FgoE6jSvhc4fx7LoWOz0AjO2//gaa+i3PPYcQyFAtV2jt2xL67VZi+UWmZUKJuayRxnxLuvjOF2XO5SNy8h+Hjq27ey+xiOs1nYx+81edYxHCfQfeyj15kySuDH+L3GcIDA6Nc+961vvU7LBkZt07MvXt3q2bIGiQaWrFJ4cX63VVwyMD73XDZdnt8BAuO6J7Tpp1t54cDp9hZeNPA9fqMGXk7bgQJj1SMawcCl6hGSYGAg8LeBNX2yI1glyN24hype7qapkvR2q4JEYHkyWOvx6Buoljw5jW5QLolLx4forvktRF5ter7LUT7vspreQtip51uIXDinljOsdbp7xPkHjW269wEAAAAAAAAAAAAAgJF9AWqwFQ8Ed9TQAAAAAElFTkSuQmCC" alt="" />
                    <div className={classes.info}>
                        <h3>Order1</h3>
                        {/* <p>{`${order.products[0].product.name}, ${order.products[1] && order.products[1].product.name}, ...`}</p> */}
                        <p>{format(new Date(order.createdAt),"dd-MM-yyyy")}</p>
                        <p>Qty: 1</p>
                    </div>
                </div>
                <hr />
                <div className={classes.order_bottom}>
                    <p>Track Order</p>
                    <div>
                        <div className={classes.progress}></div>
                        <div className={classes.d_flex}>
                            <p className={classes.p}></p>
                            <p>Out for delivary</p>
                            <p className={classes.p}>Delivered</p>
                        </div>
                    </div>
                </div>
            </div>
            {isInfoModalOpen &&
                <OrderInfoModal
                    setIsInfoModalOpen={setIsInfoModalOpen}
                    order={order}
                />
            }
        </>
    )
}

export default Order