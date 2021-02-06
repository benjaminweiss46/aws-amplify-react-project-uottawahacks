import React, { Component, useState } from 'react';
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
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
 
  onMarkerClick = (props, marker, e) => {

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log(this.state.activeMarker)
    console.log(this.state.selectedPlace)
  }

  onMapClicked = (props,e) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
    console.log(e.latLng)
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
            title={area.["Ward_Name"]} 
            name={area.["Number of Cases Reported in the Last 14 Days Linked to Outbreaks in  LTCH and RH"] + area.["Number of Cases Reported in the Last 14 Days,  Excluding LTCH and RH"]}
            position={{
              lat: area.Location[0],
              lng: area.Location[1]
            }}
            onClick={this.onMarkerClick}
            />
          ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.title}</h1>
              <h3>Cases Past 14 Days: {this.state.selectedPlace.name}</h3>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBraKNh5eY4BQxe-xcfc4DhC5ZX_coTegs'
})(MapContainer);

