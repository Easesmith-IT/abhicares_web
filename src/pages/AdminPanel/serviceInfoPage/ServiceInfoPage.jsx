import axios from "axios";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import classes from "../../AdminPanel/Shared.module.css";

import { useNavigate } from "react-router-dom";
import AddBtn from "../../../assets/add-icon-nobg.png";
import AddProductModal from "../../../components/add-product-modal/AddProductModal";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import Loader from "../../../components/loader/Loader";
import ProductInfoModal from "../../../components/product-info-modal/ProductInfoModal";
import serviceInfoPageClasses from "./ServiceInfoPage.module.css";

import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import AddIconModal from "../../../components/add-icon-modal/AddIconModal";
import AddPackageModal from "../../../components/add-package-modal/AddPackageModal";
import FeaturesModal from "../../../components/feature-modal/FeaturesModal";
import useDeleteApiReq from "../../../hooks/useDeleteApiReq";
import useGetApiReq from "../../../hooks/useGetApiReq";
import Wrapper from "../../Wrapper";

const ServiceInfoPage = () => {
  const { res: deleteProductRes, fetchData: deleteProduct, isLoading: deleteProductLoading } = useDeleteApiReq();
  const { res: deletePackageRes, fetchData: deletePackage, isLoading: deletePackageLoading } = useDeleteApiReq();
  const { res: getServiceDetailRes, fetchData: getServiceDetail, isLoading } = useGetApiReq();
  const { res: getServiceProductRes, fetchData: getServiceProduct, isLoading: getServiceProductLoading } = useGetApiReq();
  const { res: getServicePackageRes, fetchData: getServicePackage, isLoading: getServicePackageLoading } = useGetApiReq();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadIcnModal, setIsUploadIcnModal] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isPackageInfoModalOpen, setIsPackageInfoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPackageDeleteModalOpen, setIsPackageDeleteModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isUpdatePackageModalOpen, setIsUpdatePackageModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [product, setProduct] = useState({});
  const [selectedPackage, setSelectedPackage] = useState({});
  const [singlePackage, setSinglePackage] = useState("");
  const [isPackageLoading, setIsPackageLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [serviceDetail, setServiceDetail] = useState("");

  const params = useParams();

  const handleProductInfoModal = (e, product) => {
    e.stopPropagation();
    setProduct(product);
    // setIsInfoModalOpen(!isDeleteModalOpen);
    navigate(`/admin/services/${params?.categoryId}/product/${params?.serviceId}/info`, { state: { product, isPackage: false } })
  };

  const handlePackageInfoModal = (e, singlePackage) => {
    e.stopPropagation();
    setSinglePackage(singlePackage);
    navigate(`/admin/services/${params?.categoryId}/product/${params?.serviceId}/info`, { state: { product: singlePackage, isPackage: true } })
    // setIsPackageInfoModalOpen(!isPackageInfoModalOpen);
  };

  const handleUpdateModal = (e, product) => {
    e.stopPropagation();
    setProduct(product);
    setIsUpdateModalOpen(!isDeleteModalOpen);
  };

  const handlePackageUpdateModal = (e, data) => {
    e.stopPropagation();
    setSelectedPackage(data);
    setIsUpdatePackageModalOpen(!isUpdatePackageModalOpen);
  };

  const getServiceDetails = async () => {
    getServiceDetail(`/admin/get-service-details/${params?.serviceId}`)
  };

  useEffect(() => {
    if (getServiceDetailRes?.status === 200 || getServiceDetailRes?.status === 201) {
      setServiceDetail(getServiceDetailRes?.data?.service);
    }
  }, [getServiceDetailRes])

  const getAllProducts = async () => {
    getServiceProduct(`/admin/get-service-product/${params?.serviceId}`)
  };

  useEffect(() => {
    if (getServiceProductRes?.status === 200 || getServiceProductRes?.status === 201) {
      setAllProducts(getServiceProductRes?.data.data);
    }
  }, [getServiceProductRes])
  
  const getAllPackage = async () => {
    getServicePackage(`/admin/get-service-package/${params?.serviceId}`)
  };
  
  useEffect(() => {
    getAllProducts();
    getAllPackage();
    getServiceDetails();
  }, []);

  useEffect(() => {
    if (getServicePackageRes?.status === 200 || getServicePackageRes?.status === 201) {
      setAllPackages(getServicePackageRes?.data.data);
    }
  }, [getServicePackageRes])

  const handleDelete = async () => {
    deleteProduct(`/admin/delete-product/${product}`)
  };

  useEffect(() => {
    if (deleteProductRes?.status === 200 || deleteProductRes?.status === 201) {
      toast.success("Product deleted successfully");
      getAllProducts();
      setIsDeleteModalOpen(!isDeleteModalOpen);
    }
  }, [deleteProductRes])

  const handleDeleteModal = (e, id) => {
    e.stopPropagation();
    setProduct(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handlePackageDeleteModal = (e, id) => {
    e.stopPropagation();
    setSinglePackage(id);
    setIsPackageDeleteModalOpen(!isPackageDeleteModalOpen);
  };

  const handlePackageDelete = async () => {
    deletePackage(`/admin/delete-package/${singlePackage}`)
  };

  useEffect(() => {
    if (deletePackageRes?.status === 200 || deletePackageRes?.status === 201) {
      toast.success("Package deleted successfully");
      getAllPackage();
      setIsPackageDeleteModalOpen(!isPackageDeleteModalOpen);
    }
  }, [deletePackageRes])

  return (
    <>
      <Wrapper>
        <div className={classes["services-wrapper"]}>
          <div className={serviceInfoPageClasses.service_info_wrapper}>
            <div className={serviceInfoPageClasses.img_wrapper}>
              {serviceDetail?.icon &&
                <img onClick={() => setIsUploadIcnModal(true)} className={serviceInfoPageClasses.icon} src={`${import.meta.env.VITE_APP_IMAGE_URL}/${serviceDetail.icon}`} alt="icon" />
              }
              <div className={serviceInfoPageClasses.service_info}>
                {/* <h3>Services</h3> */}
                <h5>{serviceDetail?.name}</h5>
                <div>
                  <p>Starting Price: ₹{serviceDetail?.startingPrice}</p>
                </div>
                <p>{serviceDetail?.description && parse(serviceDetail?.description)}</p>
                {!serviceDetail?.icon && <button
                  className={serviceInfoPageClasses.button}
                  onClick={() => setIsUploadIcnModal(true)}
                >
                  Upload Icon
                </button>}
              </div>
            </div>
            <button
              className={serviceInfoPageClasses.button}
              onClick={() => setIsFeatureModalOpen(true)}
            >Update Features</button>
          </div>

          <div className={classes["services-header"]}>
            <h4>Products</h4>
            <button
              onClick={() => setIsModalOpen(true)}
              className={classes.services_add_btn}
            >
              <img src={AddBtn} alt="add product" />
            </button>
          </div>
          <div className={classes.card_container}>
            {!getServiceProductLoading && allProducts.length === 0 && (
              <p>No products found</p>
            )}

            {getServiceProductLoading && allProducts.length === 0 && <Loader />}

            {allProducts?.map((product) => (
              <div
                key={product._id}
                onClick={(e) => handleProductInfoModal(e, product)}
                className={classes.card}
              >
                <img
                  src={`${import.meta.env.VITE_APP_IMAGE_URL}/${product.imageUrl[0]}`}
                  alt="product"
                />
                <div>
                  <div className={serviceInfoPageClasses.heading_container}>
                    <h5>{product.name}</h5>
                    <div className={classes.icon_container}>
                      <FiEdit
                        onClick={(e) => handleUpdateModal(e, product)}
                        size={20}
                      />
                      <MdDelete
                        onClick={(e) => handleDeleteModal(e, product._id)}
                        size={22}
                        color="red"
                      />
                    </div>
                  </div>
                  {/* <p>{parse(product.description)}</p> */}
                </div>
              </div>
            ))}
          </div>
          <div className={classes["services-header"]}>
            <h4>Packages</h4>
            <button
              onClick={() => setIsPackageModalOpen(true)}
              className={classes.services_add_btn}
            >
              <img src={AddBtn} alt="add package" />
            </button>
          </div>
          <div className={classes.card_container}>
            {!getServicePackageLoading && allPackages.length === 0 && (
              <p>No packages found</p>
            )}

            {getServicePackageLoading && allPackages.length === 0 && <Loader />}
            {allPackages?.map((singlePackage) => (
              <div
                key={singlePackage._id}
                onClick={(e) => handlePackageInfoModal(e, singlePackage)}
                className={classes.card}
              >
                <img
                  src={`${import.meta.env.VITE_APP_IMAGE_URL}/${singlePackage.imageUrl[0]}`}
                  alt="package"
                />
                <div>
                  <div className={serviceInfoPageClasses.heading_container}>
                    <h5>{singlePackage.name}</h5>
                    <div className={classes.icon_container}>
                      <FiEdit
                        onClick={(e) =>
                          handlePackageUpdateModal(e, singlePackage)
                        }
                        size={20}
                      />
                      <MdDelete
                        onClick={(e) =>
                          handlePackageDeleteModal(e, singlePackage._id)
                        }
                        size={22}
                        color="red"
                      />
                    </div>
                  </div>
                  {/* <p>{parse(singlePackage.description)}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>

      {isInfoModalOpen && (
        <ProductInfoModal
          product={product}
          setIsInfoModalOpen={setIsInfoModalOpen}
        />
      )}

      {isPackageInfoModalOpen && (
        <ProductInfoModal
          isPackage
          product={singlePackage}
          setIsInfoModalOpen={setIsPackageInfoModalOpen}
        />
      )}

      {isModalOpen && (
        <AddProductModal
          serviceId={params?.serviceId}
          setIsModalOpen={setIsModalOpen}
          getAllProducts={getAllProducts}
        />
      )}

      {isUpdateModalOpen && (
        <AddProductModal
          serviceId={params?.serviceId}
          setIsModalOpen={setIsUpdateModalOpen}
          product={product}
          getAllProducts={getAllProducts}
        />
      )}

      {isUploadIcnModal && (
        <AddIconModal
          setIsModalOpen={setIsUploadIcnModal}
          serviceId={serviceDetail?._id}
          getServiceDetails={getServiceDetails}
        />
      )}

      {isPackageModalOpen && (
        <AddPackageModal
          serviceId={params?.serviceId}
          setIsModalOpen={setIsPackageModalOpen}
          getAllPackage={getAllPackage}
          allProducts={allProducts}
        />
      )}

      {isUpdatePackageModalOpen && (
        <AddPackageModal
          selectedPackage={selectedPackage}
          serviceId={params?.serviceId}
          setIsModalOpen={setIsUpdatePackageModalOpen}
          getAllPackage={getAllPackage}
          allProducts={allProducts}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setState={setIsDeleteModalOpen}
          handleDelete={handleDelete}
        />
      )}
      {isPackageDeleteModalOpen && (
        <DeleteModal
          setState={setIsPackageDeleteModalOpen}
          handleDelete={handlePackageDelete}
        />
      )}

      {isFeatureModalOpen && (
        <FeaturesModal
          setIsModalOpen={setIsFeatureModalOpen}
          allFeatures={serviceDetail?.features}
          getServiceDetails={getServiceDetails}
          serviceId={serviceDetail?._id}
        />
      )}
    </>
  );
};

export default ServiceInfoPage;
