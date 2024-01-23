import React,{useState,useEffect} from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  DirectionsRenderer,
} from "google-maps-react";

const MapContainer = ({ google, location }) => {
 const [directions, setDirections] = useState(null);

 useEffect(() => {
   if (google) {
     calculateAndDisplayRoute();
   }
 }, [google]);

 const calculateAndDisplayRoute = () => {
   const directionsService = new google.maps.DirectionsService();

   const { user, seller } = location;
   const origin = new google.maps.LatLng(user[0], user[1]);
   const destination = new google.maps.LatLng(seller[0], seller[1]);

   directionsService.route(
     {
       origin: origin,
       destination: destination,
       travelMode: google.maps.TravelMode.DRIVING,
     },
     (result, status) => {
       if (status === google.maps.DirectionsStatus.OK) {
         console.log('result google maps',result)
         setDirections(result);
       } else {
         console.error("Directions request failed due to " + status);
       }
     }
   );
  };

  return (
    <Map
      google={google}
      zoom={14}
      style={{ width: "70%", height: "500px", position: "relative" }}
      initialCenter={{ lat: location.user[0], lng: location.user[1] }}
    >
      {/* user marker */}
      <Marker
        position={{ lat: location.user[0], lng: location.user[1] }}
        title="User"
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }}
      />

      {/* Seller Marker */}
      <Marker
        position={{ lat: location.seller[0], lng: location.seller[1] }}
        title="Seller"
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        }}
      />

      {/* Display directions */}
      {/* {directions && <DirectionsRenderer directions={directions} />} */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
})(MapContainer);
