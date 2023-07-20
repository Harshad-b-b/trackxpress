// import { useState, useEffect, useRef } from "react";
// import "./App.css";
// import "leaflet/dist/leaflet.css";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   useMapEvents,
//   Tooltip,
// } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
// import { Icon } from "leaflet";
// import marker from "./assets/marker.png";

// function App() {
//   const [capturedLocations, setCapturedLocations] = useState([]);
//   const [currentPosition, setCurrentPosition] = useState([12.943631657738578,77.62045846193489]);
//   const [error, setError] = useState(null);
//   const [placeName, setPlaceName] = useState("");
//   const [customerPosition, setCustomerPosition] = useState(null);
//   const [cityData, setCityData] = useState(null);
//   const customIcon = new Icon({
//     iconUrl: marker,
//     iconSize: [30, 30], // size of the icon
//   });

//   const handleSearchSubmit = async () => {
//     try {
//       const url = `https://nominatim.openstreetmap.org/reverse?lat=${cityData[0]}&lon=${cityData[1]}&format=json&accept-language=en`;
//       // setPlaceName("Loading....");
//       alert(data.display_name)

//       const response = await fetch(url);
//       const data = await response.json();

//       if (data && data.display_name) {
//         setPlaceName(data.display_name)
//       } else {
//         setPlaceName("Place not found");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setPlaceName("Error occurred");
//     }
//   };

//   useEffect(() => {
//     if (cityData) {
//       handleSearchSubmit();
//     }
//   }, [cityData]);

