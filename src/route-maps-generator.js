import { toJSON, fromJSON } from 'transit-immutable-js';
import { fromJS } from 'immutable';
import { readFileSync, writeFileSync } from 'fs';
import request from 'requestretry';
import { groupBy, flatMap, keyBy, findIndex } from 'lodash';

const query = `
  query trips{
    trips{
      gtfsId
      shapeId
      directionId
      stops {
        gtfsId
      }
      route{
        type
        shortName
        gtfsId
      }
    }
    stops {
      gtfsId
      lat
      lon
    }
  }`;


// const tripQuery = id => `
//   query shape{
//     trip(id: "${id}") {
//       geometry
//     }
//   }`;

// const tripRequiest = (uri, gtfsId) => ({
//   url: uri,
//   body: tripQuery(gtfsId),
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/graphql'
//   },
//   fullResponse: false
// });

const uri = 'http://tulevatreitit.hsl.fi/otp/routers/helsinki/index/graphql';

request({
  url: uri,
  body: query,
  maxAttempts: 120,
  retryDelay: 30000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/graphql'
  },
  fullResponse: false
})
.then((body) => {
  const stops = keyBy(JSON.parse(body).data.stops, stop => stop.gtfsId);
  const shapes = groupBy(JSON.parse(body).data.trips, trip => trip.shapeId);
  // const shapeIds = Object.keys(shapes);
  const routes = groupBy(shapes, shape => shape[0].route.gtfsId);
  Object.keys(routes).forEach(route => {
    const baseFile = fromJSON(readFileSync('./map.json'));

    const routeLayers = [
      findIndex(baseFile.layers, layer => layer.text === 'Routes'),
      findIndex(baseFile.layers, layer => layer.text === 'Routes-Alternative'),
    ];

    const stopLayers = [
      findIndex(baseFile.layers, layer => layer.text === 'Stops'),
      findIndex(baseFile.layers, layer => layer.text === 'Stops-Alternative'),
    ];

    console.log(stopLayers)

    const routeFilters = [
      [
        '==',
        'id',
      ],
      [
        '==',
        'id',
      ],
    ];

    const stopFilters = [
      [
        'in',
        'gtfsId',
      ],
      [
        'in',
        'gtfsId',
      ],
    ];

    routes[route].forEach(pattern =>
      routeFilters[parseInt(pattern[0].directionId, 10)].push(pattern[0].shapeId)
    );

    routes[route].forEach(pattern =>
      pattern[0].stops.forEach(stop => stopFilters[parseInt(pattern[0].directionId, 10)].push(stop.gtfsId))
    );

    routeFilters.forEach((routeFilter, index) => {
      if (routeFilter.length > 2) {
        baseFile.layers[routeLayers[index]].filter = fromJS(routeFilter);
        baseFile.layers[routeLayers[index]].enabled = true;
      } else {
        baseFile.layers[routeLayers[index]].enabled = false;
      }
    });

    stopFilters.forEach((stopFilter, index) => {
      if (stopFilter.length > 2) {
        baseFile.layers[stopLayers[index]].filter = fromJS(stopFilter);
        baseFile.layers[stopLayers[index]].enabled = true;
      } else {
        baseFile.layers[stopLayers[index]].enabled = false;
      }
    });

    baseFile.layers[findIndex(baseFile.layers, layer => layer.text === 'POI-citybikes')].enabled = false;
    baseFile.layers[findIndex(baseFile.layers, layer => layer.text === 'POI-park-and-ride')].enabled = false;

    const bounds = flatMap(routes[route], pattern => pattern[0].stops.map(stop => stops[stop.gtfsId])).reduce((previous, current) => ({
      maxLat: previous.maxLat > current.lat ? previous.maxLat : current.lat,
      minLat: previous.minLat < current.lat ? previous.minLat : current.lat,
      maxLon: previous.maxLon > current.lon ? previous.maxLon : current.lon,
      minLon: previous.minLon < current.lon ? previous.minLon : current.lon,
    }), {
      maxLat: -Infinity,
      minLat: Infinity,
      maxLon: -Infinity,
      minLon: Infinity,
    });

    const center = [(bounds.minLon + bounds.maxLon) / 2, (bounds.minLat + bounds.maxLat) / 2];

    const sizeDeg = [bounds.maxLon - bounds.minLon, bounds.maxLat - bounds.minLat];

    const degToRad = deg => deg * Math.PI / 180;

    const sizeMM = sizeDeg[1] > sizeDeg[0] * Math.cos(degToRad(center[1])) ? [297, 390] : [390, 297];

    baseFile.mapSelection = baseFile.mapSelection.set('size', fromJS(sizeMM));

    baseFile.mapSelection = baseFile.mapSelection.setIn(['center', 0, 'location'], fromJS(center));

    baseFile.mapSelection = baseFile.mapSelection.set('pixelScale', 0.5);

    const EARTH_CIRC_M = 40075016.686;
    const DEG_LAT_PER_M = EARTH_CIRC_M / 360;
    const M_TO_MM = 1000;
    const degLonPerM = degLat => DEG_LAT_PER_M * Math.abs(Math.cos(degToRad(degLat)));

    const mapScale = Math.max(
      sizeDeg[0] * degLonPerM(center[1]) * M_TO_MM / sizeMM[0],
      sizeDeg[1] * DEG_LAT_PER_M * M_TO_MM / sizeMM[1]
    ) * 1.1;

    baseFile.mapSelection = baseFile.mapSelection.set('mapScale', mapScale);

    writeFileSync(`./route-maps/${route}.json`, toJSON(baseFile));
  });

  // const shapePromises = shapeIds.map(shapeId => request(tripRequiest(uri, shapes[shapeId][0].gtfsId)));
  // Promise.all(shapePromises).then(geometries => {
  //   zip(shapeIds, shapeIds.map(shapeId => shapes[shapeId][0].route), geometries).forEach(bundle => {

  //   });
  // }).catch((err) => {
  //   console.log(err);
  // });
});
