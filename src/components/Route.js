import React, { Component } from 'react';
import * as d3 from 'd3';

import { getVehicles } from '../api_helpers/api_helpers';

import './styles/Route.css';

class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: this.props.vehicles
    }

    this.fetchVehicles = this.fetchVehicles.bind(this);
    this.updateVehicles = this.updateVehicles.bind(this);
    this.stopUpdateVehicles = this.stopUpdateVehicles.bind(this);
  }

  componentDidMount() {
    let {route} = this.props;
    this.updateVehicles(route);
  }

  componentWillUnmount() {
    this.stopUpdateVehicles();
  }

  fetchVehicles(route) {
    getVehicles(route)
      .then(vehicles => {
        this.setState({
          vehicles: vehicles
        })
      });
  }

  updateVehicles(route) {
    this.update = setInterval(() => {
      console.log('15 seconds');
      this.fetchVehicles(route)
    }, 15000);
  }

  stopUpdateVehicles() {
    clearInterval(this.update);
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
    let { vehicles } = this.state;

    let vehiclesLocations = vehicles.map((data, index) => {
      let {lon, lat} = data;
      let vehicle = d3.geoCircle().center([lon, lat]).radius(1);
      let cx = proj([lon, lat])[0];
      let cy = proj([lon, lat])[1];

      return (
        <g key={`vehicle-${route}-${index}-g`}>
        <circle key={`vehicle-${route}-${index}-circle`} cx={cx} cy={cy} r="4px" route={route}></circle>
        <text key={`vehicle-${route}-${index}-text`} x={cx} y={cy} textAnchor="middle" fill="orange" fontSize="10px" dy=".3em">{route}</text>
        </g>
      );
    });
    return vehiclesLocations;
  }

  render() {
    return (
      this.renderVehicles()
    );
  }
}

export default Route;
