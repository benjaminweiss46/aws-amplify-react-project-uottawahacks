import React, { Component, useState, Image } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, Polyline, HeatMap} from 'google-maps-react';
import * as covidData from "../covidData.json"
import Geocode from "react-geocode";
import axios from 'axios';
import virus from '../icons-virus2.png'
import walking from '../walking.png'

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
    showingInfoWindowUser: true,
    activeMarkerUser: {},
    selectedPlaceUser: {},
    risk: 0
  };
  getRisk(latlng) {
    try {
      axios.get('https://safetrekbackend.herokuapp.com/?lat='+latlng.lat().toString()+'&long='+latlng.lng().toString(), config)
        .then(res => {
          const r = res.data.weighted_avg_exposure.toFixed(2);
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
    const heatData = [
            {lat: 45.4810323,lng: -75.5100002, weight: 0.2422680412},
            {lat: 45.44634845,lng: -75.54297672831477, weight: 0.3762886616},
            {lat: 45.280172,lng: -75.759707, weight: 0.438144332},
            {lat: 45.3270693,lng: -75.92013157507392, weight:0.219072166},
            {lat: 45.344318900000005,lng: -76.10733091174072, weight: 0.1752577328},
            {lat: 45.2932625,lng: -75.92694788300115, weight: 0.244845362},
            {lat: 45.357387,lng: -75.862424, weight: 0.180412372},
            {lat: 45.32664695,lng: -75.83855656986515, weight: 0.2912371148},
            {lat: 45.3251627,lng: -75.7523965140062, weight: 0.3943298988},
            {lat: 45.3546314,lng: -75.60176637929231, weight: 1},
            {lat: 45.44364865,lng: -75.60116829403388, weight: 0.5309278376},
            {lat: 45.43114865,lng: -75.67649238436982, weight: 0.6675257764},
            {lat: 45.4428243,lng: -75.63287646926986, weight: 0.5515463944},
            {lat: 45.4125643,lng: -75.70463854107373, weight: 0.2680412384},
            {lat: 45.39381415,lng: -75.74446300572795, weight: 0.154639176},
            {lat: 45.3588909,lng: -75.68394616447799, weight: 0.4536082496},
            {lat: 45.394166049999995,lng: -75.69061638728044, weight: 0.2345360836},
            {lat: 45.396044200000006,lng: -75.63600683134734, weight: 0.7706185604},
            {lat: 45.4248393,lng: -75.38310362294976, weight: 0.3041237128},
            {lat: 45.222132,lng: -75.52350475889676, weight: 0.244845362},
            {lat: 45.1269855,lng: -75.81363367556683, weight: 0.4278350536},
            {lat: 45.28990735,lng: -75.68291785710551, weight: 0.3144329912},
            {lat: 45.29484665,lng: -75.87825927288544, weight: 0.1417525778}
          ]

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
            icon={virus}
            onClick={this.onMarkerClick}
           />
            //heatData.push({lat: area.Location[0], lng: area.Location[1], weight:area.["Number of Cases Reported in the Last 14 Days Linked to Outbreaks in  LTCH and RH"] + area.["Number of Cases Reported in the Last 14 Days,  Excluding LTCH and RH"]})
        ))}

        {this.state.addedMarkers.map((added) => (
          <Marker
            position={added}
            onClick={this.onUserMarkerClick}
            icon={walking}
          />
        ))}
        <HeatMap
              gradient={gradient}
              opacity={0.5}
              positions={heatData}
              radius={200}
        />
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
              <h3>Exposure: {this.state.risk}</h3>
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

