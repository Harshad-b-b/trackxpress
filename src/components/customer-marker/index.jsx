import React from "react";
import { Marker, Popup,Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import marker from "../../assets/marker.png";

const customIcon = new Icon({
  iconUrl: marker,
  iconSize: [30, 30],
});

const CustomMarker = ({ position, placeName, show = false }) => {
  return (
    <Marker position={position} icon={customIcon}>
      <Popup>{placeName}</Popup>
      {show && (
        <Tooltip>
          <h6>{placeName}</h6>
        </Tooltip>
      )}
    </Marker>
  );
};

export default CustomMarker;
