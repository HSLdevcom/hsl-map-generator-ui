const viewportMercator = require("viewport-mercator-project");
const jsdom = require("jsdom").jsdom;
const uniqBy = require("lodash/uniqBy");
const window = jsdom().defaultView;
const pretty = require("html").prettyPrint;
const request = require("requestretry");
const geomUtils = require("../app/utils/geom-utils");
const transit = require("transit-immutable-js");
const { readFileSync } = require("fs");
const { within } = require("turf");


module.exports = (callback, opts) => {
  const mapSelection = transit.fromJSON(opts.mapSelection);
  const scale = geomUtils.mapSelectionToTileScale(mapSelection);
  const width = Math.round(geomUtils.mapSelectionToPixelSize(mapSelection)[0] / scale);
  const height = Math.round(geomUtils.mapSelectionToPixelSize(mapSelection)[1] / scale);

  const center = mapSelection.getIn(["center", 0, "location"]).toArray();

  const viewport = viewportMercator({
    longitude: center[0],
    latitude: center[1],
    zoom: geomUtils.mapSelectionToZoom(mapSelection) - 1,
    width: width,
    height: height,
    tileSize: 512
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

  const compareRoute = (routea, routeb) => {
    const partsA = (routea.shortName || "").match(/^[A-Za-z]?(0*)([0-9]*)/);
    const partsB = (routeb.shortName || "").match(/^[A-Za-z]?(0*)([0-9]*)/);
    if (partsA[1].length !== partsB[1].length) {
      if (partsA[1].length + partsA[2].length === 0) {
        return -1; // A is the one with no numbers at all, wins leading zero
      } else if (partsB[1].length + partsB[2].length === 0) {
        return 1; // B is the one with no numbers at all, wins leading zero
      }
      return partsB[1].length - partsA[1].length; // more leading zeros wins
    }
    const numberA = parseInt(partsA[2] || "0", 10);
    const numberB = parseInt(partsB[2] || "0", 10);
    return numberA - numberB || (routea.shortName || "").localeCompare(routeb.shortName || "") || (routea.headsign ||
      "").localeCompare(routeb.headsign || "");
  };

  const stops = JSON.parse(readFileSync("/Users/hannes/Downloads/out.json"));

  const searchWithin = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[
            viewport.unproject([0, 0]),
            viewport.unproject([0, height]),
            viewport.unproject([width, height]),
            viewport.unproject([width, 0])
          ]]
        }
      }
    ]
  };

  const viewportWidth = 2384;
  const viewportHeight = 2384;
  const viewportScale = viewportWidth / width;
  const textScale = 1;

  const bg = window.document.createElement("div");
  window.document.body.appendChild(bg);
  bg.style.position = "absolute";
  bg.style.left = "135px";
  bg.style.top = "397px";
  bg.style.height = viewportHeight + "px";
  bg.style.width = viewportWidth + "px";

  const uri = "http://tulevatreitit.hsl.fi/otp/routers/helsinki/index/graphql";

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
    method: "POST",
    headers: {
      "Content-Type": "application/graphql"
    },
    fullResponse: false
  }).then((body) => {
    within(stops, searchWithin).features.forEach((point) => {
      const stop = point.properties;
      stop.patterns.forEach(pattern => pattern.route = {shortName: pattern.name});
      stop.lon = point.geometry.coordinates[0];
      stop.lat = point.geometry.coordinates[1];
      if (stop.patterns.length === 0 || stop.type === "SUBWAY") {
        return;
      }
      const el = window.document.createElement("div");
      bg.appendChild(el);
      el.style.position = "absolute";
      el.style.left = ((viewport.project([stop.lon, stop.lat])[0] * viewportScale) - 15).toFixed() + "px";
      el.style.top = ((viewport.project([stop.lon, stop.lat])[1] * viewportScale) + 20).toFixed() + "px";
      el.style.backgroundColor = "rgb(255, 255, 255)";
      el.style.paddingLeft = "12px";
      el.style.paddingRight = "12px";
      el.style.paddingTop = "10px";
      el.style.paddingBottom = "8px";
      el.style.borderRadius = "5px";
      el.style.lineHeight = "0.85";
      el.style.borderColor = "rgba(0, 0, 0, 0.3)";
      el.style.borderWidth = "1px";
      el.style.backgroundClip = "padding-box";
      el.style.borderStyle = "solid";
      const header = window.document.createElement("div");
      el.appendChild(header);
      header.style.display = "flex";
      header.style.webkitFlexDirection = "row";
      if (stop.platform) {
        const platformNumber = window.document.createElement("div");
        header.appendChild(platformNumber);
        platformNumber.style.color = "#333";
        platformNumber.style.fontSize = 29 / textScale + "pt";
        platformNumber.style.fontFamily = "GothamXNarrow-Medium";
        platformNumber.style.letterSpacing = "0em";
        platformNumber.textContent = stop.platform;
        const platform = window.document.createElement("div");
        header.appendChild(platform);
        platform.style.webkitBoxFlex = "0";
        platform.style.borderRight = "solid 1px #333";
        platform.style.marginRight = "0.5em";
        platform.style.padding = "0 0.5em";
        const platformFi = window.document.createElement("div");
        platform.appendChild(platformFi);
        platformFi.textContent = "Lait.";
        platformFi.style.color = "#333";
        platformFi.style.fontSize = 13 / textScale + "pt";
        platformFi.style.fontFamily = "GothamRounded-Medium";
        platformFi.style.letterSpacing = "-0.025em";
        platformFi.style.marginBottom = "0.2em";
        const platformSv = window.document.createElement("div");
        platform.appendChild(platformSv);
        platformSv.textContent = "Platt.";
        platformSv.style.color = "#333";
        platformSv.style.fontSize = 12 / textScale + "pt";
        platformSv.style.fontFamily = "GothamRounded-Book";
        platformSv.style.letterSpacing = "-0.025em";
      }
      const names = window.document.createElement("div");
      header.appendChild(names);
      names.style.webkitBoxFlex = "1";
      const name = window.document.createElement("div");
      names.appendChild(name);
      name.textContent = stop.name;
      name.style.color = "#333";
      name.style.fontSize = 13 / textScale + "pt";
      name.style.fontFamily = "GothamRounded-Medium";
      name.style.letterSpacing = "-0.025em";
      name.style.marginBottom = "0.2em";
      name.style.whiteSpace = "nowrap";
      const nameSv = window.document.createElement("div");
      names.appendChild(nameSv);
      nameSv.textContent = stop.name_sv;
      nameSv.style.color = "#333";
      nameSv.style.fontSize = 12 / textScale + "pt";
      nameSv.style.fontFamily = "GothamRounded-Book";
      nameSv.style.letterSpacing = "-0.025em";
      nameSv.style.whiteSpace = "nowrap";
      const code = window.document.createElement("div");
      header.appendChild(code);
      code.style.color = "#333";
      code.style.fontSize = 9 / textScale + "pt";
      code.style.fontFamily = "GothamRounded-Medium";
      code.style.letterSpacing = "-0.025em";
      code.style.borderColor = "#333";
      code.style.borderWidth = "1px";
      code.style.borderRadius = "3px";
      code.style.borderStyle = "solid";
      code.style.padding = "2px 3px";
      code.style.marginTop = "-2px";
      code.style.webkitBoxFlex = "0";
      code.style.webkitAlignSelf = "flex-end";
      code.style.height = "0.8em";
      code.style.marginLeft = "0.5em";
      code.textContent = stop.code;

      const patterns = uniqBy(stop.patterns, pattern => pattern.route.shortName + pattern.headsign).sort(compareRoute);
      if (patterns.length <= 999) {
        patterns.forEach((pattern, index) => {
          const container = window.document.createElement("div");
          el.appendChild(container);
          container.style.marginTop = index === 0 ? "6px" : "0";
          container.style.whiteSpace = "nowrap";
          const routeNumber = window.document.createElement("span");
          container.appendChild(routeNumber);
          routeNumber.style.color = "#007AC9";
          routeNumber.style.fontSize = 15 / textScale + "pt";
          routeNumber.style.fontFamily = "GothamXNarrow-Medium";
          routeNumber.style.letterSpacing = "0em";
          routeNumber.textContent = pattern.shortName;
          const routeText = window.document.createElement("span");
          container.appendChild(routeText);
          routeText.style.color = "#007AC9";
          routeText.style.fontSize = 11 / textScale + "pt";
          routeText.style.fontFamily = "GothamRounded-Medium";
          routeText.style.letterSpacing = "-0.025em";
          routeText.textContent = pattern.headsign + "\u00A0";
          const routeTextSv = window.document.createElement("span");
          container.appendChild(routeTextSv);
          routeTextSv.style.color = "#007AC9";
          routeTextSv.style.fontSize = 11 / textScale + "pt";
          routeTextSv.style.fontFamily = "GothamRounded-Book";
          routeTextSv.style.letterSpacing = "-0.025em";
          routeTextSv.textContent = pattern.headsign_sv;
        });
      } else {
        const container = window.document.createElement("div");
        el.appendChild(container);
        container.style.color = "#007AC9";
        container.style.fontSize = 15 / textScale + "pt";
        container.style.fontFamily = "GothamXNarrow-Medium";
        container.style.letterSpacing = "0em";
        container.style.maxWidth = "220px";
        container.style.lineHeight = "1.2";
        container.style.marginTop = "6px";
        patterns.forEach(pattern => {
          const routeNumber = window.document.createElement("span");
          container.appendChild(routeNumber);
          routeNumber.textContent = pattern.shortName + " ";
        });
      }
    });

    callback({data: pretty(bg.outerHTML.replace(/-webkit-box-/g, "").replace(/-webkit-/g, ""))});
  });
};
