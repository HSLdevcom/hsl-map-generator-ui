var viewportMercator = require('viewport-mercator-project');
var jsdom = require('jsdom').jsdom;
var uniqBy = require('lodash/uniqBy');
var window = jsdom().defaultView;
var pretty = require('html').prettyPrint;
var request = require('requestretry');

var width = 7195 / 6;
var height = 7195 / 6;


var viewport = viewportMercator({
  longitude: 24.73717,
  latitude: 60.16161,
  zoom: 17.248,
  width: width,
  height: height,
  tileSize: 256
});

const getQuery = ({minLon, minLat, maxLon, maxLat}) => `query stops{
  stopsByBbox(minLon: ${minLon}, minLat: ${minLat}, maxLon: ${maxLon}, maxLat:${maxLat}){
    name
    code
    lat
    lon
    patterns {
      route{
        shortName
      }
      headsign
    }
  }
}`;

var compareRoute = (routea, routeb) => {
  var partsA = (routea.route.shortName || '').match(/^[A-Za-z]?(0*)([0-9]*)/);
  var partsB = (routeb.route.shortName || '').match(/^[A-Za-z]?(0*)([0-9]*)/);
  if (partsA[1].length !== partsB[1].length) {
    if (partsA[1].length + partsA[2].length === 0) {
      return -1; // A is the one with no numbers at all, wins leading zero
    } else if (partsB[1].length + partsB[2].length === 0) {
      return 1; // B is the one with no numbers at all, wins leading zero
    }
    return partsB[1].length - partsA[1].length; // more leading zeros wins
  }
  var numberA = parseInt(partsA[2] || '0', 10);
  var numberB = parseInt(partsB[2] || '0', 10);
  return numberA - numberB || (routea.route.shortName || '').localeCompare(routeb.route.shortName || '') || (routea.route.longName ||
    '').localeCompare(routeb.route.longName || '');
};

var viewportWidth = 2384;
var viewportHeight = 2384;
var viewportScale = viewportWidth / width;
var textScale = 1;

var bg = window.document.createElement('div');
window.document.body.appendChild(bg);
bg.style.position = 'absolute';
bg.style.left = '135px';
bg.style.top = '397px';
bg.style.height = viewportHeight + 'px';
bg.style.width = viewportWidth + 'px';

var uri = 'http://tulevatreitit.hsl.fi/otp/routers/helsinki/index/graphql';

request({
  url: uri,
  body: getQuery({
    minLon: viewport.unproject([0, 0])[0],
    minLat: viewport.unproject([0, 0])[1],
    maxLon: viewport.unproject([width, height])[0],
    maxLat: viewport.unproject([width, height])[1],
  }),
  maxAttempts: 120,
  retryDelay: 30000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/graphql'
  },
  fullResponse: false
}).then((body) => {
  JSON.parse(body).data.stopsByBbox.forEach((stop) => {
    var el = window.document.createElement('div');
    bg.appendChild(el);
    el.style.position = 'absolute';
    el.style.left = ((viewport.project([stop.lon, stop.lat])[0] * viewportScale) - 15).toFixed() + 'px';
    el.style.top = ((viewport.project([stop.lon, stop.lat])[1] * viewportScale) + 20).toFixed() + 'px';
    el.style.backgroundColor = 'rgb(255, 255, 255)';
    el.style.paddingLeft = '12px';
    el.style.paddingRight = '12px';
    el.style.paddingTop = '10px';
    el.style.paddingBottom = '8px';
    el.style.borderRadius = '5px';
    el.style.lineHeight = '0.85';
    el.style.borderColor = 'rgb(0, 0, 0)';
    el.style.borderWidth = '1px';
    el.style.backgroundClip = 'padding-box';
    el.style.borderStyle = 'solid';
    var name = window.document.createElement('span');
    el.appendChild(name);
    name.textContent = stop.name;
    name.style.color = '#333';
    name.style.fontSize = 13 / textScale + 'pt';
    name.style.fontFamily = 'GothamRounded-Medium';
    name.style.letterSpacing = '-0.025em';
    el.innerHTML += '&nbsp;';
    var code = window.document.createElement('span');
    el.appendChild(code);
    code.style.color = '#333';
    code.style.fontSize = 9 / textScale + 'pt';
    code.style.fontFamily = 'GothamRounded-Medium';
    code.style.letterSpacing = '-0.025em';
    code.textContent = stop.code;

    var patterns = uniqBy(stop.patterns, pattern => pattern.route.shortName + pattern.headsign).sort(compareRoute);
    if (patterns.length <= 5) {
      patterns.forEach((pattern, index) => {
        var container = window.document.createElement('div');
        el.appendChild(container);
        container.style.marginTop = index === 0 ? '6px' : '0';
        container.style.whiteSpace = 'nowrap';
        var routeNumber = window.document.createElement('span');
        container.appendChild(routeNumber);
        routeNumber.style.color = '#007AC9';
        routeNumber.style.fontSize = 14 / textScale + 'pt';
        routeNumber.style.fontFamily = 'GothamXNarrow-Medium';
        routeNumber.style.letterSpacing = '0em';
        routeNumber.textContent = pattern.route.shortName;
        var routeText = window.document.createElement('span');
        container.appendChild(routeText);
        routeText.style.color = '#007AC9';
        routeText.style.fontSize = 11 / textScale + 'pt';
        routeText.style.fontFamily = 'GothamRounded-Medium';
        routeText.style.letterSpacing = '-0.025em';
        routeText.textContent = ' → ' + pattern.headsign;
      });
    } else {
      var container = window.document.createElement('div');
      el.appendChild(container);
      container.style.color = '#007AC9';
      container.style.fontSize = 15 / textScale + 'pt';
      container.style.fontFamily = 'GothamXNarrow-Medium';
      container.style.letterSpacing = '0em';
      container.style.maxWidth = '220px';
      container.style.lineHeight = '1.2';
      container.style.marginTop = '6px';
      patterns.forEach(pattern => {
        var routeNumber = window.document.createElement('span');
        container.appendChild(routeNumber);
        routeNumber.textContent = pattern.route.shortName + ' ';
      });
    }
  });
  console.log(pretty(bg.outerHTML));
});
