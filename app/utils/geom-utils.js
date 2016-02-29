export const EARTH_CIRC_M = 40075016.686;
export const Z0_RES = EARTH_CIRC_M / 256;
export const DEG_LAT_PER_M = EARTH_CIRC_M / 360;


export const degToRad = deg => deg * Math.PI / 180;
export const radToDeg = rad => rad * 180 / Math.PI;

export const degLonPerM = degLat => DEG_LAT_PER_M * Math.abs(Math.cos(degToRad(degLat)));

export const mmToM = mm => mm / 1000;

export const mapSelectionToBbox = (mapSelection) => {
  const center = mapSelection.getIn(['center', 0, 'location']).toArray();
  const size = mapSelection.get('size').toArray().map(mmToM);
  const mapScale = mapSelection.get('mapScale');

  const sizeDeg = [size[0] * mapScale / degLonPerM(center[1]), size[1] * mapScale / DEG_LAT_PER_M];

  const bbox = [[center[0] - (sizeDeg[0] / 2), center[1] - (sizeDeg[1] / 2)],
                [center[0] + (sizeDeg[0] / 2), center[1] + (sizeDeg[1] / 2)]];
  return bbox;
};

//
// var dpm = dpi * 39.97
// var tile_scale = display_scale * dpi / 72
//
//
// var deg_lat_m = earth_circ_m / 360
// var deg_lon_m = deg_lat_m * Math.abs(Math.cos(center.y))
//
// var size_px = {
//   h: Math.round(size.h * dpm / tile_scale / display_scale),
//   w: Math.round(size.w * dpm / tile_scale / display_scale)}
//
//
//
// var zoom = Math.log2(Z0_RES / (size.h * scale * tile_scale / size_px.h) * Math.abs(Math.cos(center.y)))
