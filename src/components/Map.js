import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Map = () => {
  const searchResults = useSelector((state) => state.places.searchResults);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    if (searchResults.length > 0) {
      // Set the center of the map to the last search result (or the first one)
      const lastPlace = searchResults[searchResults.length - 1];
      setCenter({
        lat: lastPlace.geometry.location.lat(),
        lng: lastPlace.geometry.location.lng(),
      });
      setZoom(12); // Zoom in when a place is selected
    }
  }, [searchResults]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {searchResults.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
