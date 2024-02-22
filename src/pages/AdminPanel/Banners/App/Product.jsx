import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../../../Wrapper";
import classes from "../Banner.module.css";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import useAuthorization from "../../../../hooks/useAuthorization";
import UpdateBannerModal from "../../../../components/update-banner-modal/UpdateBannerModal";

const Product = () => {
  const { checkAuthorization } = useAuthorization();
  const [image, setImage] = useState({
    file: null, preview: null,
  });

  const navigate = useNavigate();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    img: "",
    type: "",
    page: "",
    section: ""
  });


  const bannerChangeHandler = (e) => {
    const file = e.target.files[0];

    setImage(() => {
      return {
        file: file,
        preview: URL.createObjectURL(file),
      }
    })
  };

  const uploadImages = async () => {

    if (image.file === null) {
      toast.error("Please select the image");
      return;
    }

    setData({ img: image.file, type: "product-banner", page: "product-banners", section: "app-productpage" })

    setIsModalOpen(true);
  };

  const getBannersFromServer = async () => {
    try {


      const response = await axios.get(
        `${process.env.REACT_APP_CMS_URL}/get-banners`,
        {
          params: {
            type: "product-banner",
            page: "product-banners",
            section: "app-productpage",
          },
        }
      );

      setImage({
        file: null, preview: `${process.env.REACT_APP_IMAGE_URL}/${response.data.banners.image}`
      })
      console.log("response1", response);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getBannersFromServer();
  }, []);


  return (
    <>
      <Wrapper>
        <div className={classes.otherBanners}>
          <div className={classes.bannerContainer}>
            <h4>Product Banner</h4>
            {image.preview && (
              <img src={image.preview} alt="banner" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => bannerChangeHandler(event)}
              className="mb-2"
            />
          </div>
          <div className="d-flex justify-content-end mx-5 mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={uploadImages}
            >
              Update
            </button>
          </div>
        </div>
      </Wrapper>

      {isModalOpen &&
        <UpdateBannerModal
          getBannersFromServer={getBannersFromServer}
          setIsModalOpen={setIsModalOpen}
          data={data}
        />
      }
    </>
  );
};

export default Product;
