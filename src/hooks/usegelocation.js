import { useState, useEffect } from "react";
import axios from "axios";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  const getAddressInfo = async (latitude, longitude) => {
    try {
      // console.log(process.env.OPENCAGE_GECODING_API_KEY);
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6617eda336c541faba5c1f54119e2de0`
      );

      // console.log(response);
      if (response.status === 200) {
        const address = {
          components: response.data.results[0].components,
          formatted: response.data.results[0].formatted,
          geometry: response.data.results[0].geometry,
        };
        setLocation(address);
      }
    } catch (err) {
      console.error("ERROR IN FETCHING ADDRESS DETAILS...", err);
    }
  };

  

  const fetchLocation = (permissionStatus) => {
    console.log("log", permissionStatus);

    if (permissionStatus.state === "granted") {
      console.log("inside grrnated");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (latitude && longitude) {
            getAddressInfo(latitude, longitude);
          }
        },
        (error) => {
          console.error("Error in getting location", error.message);
        }
      );
    } else if (
      permissionStatus.state === "prompt" ||
      permissionStatus.state === "denied"
    ) {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error.message);
          }
        );
      }, 2 * 60 * 1000);
    }
  }; 
  

useEffect(() => {
  if (navigator.geolocation) {
    const permissionStatus = navigator.permissions
      .query({
        name: "geolocation",
      })
      .then((status) => {
         fetchLocation(status);
        return;
      });
  }
  else {
      console.error("Geolocation is supported by your web browser");
    }
   
  }, []);
    
    
    return { location };
};

export default useGeolocation;
