import React, { useRef, useState } from "react";
import { useAutocomplete } from "@ubilabs/google-maps-react-hooks";

const MapContainer = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const onPlaceChanged = (place) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input ref={inputRef} value={inputValue} onChange={handleInputChange} />
  );
};
