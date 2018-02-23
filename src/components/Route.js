import React, { Component } from 'react';

import * as d3 from 'd3';

class Route extends Component {
  constructor(props) {
    super(props);

    console.log(props);
    
  }

  renderVehicles(route) {
    let vehicleLocations = getVehicleLocations(route);
    let routeVehicles = {...this.state.routes};
    routeVehicles[route] = vehicleLocations;
    this.setState({ routeVehicles });    
  }


  
  render() {
    // let scale = 300000;
    // let center = d3.geoCentroid(neighborhoodsData);
    // let width = 960;
    // let height = 700;
    // let offset = [width/2, height/2];
    // let proj = d3.geoMercator().scale( scale ).center( center ).translate( offset ); 
    // let pathGenerator = d3.geoPath().projection( proj );
    // let neighborhoods = neighborhoodsData.features.map((data, index) => {
    //   return (
    //     <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
    //   )
    // });
    // let arteries = arteriesData.features.map((data, index) => {
    //   return (
    //     <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
    //   )
    // });
    // let freeways = freewaysData.features.map((data, index) => {
    //   return (
    //     <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
    //   )
    // });
    // let streets = streetsData.features.map((data, index) => {
    //   return (
    //     <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
    //   )
    // });
    return (
      <svg ref={node => this.node = node} width={960} height={700}>
        {/* {vehicleLocations} */}
        
      </svg>
    );
  }
}

export default Route;
