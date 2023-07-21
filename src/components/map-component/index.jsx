import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import CustomMarker from "../customer-marker";

const MapComponent = ({
  currentPosition,
  customerPosition,
  capturedLocations,
  cityData,
  setCityData,
  placeName
}) => {
  const mapRef = useRef();
  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setCityData([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  useEffect(() => {
    if (mapRef.current && customerPosition) {
      const map = mapRef.current;
      map.setView(customerPosition, 13);
    }
  }, [customerPosition]);

  return (
 
      <MapContainer
        ref={mapRef}
        center={customerPosition || [12.9352, 77.6245]}
        zoom={13}
        onClick={() => alert("ola")}
      >
        <Markers />
        {currentPosition && <CustomMarker position={currentPosition} />}
        {customerPosition && <CustomMarker position={customerPosition} />}
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
        />
        {capturedLocations.length > 0 && (
          <Polyline positions={capturedLocations} color="red" />
        )}
        {cityData && (
          <MarkerClusterGroup chunkedLoading>
            <CustomMarker position={cityData} show={true} placeName={placeName} />
          </MarkerClusterGroup>
        )}
      </MapContainer>
    // </div>
  );
};

export default MapComponent;
