import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    const triangleCoords = [
      {lat: 45.376267, lng: -75.785266},
      {lat: 45.347802, lng: -75.818934},
      {lat: 45.314978, lng: -75.795572},
      {lat: 45.335737, lng: -75.705562},
      {lat: 45.382055, lng: -75.583944},
      {lat: 45.419178, lng: -75.522105},
      {lat: 45.455796, lng: -75.442401},
      {lat: 45.502016, lng: -75.474008},
      {lat: 45.462057, lng: -75.594251},
      {lat: 45.454351, lng: -75.689071},
      {lat: 45.414358, lng: -75.715181},
      {lat: 45.402789, lng: -75.756407},
      {lat: 45.414358, lng: -75.715181}
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

