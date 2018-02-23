import React, { Component } from 'react';
import './App.css';

import { getRoutes, getVehicleLocations } from '../api_helpers/api_helpers';

import Map from './Map';
import Route from './Route';


class App extends Component {
  constructor() {
    super();
    this.state = {
      routes: {
        '19': [
          {lon: "-122.42234", lat: "37.798965"},
          {lon: "-122.396698", lat: "37.752327"},
          {lon: "-122.421883", lat: "37.806499"},
          {lon: "-122.539207", lat: "37.832634"},
          {lon: "-122.397385", lat: "37.753819"},
          {lon: "-122.396416", lat: "37.749805"},
          {lon: "-122.419212", lat: "37.783237"},
          {lon: "-122.401329", lat: "37.762489"},
          {lon: "-122.419846", lat: "37.786022"},
          {lon: "-122.420425", lat: "37.789501"},
        ],
        'F': []
      }
    };
  }

  componentWillMount() {
    // getRoutes();    
  }

  renderVehicles(route) {
    let vehicleLocations = getVehicleLocations(route);
    let routeVehicles = {...this.state.routes};
    routeVehicles[route] = vehicleLocations;
    this.setState({ routeVehicles });    
  }


  render() {
    return (
      <div className="App">
        <Map />
        <Route name={'19'} vehicleLocations={this.state.routes['19']} />
      </div>
    );
  }
}

export default App;
