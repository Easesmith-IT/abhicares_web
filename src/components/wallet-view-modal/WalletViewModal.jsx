import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import classes from './WalletViewModal.module.css';

import 'react-quill/dist/quill.snow.css';
import useGetApiReq from '../../hooks/useGetApiReq';
import CashOutReq from '../cash-out-req/CashOutReq';
import Loader from '../loader/Loader';

const WalletViewModal = ({ setIsViewWalletModalOpen, id, getSellerWallet }) => {
  const [cashOutRequests, setCashOutRequests] = useState([]);
  const { res: getCashoutReqRes, fetchData: getCashoutReq, isLoading } = useGetApiReq();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const getCashOutRequests = async () => {
    getCashoutReq(`/admin/get-seller-wallet-cashout-requests/${id}?startDate=${filters.startDate}&endDate=${filters.endDate}`)
  };

  useEffect(() => {
    getCashOutRequests();
  }, [filters.startDate, filters.endDate]);

  useEffect(() => {
    if (getCashoutReqRes?.status === 200 || getCashoutReqRes?.status === 201) {
      setCashOutRequests(getCashoutReqRes?.data.cashouts);
    }
  }, [getCashoutReqRes])

  return (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <div className={classes.heading_container}>
          <h4>Wallet</h4>
          <div className={classes.d_flex}>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <p>Start Date</p>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className={classes.filter_input}
                />
              </div>
              <div>
                <p>End Date</p>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className={classes.filter_input}
                />
              </div>
            </div>
            <RxCross2
              onClick={() => setIsViewWalletModalOpen(false)}
              cursor={"pointer"}
              size={26}
            />
          </div>
        </div>
        {isLoading && cashOutRequests.length === 0 && <Loader />}
        {!isLoading && cashOutRequests.length === 0 && (
          <p>No cashOut Requests found</p>
        )}
        <div className={classes.tran_contianer}>
          {cashOutRequests?.map((item) => (
            <CashOutReq
              key={item._id}
              item={item}
              getSellerWallet={getSellerWallet}
              setIsViewWalletModalOpen={setIsViewWalletModalOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WalletViewModal