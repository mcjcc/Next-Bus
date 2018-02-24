import React, { Component } from 'react';
import * as d3 from 'd3';
import { getVehicleLocations } from '../api_helpers/api_helpers';
import { geoJSONConverter } from '../utils/geoJSONConverter';

class Route extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      vehicleLocations: [
        {lon: "-122.42234", lat: "37.798965" , routeTag: "N"},
        {lon: "-122.396698", lat: "37.752327", routeTag: "N"},
        {lon: "-122.421883", lat: "37.806499", routeTag: "N"},
        {lon: "-122.539207", lat: "37.832634", routeTag: "N"},
        {lon: "-122.397385", lat: "37.753819", routeTag: "N"},
        {lon: "-122.396416", lat: "37.749805", routeTag: "N"},
        {lon: "-122.419212", lat: "37.783237", routeTag: "N"},
        {lon: "-122.401329", lat: "37.762489", routeTag: "N"},
        {lon: "-122.419846", lat: "37.786022", routeTag: "N"},
        {lon: "-122.420425", lat: "37.789501", routeTag: "N"},
      ]
    }
    this.renderVehicles = this.renderVehicles.bind(this);
  }

  fetchVehicles(route) {
    let vehicleLocations = getVehicleLocations(route);
    this.setState({ vehicleLocations });    
  }

  renderVehicles() {
    let scale = 300000;
    let center = [-122.44115773600706, 37.75581744782966];    
    let width = 960;
    let height = 700;
    let offset = [width/2, height/2];
    let proj = d3.geoMercator().scale(scale).center(center).translate(offset); 
    let pathGenerator = d3.geoPath().projection(proj);

    let { route } = this.props;
    let { vehicleLocations } = this.state;
    let vehicles = vehicleLocations.map((data, index) => {
      let {lon, lat} = data;
      let vehicle = d3.geoCircle().center([lon, lat]).radius(1);
      let cx = proj([lon, lat])[0];
      let cy = proj([lon, lat])[1];
      return (
        <circle cx={cx} cy={cy} r="8px" fill="red" route={route}></circle>
      );
    });
    return vehicles;
  }

  render() {    
    
    return this.renderVehicles();    
  }
}



export default Route;
