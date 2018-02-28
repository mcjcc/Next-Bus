export const geoJSONConverter = (arrJSON, featureType) => {
  let geoJSONObj = {
    "type": "FeatureCollection",
    "features": []
  }

  arrJSON.forEach((point) => {
    let pointObj = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [point.lon, point.lat]
      },
      "properties": {
        "name": point.routeTag
      }
    };
    geoJSONObj["features"].push(pointObj);
  });

  return geoJSONObj;
};