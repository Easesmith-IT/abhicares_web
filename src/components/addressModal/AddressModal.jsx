import { AiOutlineClose } from "react-icons/ai";
import classes from "./AddressModal.module.css";

import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import AddAddressModal from "../addAddressModal/AddAddressModal";
import toast from "react-hot-toast";
import Address from "./Address";

const AddressModal = ({
  isOpen,
  setIsAddressModalOpen,
  setAddress,
  getAllAddress,
  allAddress,
}) => {

  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const [temporaryAddress, setTemporaryAddress] = useState("");

  useEffect(() => {
    getAllAddress();
  }, []);

  const handleOnClick = () => {
    if (!temporaryAddress) {
      toast.error("Select address");
      return;
    }
    setAddress(temporaryAddress);
    setIsAddressModalOpen(false);
  };

  return (
    <>
      <div
        className={`${classes.modal_overlay} ${
          isOpen ? classes.modal_open : classes.modal_close
        }`}
      >
        <div className={classes.modal_wrapper}>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className={classes.modal_close}
          >
            <AiOutlineClose size={20} />
          </button>
          <div className={classes.modal}>
            <p className={classes.p}>Saved address</p>
            <button
              onClick={() => setIsAddAddressModalOpen(true)}
              className={classes.button}
            >
              <FaPlus />
              Add another address
            </button>
            <div className={classes.container}>
              {allAddress?.map((data) => (
                <Address
                  key={data._id}
                  data={data}
                  getAllAddress={getAllAddress}
                  setTemporaryAddress={setTemporaryAddress}
                />
              ))}
            </div>

            <button onClick={handleOnClick} className={classes.button}>
              Proceed
            </button>
          </div>
        </div>
      </div>
      {isAddAddressModalOpen && (
        <AddAddressModal
          setIsAddAddressModalOpen={setIsAddAddressModalOpen}
          isOpen={isAddAddressModalOpen}
          getAllAddress={getAllAddress}
        />
      )}
    </>
  );
};

export default AddressModal;