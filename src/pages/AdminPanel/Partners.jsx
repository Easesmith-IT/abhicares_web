import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { FiEdit, FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AddBtn from "../../assets/add-icon-nobg.png";
import AddSellerModal from "../../components/add-seller-modal/AddSellerModal";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import Loader from "../../components/loader/Loader";
import UnapprovedSellerModal from "../../components/unapproved-seller-modal/UnapprovedSellerModal";
import useDeleteApiReq from "../../hooks/useDeleteApiReq";
import useGetApiReq from "../../hooks/useGetApiReq";
import Wrapper from "../Wrapper";
import classes from "./Shared.module.css";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Partners = () => {
  const { res: deleteSellerRes, fetchData: deleteSeller, isLoading: deleteSellerLoading } = useDeleteApiReq();
  const { res: getSellersRes, fetchData: getSellers, isLoading } = useGetApiReq();
  const { res: filterSellersRes, fetchData: filterSellers, isLoading: isFilterSellersLoading } = useGetApiReq();
  const { res: searchSellersRes, fetchData: searchSellers, isLoading: isSearchSellersLoading } = useGetApiReq();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSellerInfoModalOpen, setIsSellerInfoModalOpen] = useState(false);
  const [seller, setSeller] = useState({});
  const [allSellers, setAllSellers] = useState([]);
  const [isUnapprovedSellerModalOpen, setIsUnapprovedSellerModalOpen] = useState(false);
  const [status, setStatus] = useState("")
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const handlePageClick = async (page) => {
    setPage(page);
  };

  const navigate = useNavigate()


  const getAllSellers = async () => {
    getSellers("/admin/get-all-seller")
  };

  useEffect(() => {
    getAllSellers();
  }, [])

  useEffect(() => {
    if (getSellersRes?.status === 200 || getSellersRes?.status === 201) {
      console.log("getSellersRes", getSellersRes);

      setAllSellers(getSellersRes?.data.data);
      setPageCount(getSellersRes?.data?.totalPage);
    }
  }, [getSellersRes])

  const handleFilterChange = async () => {
    filterSellers(`/admin/filter-seller?status=${status}`)
  };

  useEffect(() => {
    status && handleFilterChange();
  }, [status])

  useEffect(() => {
    if (filterSellersRes?.status === 200 || filterSellersRes?.status === 201) {
      console.log("filterSellersRes", filterSellersRes);

      setAllSellers(filterSellersRes?.data.data);
    }
  }, [filterSellersRes])


  const handleUpdateModal = (e, seller) => {
    e.stopPropagation();
    setSeller(seller);
    setIsUpdateModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteModal = (e, id) => {
    e.stopPropagation();
    setSeller(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = async () => {
    deleteSeller(`/admin/delete-seller/${seller}`)
  };

  useEffect(() => {
    if (deleteSellerRes?.status === 200 || deleteSellerRes?.status === 201) {
      toast.success("Seller deleted successfully");
      getAllSellers();
      setIsDeleteModalOpen(!isDeleteModalOpen);
    }
  }, [deleteSellerRes])

  const handleSerach = async (e) => {
    const value = e.target.value;

    console.log("value", value);

    if (!value) {
      getAllSellers();
      return;
    }

    searchSellers(`/admin/search-seller?search=${value}`);
  }

  useEffect(() => {
    if (searchSellersRes?.status === 200 || searchSellersRes?.status === 201) {
      setAllSellers(searchSellersRes?.data.data);
    }
  }, [searchSellersRes])

  function debounce(fx, time) {
    let id = null;
    return function (data) {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        fx(data);
        // id = null;
      }, time);
    };
  }

  const handleSellerInfoModal = (data) => {
    setSeller(data);
    setIsSellerInfoModalOpen(true);
  }

  return (
    <>
      <Wrapper>
        <div className={classes["report-container"]}>
          <div className={classes["report-header"]}>
            <h1 className={classes["recent-Articles"]}>Partners</h1>
            <input onChange={debounce(handleSerach, 1000)} className={classes.input} type="text" placeholder="Search professionals" />
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={classes.input}
            >
              <option value="">Select Status</option>
              <option value="IN-REVIEW">In Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="HOLD">Hold</option>
            </select>
            <button onClick={() => setIsUnapprovedSellerModalOpen(true)} className={classes.button}>Unapproved Seller</button>
            <button onClick={() => setIsModalOpen(true)} className={classes.services_add_btn}>
              <img src={AddBtn} alt="add seller" />
            </button>
          </div>

          <div className={classes["report-body"]}>
            <div className={classes.sellers}>
              <h3 className={classes["t-op"]}>Partner Name</h3>
              <h3 className={classes["t-op"]}>Partner Id</h3>
              {/* <h3 className={classes["t-op"]} style={{width:"100px"}}>Service</h3> */}
              <h3 className={classes["t-op"]}>Category</h3>
              <h3 className={classes["t-op"]}>Phone</h3>
              {/* <h3 className={classes["t-op"]}>Status</h3> */}
              <h3 className={classes["t-op"]}>Update/<br />Delete/Seller Order</h3>
            </div>

            <div className={classes.items}>
              {(!isLoading && !isFilterSellersLoading && !isSearchSellersLoading)
                && allSellers.length === 0
                && <p>No sellers found</p>
              }

              {(isLoading || isFilterSellersLoading || isSearchSellersLoading)
                && <Loader />
              }
              {allSellers?.map((seller) => (
                <div key={seller._id} className={classes.sellers}>
                  <h3 className={classes["t-op-nextlvl"]}>{seller.name}</h3>
                  <h3 className={classes["t-op-nextlvl"]}>{seller?._id}</h3>
                  {/* <h3 className={`${classes["t-op-nextlvl"]}`} style={{width:"100px"}}>{seller.services[0].serviceId.name}, ...</h3> */}
                  <h3 className={`${classes["t-op-nextlvl"]}`}>{seller.categoryId.name}</h3>
                  <h3 className={`${classes["t-op-nextlvl"]}`}>{seller.phone}</h3>
                  {/* <h3 onClick={(e) => e.stopPropagation()} className={`${classes["t-op-nextlvl"]}`}>
                    <input checked={seller.status} onChange={(e) => handleOnChange(e, seller._id)} type="checkbox" name="" id="" />
                    {seller.status ? "Active" : "InActive"}
                  </h3> */}
                  <h3 className={`${classes["t-op-nextlvl"]}`}>
                    <FiEdit onClick={(e) => handleUpdateModal(e, seller)} cursor={"pointer"} size={20} />
                    <MdDelete onClick={(e) => handleDeleteModal(e, seller._id)} cursor={"pointer"} size={22} color='red' />
                    <FiEye onClick={() => navigate(`/admin/partners/${seller._id}`, { state: seller })} cursor={"pointer"} size={20} />
                  </h3>

                </div>
              ))}

            </div>

            <div style={{ marginTop: "20px" }}>
              <PaginationControl
                changePage={handlePageClick}
                limit={10}
                page={page}
                total={pageCount + "0"}
              />
            </div>
          </div>
        </div>
      </Wrapper >
      {isModalOpen &&
        <AddSellerModal
          setIsModalOpen={setIsModalOpen}
          getAllSellers={getAllSellers}
        />
      }

      {/* {isSellerInfoModalOpen &&
        <SellerInfoModal
          setIsSellerInfoModalOpen={setIsSellerInfoModalOpen}
          seller={seller}
        />
      } */}

      {isUpdateModalOpen &&
        <AddSellerModal
          setIsModalOpen={setIsUpdateModalOpen}
          getAllSellers={getAllSellers}
          seller={seller}
        />
      }

      {isDeleteModalOpen &&
        <DeleteModal
          setState={setIsDeleteModalOpen}
          handleDelete={handleDelete}
        />
      }
      {isUnapprovedSellerModalOpen &&
        <UnapprovedSellerModal
          setIsUnapprovedSellerModalOpen={setIsUnapprovedSellerModalOpen}
          allSellers={allSellers}
          getSellers={getAllSellers}
        />
      }
    </>
  );
};

export default Partners;
