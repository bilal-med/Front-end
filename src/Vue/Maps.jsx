import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  useNavigate,
  useNavigation,
} from "react-router-dom/dist/umd/react-router-dom.development";
import Payment from "./payment";
import Modal from "./PaymentModal";
import PaymentForm from "./PaymentForm";

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
  {
    name: "Parking 7",
    position: { lat: 33.89, lng: -5.556 },
    capacity: 150,
    price: 10,
  },

  // Add more parking locations in Meknes...
];

const virtualCasablancaParkingList = [
  // Casablanca parking locations
  {
    name: "Parking sbata",
    position: { lat: 33.573, lng: -7.596 },
    capacity: 0,
    price: 100,
  },
  {
    name: "Parking maka",
    position: { lat: 33.533, lng: -7.657 },
    capacity: 200,
    price: 12,
  },
  {
    name: "Parking elite",
    position: { lat: 33.601, lng: -7.543 },
    capacity: 0,
    price: 10,
  },
  // Add more parking locations in Casablanca...
];

function Maps() {
  const [loading, setLoading] = useState(true);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [parkingList, setParkingList] = useState([]);

  const [park, setPark] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigate();

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
    const timeoutId = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 3000);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component is unmounted before it expires
    };
  }, []);

  // const handleApiLoaded = (map) => {
  //   map.addListener("click", (event) => {
  //     setDestination({
  //       name: "Destination",
  //       position: event.latLng.toJSON(),
  //     });
  //   });

  //   setParkingList([
  //     ...virtualMeknesParkingList,
  //     ...virtualCasablancaParkingList,
  //   ]);
  // };
  useEffect(() => {
    if (typeof window.google === "object") {
      setParkingList(combinedParkingList);
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
        const label = {
          text: parking.capacity.toString(), // Capacity number as the label text
          color: "purple", // Label text color
          fontSize: "14px", // Label text font size
          fontWeight: "bold", // Label text font weight
        };
        const marker = new window.google.maps.Marker({
          position: parking.position,
          label: label,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/parkinglot.png",

            scaledSize: new window.google.maps.Size(30, 30),
          },
          map: map,
        });

        marker.addListener("click", () => {
          handleMarkerClick(parking);
        });
      });
    }
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
        <p>nombre de place : ${parking.capacity}</p>
        <p>Prix: ${parking.price}  DHS</p>
      `,
      // buttons redirect to the payment page
      showConfirmButton: parking.capacity > 0,
      confirmButtonText: "Reserve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setPark(parking);
        const queryParams = new URLSearchParams();
        queryParams.set("parkingName", parking.name);
        queryParams.set("parkingCapacity", parking.capacity);
        queryParams.set("parkingPrice", parking.price);
        queryParams.set("parkingLat", parking.position.lat);
        queryParams.set("parkingLng", parking.position.lng);
        const queryString = queryParams.toString();
        navigation(`/payment?${queryString}`);
      }
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
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px", // Adjust the height to match your containerStyle
            }}
          >
            <i
              className="fa-sharp fa-regular fa-spinner-third"
              style={{ fontSize: "48px" }} // Adjust the font size to make the icon larger
            ></i>
          </div>
        ) : (
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
              <Marker
                position={destination.position}
                label={destination.name}
              />
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
            {/* {parkingList &&
          parkingList.map((parking, index) => (
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
          ))} */}
          </GoogleMap>
        )}
      </LoadScript>
    </>
  );
}

export default Maps;
