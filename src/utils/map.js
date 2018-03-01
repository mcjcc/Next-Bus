import React from 'react';

import * as d3 from 'd3';

import arteriesData from '../GeoJSON/sfmaps/base_map/arteries.json';
import freewaysData from '../GeoJSON/sfmaps/base_map/freeways.json';
import neighborhoodsData from '../GeoJSON/sfmaps/base_map/neighborhoods.json';
import streetsData from '../GeoJSON/sfmaps/base_map/streets.json';

let scale = 350000;
let center = d3.geoCentroid(neighborhoodsData);

let width = 1000;
let height = 1000;
let offset = [width/2, height/2];
let projection = d3.geoMercator().scale( scale ).center( center ).translate( offset );
let pathGenerator = d3.geoPath().projection( projection );


// returns neighborhood svg paths
const neighborhoods = neighborhoodsData.features.map((data, index) => {
  return (
    <path key={'path'+index} d={pathGenerator(data)} className='neighborhood' />
  )
});

// returns arteries svg paths
const arteries = arteriesData.features.map((data, index) => {
  return (
    <path key={'path'+index} d={pathGenerator(data)} className='arteries' />
  )
});

// returns freeways svg paths
const freeways = freewaysData.features.map((data, index) => {
  return (
    <path key={'path'+index} d={pathGenerator(data)} className='freeways' />
  )
});

// returns streets svg paths
const streets = streetsData.features.map((data, index) => {
  return (
    <path key={'path'+index} d={pathGenerator(data)} className='streets' />
  )
});

export {
  width,
  height,
  projection,
  neighborhoods,
  arteries,
  freeways,
  streets
}