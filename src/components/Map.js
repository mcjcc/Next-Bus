import React, { Component } from 'react';
// import g from '../utils/map';
import * as d3 from 'd3';

import arteriesData from '../GeoJSON/sfmaps/base_map/arteries.json';
import freewaysData from '../GeoJSON/sfmaps/base_map/freeways.json';
import neighborhoodsData from '../GeoJSON/sfmaps/base_map/neighborhoods.json';
import streetsData from '../GeoJSON/sfmaps/base_map/streets.json';

class Map extends Component {
  constructor(props) {
    super(props);
    this.createBaseMap = this.createBaseMap.bind(this);
  }

  componentWillMount() {
    // this.createBaseMap();
  }

  createBaseMap() {
    let node = this.node;

    // width and height of whole visualization
    // let width = 960;
    // let height = 700;

    // Create SVG
    // let svg = d3.select('#map')              
    //             .append('svg')
    //             .attr('class', 'svg-container')
    //             .attr('width', width)
    //             .attr('height', height);

    // let offset = [width/2, height/2];
    // let scale = 300000;
    
 
  
    // d3.json(neighborhoodsData, (error, geoData) => {
    //   let center = d3.geoCentroid(geoData);

    //   let proj = d3.geoMercator().scale( scale ).center( center ).translate( offset );
    //   let path = d3.geoPath().projection( proj );
    //   d3.select("svg").append("path")
    //   .attr("d", path(geoData));
    // });

    // d3.json(base_map_path + `/arteries.json`, (error, geoData) => {
    //   let center = d3.geoCentroid(geoData);
      
    //   let proj = d3.geoMercator().scale( scale ).center( center ).translate( offset );
    //   let path = d3.geoPath().projection( proj );
    //   d3.select("svg").append("path")
    //   .attr("d", path(geoData));
    // });

    // d3.json(base_map_path + `/freeways.json`, (error, geoData) => {
    //   let center = d3.geoCentroid(geoData);

    //   let proj = d3.geoMercator().scale( scale ).center( center ).translate( offset );
    //   let path = d3.geoPath().projection( proj );
    //   d3.select("svg").append("path")
    //   .attr("d", path(geoData));
    // });
    
    // d3.json(base_map_path + `/streets.json`, (error, geoData) => {
    //   let center = d3.geoCentroid(geoData);      

    //   let proj = d3.geoMercator().scale( scale ).center( center ).translate( offset );
    //   let path = d3.geoPath().projection( proj );
    //   d3.select("svg").append("path")
    //   .attr("d", path(geoData));
    // });
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
        <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
      )
    });
    let freeways = freewaysData.features.map((data, index) => {
      return (
        <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
      )
    });
    let streets = streetsData.features.map((data, index) => {
      return (
        <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
      )
    });
    return (
      <svg ref={node => this.node = node} width={960} height={700}>
        {neighborhoods}
        {arteries}
        {freeways}
        {streets}
      </svg>
    );
  }
}

export default Map;
