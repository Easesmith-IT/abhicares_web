import React from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";

const MapContainer = ({ google, location }) => {
  console.log("location",location)
  const mapStyles = {
    width: "70%",
    height: "500px",
  };

  const userLocation = {
    lat:location.user[0],
    lng: location.user[1],
  };

  const sellerLocation = {
    lat: location.seller[0],
    lng: location.seller[1],
  };

  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyles}
      initialCenter={userLocation}
    >
      {/* user marker */}
      <Marker
        position={userLocation}
        title="User"
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Customize the marker icon
        }}
      />

      {/* Seller Marker */}
      <Marker
        position={sellerLocation}
        title="Seller"
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Customize the marker icon
        }}
      />

      {/* Polyline */}
      <Polyline
        path={[userLocation, sellerLocation]}
        strokeColor="#FF0000"
        strokeOpacity={1.0}
        strokeWeight={2}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
})(MapContainer);
