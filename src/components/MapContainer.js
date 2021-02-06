import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    const triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ];
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 45.4215,
            lng: -75.6972
          }
        }
        onClick={this.onMapClicked}>

        <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />
      </Map>
    );
  }
  onMapClicked() {
    console.log("Click")
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBraKNh5eY4BQxe-xcfc4DhC5ZX_coTegs'
})(MapContainer);

