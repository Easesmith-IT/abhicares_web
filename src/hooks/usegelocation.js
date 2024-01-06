// useGeolocation.js
import { useState, useEffect } from "react";



const useGeolocation = () => {
  const [location, setLocation] = useState({
    geometry: {},
    formattedAddress: "",
    city:"",
    state:"",
    pincode:"",
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const status = await navigator.permissions.query({
          name: "geolocation",
        });

        setStatus(status.state);

        const handlePermission = async () => {
          if (status.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                 setLocation((prev) => {
                   return {
                     ...prev,
                     geometry: { lat: latitude, lng: longitude },
                   };
                 });
                

                // Create a LatLng object for the user's location
                const userLocation = new window.google.maps.LatLng(
                  latitude,
                  longitude
                );

                // Use the Geocoder to get address details
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode(
                  { location: userLocation },
                  (results, status) => {
                    if (status === "OK" && results[0]) {
                      const formattedAddress = results[0].formatted_address;
                      
                      const city = extractAddressComponent(
                        results,
                        "locality"
                      );
                      const state = extractAddressComponent(
                        results,
                        "administrative_area_level_1"
                      );
                      const pincode = extractAddressComponent(
                        results,
                        "postal_code"
                      );

                        setLocation((prev) => {
                          return {
                            ...prev,
                            formattedAddress,
                            city,
                            state,
                            pincode,
                          };
                        });

                     
                    } else {
                      console.error("Error in geocoding:", status);
                    }
                  }
                );
              },
              (error) => {
                console.error("Error in getting location", error.message);
              }
            );
          } else if (status.state === "prompt" || status.state === "denied") {
            // You can handle UI updates or show a message to the user here
            console.error("Geolocation permission denied by the user");

            // Example: Show a button in your modal to request location again
            // This button should trigger the geolocation request
            const requestLocationAgain = async () => {
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                  const { latitude, longitude } = position.coords;
                  setLocation((prev) => {
                    return {
                      ...prev,
                      geometry: { lat: latitude, lng: longitude },
                    };
                  });

                  const userLocation = new window.google.maps.LatLng(
                    latitude,
                    longitude
                  );

                  const geocoder = new window.google.maps.Geocoder();
                  geocoder.geocode(
                    { location: userLocation },
                    (results, status) => {
                      console.log("results", results);
                      if (status === "OK" && results[0]) {
                        const formattedAddress = results[0].formatted_address;
                        const city = extractAddressComponent(
                          results,
                          "locality"
                        );
                        const state = extractAddressComponent(
                          results,
                          "administrative_area_level_1"
                        );
                        const pincode = extractAddressComponent(
                          results,
                          "postal_code"
                        );


                        setLocation((prev) => {
                          return {
                            ...prev,
                            formattedAddress,
                            city,
                              state,
                              pincode,
                          };
                        })
                        console.log("formattedAddress", formattedAddress);
                        console.log("city", city);
                        console.log("state", state);
                        console.log("pincode", pincode);
                      } else {
                        console.error("Error in geocoding:", status);
                      }
                    }
                  );
                },
                (error) => {
                  console.error("Error in getting location", error.message);
                }
              );
            };

            await requestLocationAgain();
          }
        };

        await handlePermission();
      } catch (error) {
        console.error("Error checking geolocation permission:", error);
      }
    };

    getLocation();
  }, []);

  const extractAddressComponent = (results, type) => {
    for (const result of results) {
      const component = result.address_components.find((component) =>
        component.types.includes(type)
      );
      if (component) {
        return component.long_name;
      }
    }
    return null;
  };

  return { location, status };
};

export default useGeolocation;

// import { useState, useEffect } from "react";
// import axios from "axios";

// const useGeolocation = () => {
//   const [location, setLocation] = useState(null);
//   const [status,setStatus] = useState(null)

//   const getAddressInfo = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6617eda336c541faba5c1f54119e2de0`
//       );

//       if (response.status === 200) {
//         const address = {
//           components: response.data.results[0].components,
//           formatted: response.data.results[0].formatted,
//           geometry: response.data.results[0].geometry,
//         };
//         setLocation(address);
//       }
//     } catch (err) {
//       console.error("ERROR IN FETCHING ADDRESS DETAILS...", err);
//     }
//   };

// useEffect(() => {
//   const getLocation = async () => {
//     try {
//       const status = await navigator.permissions.query({
//         name: "geolocation",
//       });

//         setStatus(status.state)

//       const handlePermission = async () => {
//         if (status.state === "granted") {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               const { latitude, longitude } = position.coords;
//               getAddressInfo(latitude, longitude);
//             },
//             (error) => {
//               console.error("Error in getting location", error.message);
//             }
//           );
//         }
//         else if (status.state === "prompt" || status.state === "denied") {
//           // You can handle UI updates or show a message to the user here
//           console.error("Geolocation permission denied by the user");

//           // Example: Show a button in your modal to request location again
//           // This button should trigger the geolocation request
//           const requestLocationAgain = () => {
//             navigator.geolocation.getCurrentPosition(
//               (position) => {
//                 const { latitude, longitude } = position.coords;
//                 getAddressInfo(latitude, longitude);
//               },
//               (error) => {
//                 console.error("Error in getting location", error.message);
//               }
//             );
//           };

//           requestLocationAgain()
//         }
//       };

//       handlePermission();
//     } catch (error) {
//       console.error("Error checking geolocation permission:", error);
//     }
//   };

//   getLocation();
// }, []);

//   return { location, status };
// };

// export default useGeolocation;
