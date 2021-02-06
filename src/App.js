import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

function App() {
  export class MapContainer extends Component {
    render() {
      return (
        <Map google={this.props.google} zoom={14}>
   
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      );
    }
}
 
export default GoogleApiWrapper({
  apiKey: (AIzaSyBraKNh5eY4BQxe-xcfc4DhC5ZX_coTegs)
})(MapContainer)


