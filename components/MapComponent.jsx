import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';

const MapComponent = () => {
  const mapStyles = {
    height: "20rem",
    width: "100%"
  };
  const defaultCenter = {
    lat: 29.417160,
    lng: -98.693100
  };
  const businesses = [
    {
      name: "SATX Bounce",
      location: {
        lat: 29.417160,
        lng: -98.693100
      },
      link: "https://g.page/r/CRD8_XzLRehLEAI/",
    },
    // Add more businesses here
  ];

  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={10.5} center={defaultCenter}>
        {businesses.map((item) => (
          <MarkerF
            key={item.name}
            position={item.location}
            onClick={() => onSelect(item)}
          />
        ))}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <div>
              <h2>{selected.name}</h2>
              <a href={selected.link} target="_blank" rel="noopener noreferrer">
                Visit Google My Business Page
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
