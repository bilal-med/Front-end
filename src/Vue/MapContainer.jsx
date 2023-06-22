import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Define your virtual parking lists here

function MapsPay() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [parkingList, setParkingList] = useState([]);

  const [park, setPark] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    // Get the query parameters from the current URL
    const queryParams = new URLSearchParams(window.location.search);
    const parkingName = queryParams.get("parkingName");
    const parkingLat = queryParams.get("parkingLat");
    const parkingLng = queryParams.get("parkingLng");
    // Set the destination position from the query parameters
    if (parkingName && parkingLat && parkingLng) {
      setDestination({
        name: parkingName,
        position: { lat: Number(parkingLat), lng: Number(parkingLng) },
      });
    }
  }, []);

  const handleApiLoaded = (map) => {
    map.addListener("click", (event) => {
      setDestination({
        name: "Destination",
        position: event.latLng.toJSON(),
      });
    });

    if (parkingList.length > 0) {
      parkingList.forEach((parking, index) => {
        const marker = new window.google.maps.Marker({
          position: parking.position,
          label: parking.name,
          icon: {
            url: "https://maps.google.com/mapfile",
            scaledSize: new window.google.maps.Size(30, 30),
          },
          map: map,
        });

        marker.addListener("click", () => {
          handleMarkerClick(parking);
        });
      });
    }
    if (destination) {
      const destinationMarker = new window.google.maps.Marker({
        position: destination.position,
        label: destination.name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/parkinglot.png",
          scaledSize: new window.google.maps.Size(30, 30),
        },
        map: map,
      });

      destinationMarker.addListener("click", () => {
        handleMarkerClick(destination);
      });
    }
  };

  const directionsOptions = {
    origin: currentLocation
      ? { lat: currentLocation.lat, lng: currentLocation.lng }
      : "",
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
    // Combine your virtual parking lists here
  ];

  const handleMarkerClick = (parking) => {
    Swal.fire({
      title: parking.name,
      text: "you are reserving this parking lot , the QR is sent to your email",
      buttons: true,
    });
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyCHc5NI8qU_WJ7X0UqoOD33VzvKibsxVkU"
        libraries={["places"]}
        onLoad={() => {
          setParkingList(combinedParkingList);
        }}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={100}
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
          {/* Render parking markers */}
          {parkingList.map((parking, index) => (
            <Marker
              key={index}
              position={parking.position}
              label={parking.name}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/parkinglot.png",
                scaledSize: new window.google.maps.Size(48, 48),
              }}
              onClick={() => handleMarkerClick(parking)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default MapsPay;
