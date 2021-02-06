import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, HeatMap} from 'google-maps-react';
import * as covidData from "../covidData.json"
//import * as polys from "../polys.json"
const mapStyles = {
  width: '100%',
  height: '100%'
};
const ottawaCoords = [
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
const heat = { positions: [{lat: 45.414358, lng: -75.715181, weight: 4}],
              options: {
                radius: 20,
                opacity: 0.6
                }
              };
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }  
  onMapClicked(event) {
    this.setState((state) => {
      state.places.append(event.position);
      console.log(this.state.places)
      return {places: state.places };
    })
  };
  onMarkerClicked(event) {
    console.log(event)
  };
  render() {
    const { places } = this.state;
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        heatmaplibrary={true}
        heatmap={heat}
        initialCenter={
          {
            lat: 45.4215,
            lng: -75.6972
          }
        }
        onClick={this.onMapClicked}>
        {covidData.features.map((area) => (
          <Marker 
            key={area.["Ward_Name"]} 
            position={{
              lat: area.Location[0],
              lng: area.Location[1]
            }}
            onClick={this.onMarkerClicked}
            />
          ))}
        <Polygon
          paths={ottawaCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}/>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBraKNh5eY4BQxe-xcfc4DhC5ZX_coTegs'
})(MapContainer);

