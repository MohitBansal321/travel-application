import './App.css';
import * as React from 'react';
import {Map,NavigationControl,Marker} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
function App() {
   const [pins, setPins] = React.useState([]);
  React.useEffect(() => {
    const getPins=async()=>{
      try {
        const response=await axios.get("/pins")
        console.log(response);
        setPins(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getPins();
  },[])
  
  return (
    <div>

      <Map
      container={'map'}
      projection={'globe'}
      initialViewState={{}}
      mapboxAccessToken={process.env.REACT_APP_TOKEN}
      style={{width:"100vw",height:"100vh"}}
      mapStyle="mapbox://styles/mohitbansal321/clcmd40sy00nb14pgvpy12ivr"
      >
        <NavigationControl/>
        {
          pins.map(p=>(
            <>
              <Marker
              longitude={p.lon}
              latitude={p.lat}
              >

              </Marker>
            </>
          ))
        }
      </Map>
    </div>
  );
}

export default App;