//   const Markers = () => {
//     const map = useMapEvents({
//       click(e) {
//         setCityData([e.latlng.lat, e.latlng.lng]);
//       },
//     });
//     return null;
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentPosition([
//             position.coords.latitude,
//             position.coords.longitude,
//           ]);
//           setCapturedLocations([
//             [12.9716, 77.5946],
//             [position.coords.latitude, position.coords.longitude],
//           ]);
//           setError(null);
//         },
//         (error) => {
//           // Geolocation permission denied
//           setCurrentPosition([13.0827, 80.2707]); // Chennai coordinates (center of the map)

//           setError(error.message);
//         }
//       );
//     } else {
//       // Geolocation not supported by the browser
//       setCurrentPosition([12.9716, 77.5946]); // Bangalore coordinates

//       setError("Geolocation is not supported by your browser.");
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []); // Get location on component mount

//   return (
//     <>
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           marginBottom: "1em",
//         }}
//       >
//         <a class="button" href="#popup1">
//           Let me Pop up
//         </a>
//       </div>
//       {JSON.stringify(currentPosition)}
//       <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

//         <MapContainer
//           center={currentPosition}
//           zoom={16}
//         >
//           <Markers />
//           <TileLayer
//             attribution=""
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
//           />
//           <MarkerClusterGroup chunkedLoading>
//             {cityData ? (
//               <Marker icon={customIcon} position={cityData}>
//                 <Popup>{placeName}</Popup>
//                 <Tooltip>
//                   <h6>{placeName}</h6>
//                 </Tooltip>
//               </Marker>
//             ) : (
//               ""
//             )}
//             {currentPosition ? <Marker position={currentPosition}>
//               <Tooltip>{placeName}</Tooltip>
//             </Marker>:""}
//           </MarkerClusterGroup>
//           <Polyline positions={capturedLocations} color="red" />
//         </MapContainer>
//       </div>
//       <div id="popup1" class="overlay">
//         <div class="popup">
//           <h2>Here i am</h2>
//           <a class="close" href="#">
//             &times;
//           </a>
//           <div class="content">
//             <div class="row">
//               <span>
//                 <input
//                   class="slide-up"
//                   id="card"
//                   type="text"
//                   placeholder="Name"
//                 />
//                 <label for="card">Customer</label>
//               </span>
//               <span>
//                 <input
//                   class="slide-up"
//                   id="expires"
//                   type="text"
//                   placeholder="Number"
//                 />
//                 <label for="expires">Phone</label>
//               </span>

//               <span>
//                 <input
//                   class="slide-up"
//                   id="security"
//                   type="text"
//                   placeholder="Latitude"
//                 />
//                 <label for="security">Longitude</label>
//               </span>
//               <div
//                 style={{
//                   color: "yellow",
//                   fontSize: "10px",
//                 }}
//               >
//                 <span
//                   style={{
//                     position: "relative",
//                     bottom: "30px",
//                   }}
//                 >
//                   Please enter values separated by commas:
//                 </span>
//                 <span
//                   style={{
//                     position: "relative",
//                     bottom: "70px",
//                   }}
//                 >
//                   For example: 12.3456, -98.7654, 42.1234, -71.9876
//                 </span>
//               </div>

//               <button
//                 style={{
//                   position: "relative",
//                   bottom: "50px",
//                 }}
//                 onClick={getLocation}
//               >
//                 Get Current Location
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import { useState, useEffect, useRef } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import marker from "./assets/marker.png";

function App() {
  const [capturedLocations, setCapturedLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([12.943631657738578,77.62045846193489]);
  const [error, setError] = useState(null);
  const [placeName, setPlaceName] = useState("loading");
  const [customerPosition, setCustomerPosition] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [counter, setCounter] = useState(0);
  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [30, 30], // size of the icon
  });

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
 
  useEffect(() => {
      getLocation()
      let timer = setInterval(() => {
        setCounter((prevCounter) => {
          setCapturedLocations((prev) => [...prev, currentPosition]);
          const updatedCounter = prevCounter + 1;
          if (updatedCounter >= 10) {
            clearInterval(timer);
          }
          return updatedCounter;
        });
      }, 1000);
  
      // Clear the interval when the component unmounts
      return () => {
        clearInterval(timer);
      };
    }, []);

  useEffect(() => {
    if (cityData) {
      handleSearchSubmit();
    }
  }, [cityData]);

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setCityData([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setCapturedLocations([
            [12.9716, 77.5946],
            [position.coords.latitude, position.coords.longitude],
          ]);
          setError(null);
        },
        (error) => {
          // Geolocation permission denied
          setCurrentPosition([13.0827, 80.2707]); // Chennai coordinates (center of the map)

          setError(error.message);
        }
      );
    } else {
      // Geolocation not supported by the browser
      setCurrentPosition([12.9716, 77.5946]); // Bangalore coordinates

      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []); // Get location on component mount

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1em",
        }}
      >
        <a class="button" href="#popup1">
          Let me Pop up
        </a>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <MapContainer
          center={currentPosition}
          zoom={16}
          onClick={() => alert("ola")}
        >
          <Markers />
          <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
          />
          <MarkerClusterGroup chunkedLoading>
            {cityData ? (
              <Marker icon={customIcon} position={cityData}>
                <Popup>{placeName}</Popup>
                <Tooltip>
                  <h6>{placeName}</h6>
                </Tooltip>
              </Marker>
            ) : (
              ""
            )}
          </MarkerClusterGroup>
          <Polyline positions={capturedLocations} color="red" />
        </MapContainer>
      </div>
      <div id="popup1" class="overlay">
        <div class="popup">
          <h2>Here i am</h2>
          <a class="close" href="#">
            &times;
          </a>
          <div class="content">
            <div class="row">
              <span>
                <input
                  class="slide-up"
                  id="card"
                  type="text"
                  placeholder="Name"
                />
                <label for="card">Customer</label>
              </span>
              <span>
                <input
                  class="slide-up"
                  id="expires"
                  type="text"
                  placeholder="Number"
                />
                <label for="expires">Phone</label>
              </span>

              <span>
                <input
                  class="slide-up"
                  id="security"
                  type="text"
                  placeholder="Latitude"
                />
                <label for="security">Longitude</label>
              </span>
              <div
                style={{
                  color: "yellow",
                  fontSize: "10px",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    bottom: "30px",
                  }}
                >
                  Please enter values separated by commas:
                </span>
                <span
                  style={{
                    position: "relative",
                    bottom: "70px",
                  }}
                >
                  For example: 12.3456, -98.7654, 42.1234, -71.9876
                </span>
              </div>

              <button
                style={{
                  position: "relative",
                  bottom: "50px",
                }}
                onClick={getLocation}
              >
                Get Current Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
