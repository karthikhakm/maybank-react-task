import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px', 
};

const Map = () => {
  const searchResults = useSelector((state) => state.places.searchResults);
  const selectedPlace = useSelector((state) => state.places.selectedPlace);
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); 
  const [zoom, setZoom] = useState(2); 
  const [markerPosition, setMarkerPosition] = useState(null); 

  //Center map to the last searched location
  useEffect(() => {
    if (searchResults.length > 0) {
      const lastPlace = searchResults[searchResults.length - 1];
      setCenter({
        lat: lastPlace.location.lat,
        lng: lastPlace.location.lng,
      });
      setZoom(12);
      setMarkerPosition({
        lat: lastPlace.location.lat,
        lng: lastPlace.location.lng,
      });
    }
  }, [searchResults]);

  //Center map to the selected place from history
  useEffect(() => {
    if (selectedPlace) {
      setCenter({
        lat: selectedPlace.location.lat,
        lng: selectedPlace.location.lng,
      });
      setZoom(15);
      setMarkerPosition({
        lat: selectedPlace.location.lat,
        lng: selectedPlace.location.lng,
      });
    }
  }, [selectedPlace]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
    >
      {/* Only show the marker if markerPosition is set */}
      {markerPosition && (
        <Marker position={markerPosition} />
      )}
    </GoogleMap>
  );
};

export default Map;
