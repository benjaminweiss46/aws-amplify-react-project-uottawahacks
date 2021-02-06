import React from 'react';
import logo from './logo.svg';
import './App.css';
import { map, GoogleApiWrapper } from 'google-maps-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello from V2</h1>
      </header>
      <body>

      </body>
    </div>
  );
}

render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
    );
  }
export default GoogleApiWrapper({
  apiKey: 'TOKEN HERE'
})(MapContainer);
export default App;
