import React, { useState, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import RegistrationPage from "./registration-page";
import PopUp from "./components/pop-up";
import MapComponent from "./components/map-component";

// Function to check if the input contains valid latitude and longitude
function isValidInput(inputValue) {
  if (!inputValue.includes(",")) {
    return false;
  }
  const [latitude, longitude] = inputValue.split(",");
  const isLatitudeValid = /^-?\d+(\.\d+)?$/.test(latitude.trim());
  const isLongitudeValid = /^-?\d+(\.\d+)?$/.test(longitude.trim());

  return isLatitudeValid && isLongitudeValid;
}

function App() {
  // State variables
  const [capturedLocations, setCapturedLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [placeName, setPlaceName] = useState("loading");
  const [customerPosition, setCustomerPosition] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [intervalRunning, setIntervalRunning] = useState(false);
  const [showMap,setShowMap] = useState(false)

  // Function to fetch and set the place name based on the coordinates
  const handleSearchSubmit = async () => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${cityData[0]}&lon=${cityData[1]}&format=json&accept-language=en`;
      setPlaceName("Loading....");
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.display_name) {
        setPlaceName(data.display_name);
      } else {
        setPlaceName("Place not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setPlaceName("Error occurred");
    }
  };

  // Fetch place name when cityData changes
  useEffect(() => {
    if (cityData) {
      handleSearchSubmit();
    }
  }, [cityData]);

  // Fetch user's current location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  // Fetch user's current location at regular intervals
  useEffect(() => {
    const getLocationAndUpdateCounter = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
          );
        });

        setCurrentPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        setCapturedLocations((prev) => [
          ...prev,
          [position.coords.latitude, position.coords.longitude],
        ]);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    getLocationAndUpdateCounter();
    let timer;
    if (intervalRunning) {
      timer = setInterval(() => {
        getLocationAndUpdateCounter();
      }, 1000);
    }

    // Clean up the timer when the component is unmounted or intervalRunning changes
    return () => {
      clearInterval(timer);
    };
  }, [intervalRunning]);

  // Get user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          setCurrentPosition(null);
          console.error("Error fetching location:", error);
        }
      );
    } else {
      setCurrentPosition(null);
      console.error("Geolocation is not supported by your browser.");
    }
  };

  // Handle the button click to start/stop interval
  const handleStopInterval = () => {
    setCapturedLocations([]);
    setIntervalRunning(!intervalRunning);
  };

  // Handle adding customer marking from the input
  const addCustomerMarking = () => {
    if (isValidInput(inputValue)) {
      const inputValues = inputValue
        .split(",")
        .map((value) => parseFloat(value.trim()));
      setCustomerPosition(inputValues);
      setInputValue("");
    } else {
      setInputValue("");
      alert("Please enter valid coordinates");
    }
  };

  return (
    <>
      <div className="container">
    {!showMap ? <RegistrationPage goToMaps={()=>setShowMap(true)}/>
    :
    <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <PopUp
    addCustomerMarking={addCustomerMarking}
    setInputValue={setInputValue}
    inputValue={inputValue}
    intervalRunning={intervalRunning}
    handleStopInterval={handleStopInterval}
    />
    <MapComponent
    currentPosition={currentPosition}
    capturedLocations={capturedLocations}
    customerPosition={customerPosition}
    cityData={cityData}
    setCityData={setCityData}
    placeName={placeName}
    />
    </div>
  }
    </div>
    </>
  );
}

export default App;
