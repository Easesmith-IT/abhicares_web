import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";

class MapContainer extends Component {
  render() {
    const mapStyles = {
      width: "70%",
      height: "500px",
    };

    const userLocation = {
      lat: 26.820608,
      lng: 80.8747008,
    };

    const sellerLocation = {
      lat: 19.8326723,
      lng: 75.1935613,
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={userLocation}
      >
        {/* user  marker */}
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
        <Polyline path={[userLocation, sellerLocation]} strokeColor="#FF0000" strokeOpacity={1.0} strokeWeight={2} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
})(MapContainer);
