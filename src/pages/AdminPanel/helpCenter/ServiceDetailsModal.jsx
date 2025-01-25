import { RxCross2 } from 'react-icons/rx'
import classes from './ServiceDetailsModal.module.css'
import parse from "html-react-parser";

const ServiceDetailsModal = ({ setIsModalOpen, service }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.heading_container}>
                    <h4>Service Details</h4>
                    <div className={classes.d_flex}>
                        <RxCross2 onClick={() => setIsModalOpen(false)} cursor={"pointer"} size={26} />
                    </div>
                </div>

                <div className={classes.service}>
                    <div className={classes.d_flex}>
                        <div>
                            <img className={classes.icon} src={`${import.meta.env.VITE_APP_IMAGE_URL}/${service.imageUrl}`} alt="icon" />
                        </div>
                        <div>
                            <h4>{service?.name}</h4>
                            <div>
                                <p>Starting Price: ₹{service?.startingPrice}</p>
                            </div>
                            <p>{service?.description && parse(service?.description)}</p>
                        </div>
                    </div>
                    <h5>Features</h5>
                    <div className={classes.features}>
                        {service?.features?.map((feature, i) => (
                            <div className={classes.feature}>
                                <div className={classes.feature_wrapper}>
                                    <div className={classes.feature_img}>
                                        <img src={`${import.meta.env.VITE_APP_IMAGE_URL}/${feature?.image}`} alt="feature" />
                                    </div>
                                    <div className={classes.feature_content}>
                                        <h5>{feature?.title}</h5>
                                        <p>{feature?.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {service?.features.length === 0 && <p>No features found</p>}
                </div>

            </div>
        </div>
    )
}

export default ServiceDetailsModal