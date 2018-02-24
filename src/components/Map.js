import React, { Component } from 'react';
// import g from '../utils/map';
import * as d3 from 'd3';
import Routes from './Routes';

import arteriesData from '../GeoJSON/sfmaps/base_map/arteries.json';
import freewaysData from '../GeoJSON/sfmaps/base_map/freeways.json';
import neighborhoodsData from '../GeoJSON/sfmaps/base_map/neighborhoods.json';
import streetsData from '../GeoJSON/sfmaps/base_map/streets.json';

import { getVehicleLocations } from '../api_helpers/api_helpers';
import { geoJSONConverter } from '../utils/geoJSONConverter';

class Map extends Component {
  constructor(props) {
    super(props);

    this.createBaseMap = this.createBaseMap.bind(this);
  }

  componentWillMount() {
  
  }

  createBaseMap() {
    
  }
  
  render() {
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


    return (
      <svg ref={node => this.node = node} width={960} height={700}>
        {neighborhoods}
        {arteries}
        {freeways}
        {streets}
        <Routes />
      </svg>
    );    
  }
}

export default Map;
