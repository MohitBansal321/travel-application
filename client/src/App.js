import './App.css';
import * as React from 'react';
import {Map,NavigationControl} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
function App() {
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
      </Map>
    </div>
  );
}

export default App;
