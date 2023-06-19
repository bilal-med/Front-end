import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Swal from "sweetalert2";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const virtualMeknesParkingList = [
  // Meknes parking locations
  {
    name: "Parking 1",
    position: { lat: 33.895, lng: -5.555 },
    capacity: 100,
    price: 10,
  },
  {
    name: "Parking 2",
    position: { lat: 33.978, lng: -5.537 },
    capacity: 80,
    price: 12,
  },
  {
    name: "Parking 3",
    position: { lat: 33.884, lng: -5.537 },
    capacity: 120,
    price: 9,
  },
  {
    name: "Parking 4",
    position: { lat: 33.89, lng: -5.556 },
    capacity: 90,
    price: 11,
  },
  {
    name: "Parking 5",
    position: { lat: 33.892, lng: -5.558 },
    capacity: 80,
    price: 12,
  },
  {
    name: "Parking 6",
    position: { lat: 33.891, lng: -5.557 },
    capacity: 100,
    price: 10,
  },

  // Add more parking locations in Meknes...
];

const virtualCasablancaParkingList = [
  // Casablanca parking locations
  {
    name: "Parking 1",
    position: { lat: 33.573, lng: -7.596 },
    capacity: 150,
    price: 15,
  },
  {
    name: "Parking 2",
    position: { lat: 33.533, lng: -7.657 },
    capacity: 200,
    price: 12,
  },
  {
    name: "Parking 3",
    position: { lat: 33.601, lng: -7.543 },
    capacity: 100,
    price: 10,
  },
  // Add more parking locations in Casablanca...
];

function Maps() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [parkingList, setParkingList] = useState([]);

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
      setDestination({
        name: "Destination",
        position: event.latLng.toJSON(),
      });
    });
  };

  const directionsOptions = {
    origin: currentLocation,
    destination: destination ? destination.position : null,
    travelMode: "DRIVING",
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
      } else {
        console.log(
          "Directions request failed. Error status:",
          response.status
        );
      }
    }
  };

  const combinedParkingList = [
    ...virtualMeknesParkingList,
    ...virtualCasablancaParkingList,
  ];

  const handleMarkerClick = (parking) => {
    Swal.fire({
      title: parking.name,
      html: `
        <p>Capacity: ${parking.capacity}</p>
        <p>Price: ${parking.price}</p>
      `,
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCHc5NI8qU_WJ7X0UqoOD33VzvKibsxVkU"
      onLoad={() => {
        setParkingList(combinedParkingList);
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={10}
        onLoad={handleApiLoaded}
      >
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(48, 48),
            }}
          />
        )}
        {destination && (
          <Marker position={destination.position} label={destination.name} />
        )}
        {destination && (
          <DirectionsService
            options={directionsOptions}
            callback={directionsCallback}
          />
        )}
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
              markerOptions: { visible: false },
              polylineOptions: { strokeColor: "#800080" },
            }}
          />
        )}
        {parkingList.length > 0 &&
          parkingList.map((parking, index) => (
            <Marker
              key={index}
              position={parking.position}
              label={parking.name}
              icon={{
                // parking image
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(48, 48),
              }}
              onClick={() => handleMarkerClick(parking)}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Maps;
