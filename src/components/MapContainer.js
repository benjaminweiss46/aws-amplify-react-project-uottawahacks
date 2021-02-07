import React, { Component, useState } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, Polyline, HeatMap} from 'google-maps-react';
import * as covidData from "../covidData.json"
import Geocode from "react-geocode";
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};
Geocode.setApiKey("AIzaSyBraKNh5eY4BQxe-xcfc4DhC5ZX_coTegs");
Geocode.enableDebug();
const heat = { positions: [{lat: 45.414358, lng: -75.715181, weight: 10}],
              options: {
                radius: 10,
                opacity: 3
                }
              };
const config = {
    headers: {
     "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    generatedMarkers: [],
    addedMarkers: [],
    addedMarker: false,
    showingInfoWindowUser: false,
    activeMarkerUser: {},
    selectedPlaceUser: {}
  };
  componentDidMount() {
    axios.get('https://safetrekbackend.herokuapp.com/risk/eval/', config)
      .then(res => {
        console.log(res)
      });
  }
  /*getAddress(added) {
    return Geocode.fromLatLng(added.lat(), added.lng()).then(
    response => {
      return response.results[0].formatted_address;
      },
      error => {
        return ""
      }
    )
  }
  addMarkertoRegistry() {
    for (area in covidData.features) {

    }
    this.setState(prevState => ({
        generatedMarkers: [...prevState.generatedMarkers,area],
    }))
    console.log(this.state.generatedMarkers)
  }*/

  onMarkerClick = (props, marker, e) => {

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    console.log(this.state.activeMarker)
    console.log(this.state.selectedPlace)
  }

  onUserMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlaceUser: props,
      activeMarkerUser: marker,
      showingInfoWindowUser: true,
    });
  }
  onMapClicked = (mapProps, map, clickEvent) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
    else if (this.state.addedMarker == false) {
      this.setState(prevState => ({
        addedMarkers: [...prevState.addedMarkers,clickEvent.latLng],
        addedMarker: true
      }))
    } 
    else {
      this.setState(prevState => ({
        addedMarkers: [clickEvent.latLng],
        addedMarker: true
      }))
    }

    /**else if (this.state.addedMarkers < 2) {
      console.log("show risk along path")
      this.setState(prevState => ({
        addedMarkers: [...prevState.addedMarkers,clickEvent.latLng]
      }))
    }**/
    console.log(this.state.addedMarkers)
  };
  render() {
      const triangleCoords = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    ];
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        heatmaplibrary={true}
        heatmap={heat}
        //onLoad={this.addMarkertoRegistry()}
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
        {this.state.addedMarkers.map((added) => (
          <Marker
            position={added}
            onClick={this.onUserMarkerClick}
          />
        ))}
         <Polyline
            path={triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.title}</h1>
              <h3>Cases Past 14 Days: {this.state.selectedPlace.name}</h3>
            </div>
        </InfoWindow>
        <InfoWindow
          marker={this.state.activeMarkerUser}
          visible={this.state.showingInfoWindowUser}>
            <div>
              <h3>Risk Score: </h3>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBraKNh5eY4BQxe-xcfc4DhC5ZX_coTegs',
  libraries: ["visualization"]
})(MapContainer);

