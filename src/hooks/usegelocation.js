import { useState, useEffect } from "react";
import axios from "axios";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [status,setStatus] = useState(null)

  const getAddressInfo = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6617eda336c541faba5c1f54119e2de0`
      );

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

useEffect(() => {
  const getLocation = async () => {
    try {
      const status = await navigator.permissions.query({
        name: "geolocation",
      });

        setStatus(status.state)

      const handlePermission = async () => {
        if (status.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              getAddressInfo(latitude, longitude);
            },
            (error) => {
              console.error("Error in getting location", error.message);
            }
          );
        }
        else if (status.state === "prompt" || status.state === "denied") {
          // You can handle UI updates or show a message to the user here
          console.error("Geolocation permission denied by the user");

          // Example: Show a button in your modal to request location again
          // This button should trigger the geolocation request
          const requestLocationAgain = () => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                getAddressInfo(latitude, longitude);
              },
              (error) => {
                console.error("Error in getting location", error.message);
              }
            );
          };

          requestLocationAgain()
        }
      };

      handlePermission();
    } catch (error) {
      console.error("Error checking geolocation permission:", error);
    }
  };

  getLocation();
}, []);

  return { location, status };
};

export default useGeolocation;
