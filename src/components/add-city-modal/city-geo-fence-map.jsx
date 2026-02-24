
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useEffect, useRef } from "react";
import L from "leaflet";

import FitBounds from "./fit-bounds";
import MapSetView from "./map-set-view";

const CityGeoFenceMap = ({
  latitude,
  longitude,
  polygon, // [[lat, lng], ...]
  onChange,
  polygonCoords,
}) => {
  const featureGroupRef = useRef(null);

  /**
   * Load existing polygon into Leaflet FeatureGroup
   * IMPORTANT: do NOT render <Polygon /> via React
   */
  useEffect(() => {
    if (!featureGroupRef.current) return;

    // Clear old layers
    featureGroupRef.current.clearLayers();

    if (polygon.length === 0) return;

    const layer = L.polygon(polygon, {
      color: "#2563eb",
      weight: 2,
    });

    featureGroupRef.current.addLayer(layer);
  }, [polygon]);

  return (
    <div style={{ height: "400px", borderRadius: "6px", overflow: "hidden" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <MapSetView latitude={latitude} longitude={longitude} />

        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topleft"
            draw={{
              polygon: polygon.length === 0, // allow only once
              rectangle: false,
              circle: false,
              polyline: false,
              marker: false,
              circlemarker: false,
            }}
            edit={{
              edit: {
                selectedPathOptions: {
                  maintainColor: true,
                  color: "#2563eb",
                },
              },
              remove: true,
            }}
            onCreated={(e) => {
              const latlngs = e.layer.getLatLngs()[0];
              onChange(latlngs.map((p) => [p.lat, p.lng]));
            }}
            onEdited={(e) => {
              const layer = Object.values(e.layers._layers)[0];
              const latlngs = layer.getLatLngs()[0];
              onChange(latlngs.map((p) => [p.lat, p.lng]));
            }}
            onDeleted={() => {
              onChange([]);
            }}
          />
        </FeatureGroup>

        <FitBounds polygonCoords={polygonCoords} />
      </MapContainer>
    </div>
  );
};

export default CityGeoFenceMap;
