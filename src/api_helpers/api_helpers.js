import axios from 'axios';


const NEXT_BUS_URL = 'http://webservices.nextbus.com/service/publicJSONFeed';
const AGENCY = 'sf-muni';

// retrieve all routes
export const getRoutes = () => {
  return axios.get(NEXT_BUS_URL, {
    params: {
      command: 'routeList',
      a: AGENCY
    }
  }).then(response => {
    console.log(response)
  }).catch(err => {
    console.log('api getRoutes error');
  });
}


// retrieve route details e.g. path coordinates, stops
export const getRouteDetails = (route) => {
  return axios.get(NEXT_BUS_URL, {
    params: {
      command: 'routeConfig',
      r: route,
      a: AGENCY
    }
  }).then(response => {
    console.log(response);
  }).catch(err => {
    console.log('api getRouteDetails error');
  });
}


// retrieve vehicle locations for a specific route @ at the current time when this function is called
export const getVehicles = (route) => {
  let time = 0;
  return axios.get(NEXT_BUS_URL, {
    params: {
      command: 'vehicleLocations',
      r: `${route}`,
      a: AGENCY,
      t: time
    }
  }).then(response => {
    // return a list of coordinates
    let {data} = response;
    let {vehicle = []} = data;
    return vehicle.map((vehicle) => {
      let {lon, lat, routeTag} = vehicle;
      return {lon, lat, routeTag};
    });
  }).catch(err => {
    console.log('api getVehicles error');
  });
}
