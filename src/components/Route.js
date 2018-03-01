import React, { Component } from 'react';

import { getVehicles } from '../api_helpers/api_helpers';
import { projection } from '../utils/map.js';

import './styles/Route.css';

class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: this.props.vehicles
    }

    this.fetchVehicles = this.fetchVehicles.bind(this);
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
        });
      });
  }

  // fetch vehicles every 15 seconds
  updateVehicles(route) {
    this.update = setInterval(() => {
      console.log('15 seconds');
      this.fetchVehicles(route);
    }, 15000);
  }

  stopUpdateVehicles() {
    clearInterval(this.update);
  }

  renderVehicles() {
    let { route } = this.props;
    let { vehicles } = this.state;

    // returns an array of vehicle locations as svg elements
    let vehiclesLocations = vehicles.map((coordinates, index) => {
      let {lon, lat} = coordinates;
      let cx = projection([lon, lat])[0];
      let cy = projection([lon, lat])[1];
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
