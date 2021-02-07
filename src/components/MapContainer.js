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
    selectedPlaceUser: {},
    risk: 0
  };
  getRisk(latlng) {
    try {
      axios.get('https://safetrekbackend.herokuapp.com/?lat='+latlng.lat().toString()+'&long='+latlng.lng().toString(), config)
        .then(res => {
          const r = res.data.weighted_avg_risk
          console.log(res)
          this.setState({
            risk: r
          })
        });
    }
    catch(err) {
      console.log(err)
    }

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
    //console.log(this.state.activeMarker)
    //console.log(this.state.selectedPlace)
  }

  onUserMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlaceUser: props,
      activeMarkerUser: marker,
      showingInfoWindowUser: true,
    });
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    const r = this.getRisk(clickEvent.latLng)
    this.setState({
      risk: r
    })
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
  };
 
  getHeatList(item) {
    var format = {lat: item.Location[0], lng: item.Location[1], weight: 2}
  }
  

  render() {
      const triangleCoords = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    ];
    const heatData = covidData.features.map(this.getHeatList)
    const gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
          ];
        
    const positions = [
            { lat: 45.4810323, lng: -75.5100002},
            { lat: 45.44634845, lng: -75.54297672831477, }
        ];    
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        heatmaplibrary={true}
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
            //heatData.push({lat: area.Location[0], lng: area.Location[1], weight:area.["Number of Cases Reported in the Last 14 Days Linked to Outbreaks in  LTCH and RH"] + area.["Number of Cases Reported in the Last 14 Days,  Excluding LTCH and RH"]})
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
              <h3>Risk Score: {this.state.risk}</h3>
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

