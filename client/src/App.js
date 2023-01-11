import "./App.css";
import * as React from "react";
import { Map, NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";
import axios from "axios";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register.jsx";
function App() {
  const [pins, setPins] = React.useState([]);
  const [viewport, setViewport] = React.useState({
    longitude: 12.4,
    latitude: 37.8,
    zoom: 14,
  });
  const [currentPlacedId, setCurrentPlacedId] = React.useState(null);
  const [newPlace,setNewPlace]=React.useState(null);
  const [title,setTitle]=React.useState(null);
  const [descr,setDescr]=React.useState(null);
  const [raitng,setRating]=React.useState(1);
  const [currentUser,setCurrentUser]=React.useState(null);
  const [showRegister,setShowRegister]=React.useState(false);
  const [showLogin,setShowLogin]=React.useState(false);
  const handleAddClick=(e)=>{
    let lat=e.lngLat.lat;
    let lon=e.lngLat.lng;
    setNewPlace({
      lat:lat,
      lng:lon
    })
  };

  const handlePinSubmit=()=>{

  }
  const handleMarkerClicked = (id, lat, lon) => {
    setCurrentPlacedId(id);
  };
  React.useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/pins");
        console.log(response);
        setPins(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div>
      <Map
        container={"map"}
        projection={"globe"}
        initialViewState={{ viewport }}
        mapboxAccessToken={process.env.REACT_APP_TOKEN}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mohitbansal321/clcmd40sy00nb14pgvpy12ivr"
        onDblClick={handleAddClick}
      >
        <NavigationControl />
        {pins.map((p) => (
          <>
            <Marker longitude={p.lon} latitude={p.lat} ancher="center">
              <LocationOnIcon
                className="icon"
                onClick={() => handleMarkerClicked(p._id, p.lat, p.lon)}
                style={{ fontSize: viewport.zoom * 2, color: "slateblue" }}
              />
            </Marker>
            {p._id === currentPlacedId && (
              <Popup
                longitude={p.lon}
                latitude={p.lat}
                closeOnClick={false}
                closeOnMove={false}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="descr">{p.descr}</p>
                  <label>Rating</label>
                  <div className="stars">{Array(p.rating).fill(<StarIcon className="star" />)}</div>
                  <label> Information</label>
                  <div className="info">
                    <span className="username">
                      Created by <b>{p.userName}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}
        {
          newPlace &&
          <Popup
          longitude={newPlace.lng}
          latitude={newPlace.lat}
          closeOnClick={false}
          closeOnMove={false}
          onClose={()=>setNewPlace(null)}
          anchor="left"
          >
            <div>
              <form onSubmit={handlePinSubmit}>
                  <label>Title</label>
                  <input  placeholder="Enter the title.."
                  onChange={(e)=>{setTitle(e.target.value)}}
                  />
                  <label> Review</label>
                  <textarea placeholder="Say something about this palace..."
                  onChange={(e)=>{setDescr(e.target.value)}}
                  ></textarea>
                  <label>Rating</label>
                  <select onChange={(e)=>{setRating(e.target.value)}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button className="submitButton" type="submit">Add pin!</button>
              </form>
            </div>
          </Popup>
        }
      </Map>
      <div className="footer">
        <div className="footer_down">
          {
            currentUser ? (<button className="button logout">Log out</button>):
            (
              <div>
                <button className="button login">
                  Login
                </button>
                <button className="button register">
                  Register
                </button>
              </div>
            )
          }
        </div>
      </div>
      {showRegister && <Register/>}
      {showLogin && <Login/>}
    </div>
  );
}

export default App;
