import React, { Component } from 'react';
import * as d3 from 'd3';
// import Routes from './Routes';
import Route from './Route';

import arteriesData from '../GeoJSON/sfmaps/base_map/arteries.json';
import freewaysData from '../GeoJSON/sfmaps/base_map/freeways.json';
import neighborhoodsData from '../GeoJSON/sfmaps/base_map/neighborhoods.json';
import streetsData from '../GeoJSON/sfmaps/base_map/streets.json';

import { getRoutes, getVehicles } from '../api_helpers/api_helpers';
import { routes } from './initialState.js';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { routes };

    this.renderRoutePicker = this.renderRoutePicker.bind(this);
    this.toggleRoute = this.toggleRoute.bind(this);
    this.fetchInitialVehicles = this.fetchInitialVehicles.bind(this);
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
    console.log('inside render Map');
    let scale = 300000;
    let center = d3.geoCentroid(neighborhoodsData);

    let width = 960;
    let height = 700;
    let offset = [width/2, height/2];
    let proj = d3.geoMercator().scale( scale ).center( center ).translate( offset );
    let pathGenerator = d3.geoPath().projection( proj );
    let neighborhoods = neighborhoodsData.features.map((data, index) => {
      return (
        <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
      )
    });
    let arteries = arteriesData.features.map((data, index) => {
      return (
        <path key={'path'+index} d={pathGenerator(data)} className='arteries' />
      )
    });
    let freeways = freewaysData.features.map((data, index) => {
      return (
        <path key={'path'+index} d={pathGenerator(data)} className='freeways' />
      )
    });

    let streets = streetsData.features.map((data, index) => {
      return (
        <path key={'path'+index} d={pathGenerator(data)} className='streets' />
      )
    });

    let { routes } = this.state;

    let shownRoutes = Object.keys(routes).filter((key) => {
      return routes[key].length > 0;
    });


    return (
      <div>
        <div className="svg-container">
          <svg ref={node => this.node = node} width={960} height={700}>
            {neighborhoods}
            {/* {arteries}
            {freeways}
            {streets} */}
            {
              shownRoutes.map((route, idx) => {
                return <Route key={`${route}-${idx}`} route={route} vehicles={routes[route]}/>
              })
            }
          </svg>
        </div>
        <div className="route-picker">
          <h1>Select routes</h1>
          {this.renderRoutePicker()}
        </div>
      </div>
    );
  }
}

export default Map;
