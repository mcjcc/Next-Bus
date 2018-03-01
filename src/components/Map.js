import React, { Component } from 'react';

import Route from './Route';

import { getVehicles } from '../api_helpers/api_helpers';
import { routes } from './initialState.js';
import { width, height, neighborhoods, arteries, freeways, streets } from '../utils/map.js';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { routes };

    this.toggleRoute = this.toggleRoute.bind(this);
  }

  renderRoutePicker() {
    let { routes } = this.state;
    let routesArr = Object.keys(routes);
    return routesArr.map((route, idx) => {
      return(
        <div key={`${route}-${idx}`}>
            <input type="checkbox" id={route} onChange={() => {this.toggleRoute(route)}}/>
            <label htmlFor={route}>{route}</label>
        </div>
      );
    })
  }

  renderMap() {
    return (
      <g>
        {neighborhoods}
        {arteries}
        {freeways}
        {streets}
      </g>
    );
  }

  toggleRoute(route) {
    let newState = {...this.state};
    if (newState.routes[route].length) {
      newState.routes[route] = [];
      this.setState(newState);
    } else {
      this.fetchInitialVehicles(route);
    }
  }

  fetchInitialVehicles(route) {
    let newState = {...this.state};
    getVehicles(route)
    .then(vehicles => {
      newState.routes[route] = vehicles;
      this.setState(newState);
    });
  }

  render() {
    let { routes } = this.state;
    let shownRoutes = Object.keys(routes).filter((key) => {
      return routes[key].length > 0;
    });

    return (
      <div className="map-route-picker-container">
        <div className="route-picker">
          <h1>Select routes</h1>
          <p>Selected routes update every 15 seconds</p>
          {this.renderRoutePicker()}
        </div>
        <div className="svg-map-routes-container">
          <svg width={width} height={height}>
            {this.renderMap()}
            {
              shownRoutes.map((route, idx) => {
                return <Route key={`${route}-${idx}`} route={route} vehicles={routes[route]}/>
              })
            }
          </svg>
        </div>
      </div>
    );
  }
}

export default Map;
