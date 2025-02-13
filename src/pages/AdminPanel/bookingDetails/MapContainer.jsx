import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import axios from "axios";
import useGetApiReq from "../../../hooks/useGetApiReq";

const MapContainer = ({ google, location, sellerStatus, bookingStatus }) => {
  const { res: getPathRes, fetchData: getPath, isLoading: getPathLoading } = useGetApiReq();
  const [directions, setDirections] = useState(null);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const mapStyles = {
    width: "100%",
    height: "500px",
  };

  const userLocation = {
    lat: location.user[0],
    lng: location.user[1],
  };

  const sellerLocation = {
    lat: location.seller[0],
    lng: location.seller[1],
  };

  const getDirections = async () => {
    const sourceCoordinates = `${location.seller[0]},${location.seller[1]}`;
    const destinationCoordinates = `${location.user[0]},${location.user[1]}`;
    getPath(`/admin/get-the-path-from-source-to-destination?sourceCoordinates=${sourceCoordinates}&destinationCoordinates=${destinationCoordinates}`)
  };

  useEffect(() => {
    getDirections();
  }, []);

  useEffect(() => {
    if (getPathRes?.status === 200 || getPathRes?.status === 201) {
      setDirections(getPathRes?.data.routes[0]?.overview_polyline?.points);
    }
}, [getPathRes])

  useEffect(() => {
    if (sellerStatus === "out-of-delivery" && bookingStatus === "started") {
      setShowBackdrop(false);
    } else {
      setShowBackdrop(true);
    }
  }, [sellerStatus, bookingStatus])

  return (
    <>
      <div>
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
          {directions && (
            <Polyline
              path={
                directions &&
                google?.maps?.geometry?.encoding?.decodePath(directions)
              }
              strokeColor="#4285F4"
              strokeOpacity={1.0}
              strokeWeight={4}
            />
          )}
        </Map>
      </div>
      {showBackdrop && (
        <div
          style={{
            border: "2px solid",
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "24px",
            zIndex: 100000,
          }}
        >
          The Seller is not started yet!
        </div>
      )}
    </>
  );
};


export default GoogleApiWrapper({
  apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
})(MapContainer);
