import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Maps() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleApiLoaded = (map) => {
    map.addListener("click", (event) => {
      setDestination(event.latLng);
    });
  };

  useEffect(() => {
    if (currentLocation && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: new window.google.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng
          ),
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(response);
          } else {
            console.log("Directions request failed. Error status:", status);
          }
        }
      );
    }
  }, [currentLocation, destination]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB5-hdJmqgr7Cd6Ty_fheyBlLr2e4zK7Lc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={10}
        onLoad={handleApiLoaded}
      >
        {currentLocation && <Marker position={currentLocation} />}
        {destination && <Marker position={destination} />}
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
              markerOptions: { visible: false },
              polylineOptions: { strokeColor: "blue" },
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Maps;
