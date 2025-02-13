import { useEffect, useState } from 'react'
import AddBtn from "../../../assets/add-icon-nobg.png"
import Loader from '../../../components/loader/Loader'
import classes from '../Shared.module.css'
import citiesClasses from './AvailableCities.module.css'

import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

import toast from 'react-hot-toast'
import AddCityModal from '../../../components/add-city-modal/AddCityModal'
import DeleteModal from '../../../components/deleteModal/DeleteModal'
import useDeleteApiReq from '../../../hooks/useDeleteApiReq'
import useGetApiReq from '../../../hooks/useGetApiReq'
import Wrapper from '../../Wrapper'

const AvailableCities = () => {
    const { res: deleteCityRes, fetchData: deleteCity, isLoading: deleteCityLoading } = useDeleteApiReq();
    const { res: getCitiesRes, fetchData: getCities, isLoading } = useGetApiReq();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [city, setCity] = useState({});
    const [allCities, setAllCities] = useState([]);


    const getAllCities = async () => {
        getCities("/admin/get-availabe-city")
    };
    useEffect(() => {
        getAllCities();
    }, [])

    useEffect(() => {
        if (getCitiesRes?.status === 200 || getCitiesRes?.status === 201) {
            setAllCities(getCitiesRes?.data.data);
        }
    }, [getCitiesRes])

    const handleUpdateModal = (city) => {
        setCity(city);
        setIsUpdateModalOpen(!isUpdateModalOpen);
    };

    const handleDeleteModal = (id) => {
        setCity(id);
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleDelete = async () => {
        deleteCity(`/admin/delete-availabe-city/${city}`)
    };

    useEffect(() => {
        if (deleteCityRes?.status === 200 || deleteCityRes?.status === 201) {
            toast.success("City deleted successfully");
            getAllCities();
            setIsDeleteModalOpen(!isDeleteModalOpen);
        }
    }, [deleteCityRes])

    return (
        <>
            <Wrapper>
                <div className={classes["report-container"]}>
                    <div className={classes["report-header"]}>
                        <h1 className={classes["recent-Articles"]}>Available Cities</h1>
                        <button onClick={() => setIsModalOpen(true)} className={classes.services_add_btn}>
                            <img src={AddBtn} alt="add seller" />
                        </button>
                    </div>

                    <div className={citiesClasses.container}>
                        {!isLoading
                            && allCities?.length === 0
                            && <p>No cities found</p>
                        }

                        {isLoading
                            && allCities?.length === 0
                            && <Loader />
                        }
                        {allCities?.map((city) => (
                            <div key={city._id} className={citiesClasses.city_wrapper}>
                                <div className={citiesClasses.city}>
                                    <div className={citiesClasses.city_left}>
                                        <p>city: {city.city}</p>
                                    </div>
                                    <div className={citiesClasses.city_right}>
                                        <FiEdit onClick={() => handleUpdateModal(city)} cursor={"pointer"} size={20} />
                                        <MdDelete onClick={() => handleDeleteModal(city._id)} cursor={"pointer"} size={22} color='red' />
                                    </div>
                                </div>
                                <p>state: {city.state}</p>
                                <p>pincode: {city.pinCodes.map(item => item?.code).join(", ")}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Wrapper>
            {isModalOpen &&
                <AddCityModal
                    setIsModalOpen={setIsModalOpen}
                    getAllCities={getAllCities}
                />
            }

            {isUpdateModalOpen &&
                <AddCityModal
                    setIsModalOpen={setIsUpdateModalOpen}
                    getAllCities={getAllCities}
                    city={city}
                />
            }

            {isDeleteModalOpen &&
                <DeleteModal
                    handleDelete={handleDelete}
                    setState={setIsDeleteModalOpen}
                />
            }
        </>
    )
}

export default AvailableCities