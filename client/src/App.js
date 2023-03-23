import "./App.css";
import * as React from "react";
import { Map, NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";
import axios from "axios";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pinAddSuccess=()=>{
  toast.success("Added Pin!!")
}
const userNotLoggedIn=()=>{
  toast.warning("Login to account to set pins!")
}
const userLoggedOut=(userS)=>{
  toast.warning("Logout from "+ userS)
}
const pinAddFailure=()=>{
  toast.error("Could add pin. Please fill all data!")
}
function App() {
  const [pins, setPins] = React.useState([]);
  // eslint-disable-next-line
  const [viewport, setViewport] = React.useState({
    longitude: 12.4,
    latitude: 37.8,
    zoom: 14,
  });
  const [currentPlacedId, setCurrentPlacedId] = React.useState(null);
  const [newPlace,setNewPlace]=React.useState(null);
  const [title,setTitle]=React.useState(null);
  const [descr,setDescr]=React.useState(null);
  const [rating,setRating]=React.useState(1);
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

  const handlePinSubmit=async(e)=>{
    e.preventDefault();
    const newPin={
      userName:currentUser,
      title:title,
      rating:rating,
      descr:descr,
      lat:newPlace.lat,
      lon:newPlace.lng,
    }
    try {
      if(!currentUser){
        userNotLoggedIn();
      }
      else{
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/pins`,newPin);
        setPins([...pins,response.data]);
        setNewPlace(null)
        pinAddSuccess();
        setRating(1);
        setDescr(null);
        setTitle(null);
      }
    } catch (err) {
      pinAddFailure();
      console.log(err);
    }
  }
  const handleMarkerClicked = (id, lat, lon) => {
    setCurrentPlacedId(id);
  };
  const handleLogout= () => {
    userLoggedOut(currentUser)
    setCurrentUser(null)
  }
  React.useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/pins`);
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
        <ToastContainer
        position="top-left"
        theme="dark"
        />
        <NavigationControl />
        {pins.map((p) => (
          <>
            <Marker longitude={p.lon} latitude={p.lat} ancher="center">
              <LocationOnIcon
                className="icon"
                onClick={() => handleMarkerClicked(p._id, p.lat, p.lon)}
                style={{ fontSize: viewport.zoom * 2, color:p.userName===currentUser?"tomato":"slateblue" }}
              />
            </Marker>
            {p._id === currentPlacedId && (
              <Popup
                longitude={p.lon}
                latitude={p.lat}
                closeOnClick={false}
                closeOnMove={false}
                onClose={()=>{setCurrentPlacedId(null);}}
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
            currentUser ? (<button className="button logout" onClick={()=>{handleLogout()}}>Log out</button>)
            :
            (
              <div>
                <button className="button login" onClick={()=>{setShowRegister(false); setShowLogin(true)}}>
                  Login
                </button>
                <button className="button register" onClick={()=>{setShowLogin(false); setShowRegister(true)}}>
                  Register
                </button>
              </div>
            )
          }
        </div>
      </div>
      {showRegister && <Register setShowRegister={setShowRegister}/>}
      {showLogin && <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser}/>}
    </div>
  );
}

export default App;
