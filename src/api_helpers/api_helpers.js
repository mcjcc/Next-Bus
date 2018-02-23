import axios from 'axios';


const nextbusURL = 'http://webservices.nextbus.com/service/publicJSONFeed';
const agency = 'sf-muni';

// retrieve all routes
export const getRoutes = () => {
  return axios.get(nextbusURL, {
    params: {
      command: 'routeList',
      a: agency
    }
  }).then(list => console.log(list));
}


// retrieve route details e.g. path coordinates, stops
export const getRouteDetails = (route) => {
  return axios.get(nextbusURL, {
    params: {
      command: 'routeConfig',
      r: route,
      a: agency
    }
  }).then(data => {});
}


// retrieve vehicle locations for a specific route @ at the current time when this function is called
export const getVehicleLocations = (route) => {
  let t = (new Date()).getTime(); // current Unix epoch time in milliseconds
  return axios.get(nextbusURL, {
    params: {
      command: 'vehicleLocations',
      r: route,
      a: agency,
      t: t
    }
  }).then(data => {
    // return a list of coordinates
    return data.vehicle.map(vehicle => {
      let {lon, lat} = vehicle;
      return {lon, lat};
    })
  });
}
