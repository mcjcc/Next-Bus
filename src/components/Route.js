import React, { Component } from 'react';
import * as d3 from 'd3';

import './styles/Route.css';

class Route extends Component {
  constructor(props) {
    super(props);
    this.renderVehicles = this.renderVehicles.bind(this);
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
    let { vehicles } = this.props;
    
    let vehiclesLocations = vehicles.map((data, index) => {
      let {lon, lat} = data;
      let vehicle = d3.geoCircle().center([lon, lat]).radius(1);
      let cx = proj([lon, lat])[0];
      let cy = proj([lon, lat])[1];      
      
      return (
        <circle key={`vehicle-${route}-${index}`} cx={cx} cy={cy} r="8px" route={route}></circle>
      );
    });
    return vehiclesLocations;    
  }

  render() {
    return this.renderVehicles();    
  }
}

export default Route;
