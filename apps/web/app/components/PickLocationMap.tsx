'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const PickLocationMap: React.FC<{
  readonly markerInitialPosition?: [number, number];
  readonly onLocationUpdated?: (location: [number, number]) => void;
}> = ({ markerInitialPosition = [51, -0.09], onLocationUpdated }) => {
  const onMarkerDragEnd = (marker: L.Marker) => {
    const { lng, lat } = marker.getLatLng();

    onLocationUpdated && onLocationUpdated([lat, lng]);
  };

  onLocationUpdated && onLocationUpdated(markerInitialPosition);

  return (
    <>
      <TileLayer url={url} attribution={attribution} />
      <Marker
        position={markerInitialPosition}
        draggable={true}
        eventHandlers={{ dragend: (event) => onMarkerDragEnd(event.target) }}
      />
    </>
  );
};

const PickLocationMapContainer: React.FC<{
  readonly zoom?: number;
  readonly onMarkerLocationUpdated?: (location: [number, number]) => void;
}> = ({ onMarkerLocationUpdated, zoom }) => {
  return (
    <MapContainer
      center={[51, -0.09]}
      zoom={zoom || 4}
      scrollWheelZoom={true}
      className="h-full"
    >
      <PickLocationMap onLocationUpdated={onMarkerLocationUpdated} />
    </MapContainer>
  );
};

export default PickLocationMapContainer;
