export const EARTH_CIRC_M = 40075016.686;
export const Z0_RES = EARTH_CIRC_M / 256;
export const DEG_LAT_PER_M = EARTH_CIRC_M / 360;


export const degToRad = deg => deg * Math.PI / 180;
export const radToDeg = rad => rad * 180 / Math.PI;

export const degLonPerM = degLat => DEG_LAT_PER_M * Math.abs(Math.cos(degToRad(degLat)));

export const mmToM = mm => mm / 1000;

export const dpiToDpm = dpi => dpi * 39.97;

export const pixelScaleToTileScale = (pixelScale, dpi) => pixelScale * dpi / 72;

export const calculateZoom = (center, size, mapScale, tileScale, sizePx) => Math.log2(Z0_RES / (size[1] * mapScale * tileScale / sizePx[1]) * Math.abs(Math.cos(degToRad(center[1]))));

export const calculateSizePx = (size, dpm, tileScale, pixelScale) =>
 [Math.round(size[0] * dpm / tileScale / pixelScale), Math.round(size[1] * dpm / tileScale / pixelScale)];


export const mapSelectionToTileScale = (mapSelection) => pixelScaleToTileScale(
  mapSelection.get('pixelScale'),
  mapSelection.get('dpi')
);

export const mapSelectionToPixelSize = (mapSelection) => calculateSizePx(
  mapSelection.get('size').toArray().map(mmToM),
  dpiToDpm(mapSelection.get('dpi')),
  mapSelectionToTileScale(mapSelection),
  mapSelection.get('pixelScale')
);

export const mapSelectionToZoom = (mapSelection) => calculateZoom(
  mapSelection.getIn(['center', 0, 'location']).toArray(),
  mapSelection.get('size').toArray().map(mmToM),
  mapSelection.get('mapScale'),
  mapSelectionToTileScale(mapSelection),
  mapSelectionToPixelSize(mapSelection)
);

export const mapSelectionToBbox = (mapSelection) => {
  const center = mapSelection.getIn(['center', 0, 'location']).toArray();
  const size = mapSelection.get('size').toArray().map(mmToM);
  const mapScale = mapSelection.get('mapScale');

  const sizeDeg = [size[0] * mapScale / degLonPerM(center[1]), size[1] * mapScale / DEG_LAT_PER_M];

  const bbox = [[center[0] - (sizeDeg[0] / 2), center[1] - (sizeDeg[1] / 2)],
                [center[0] + (sizeDeg[0] / 2), center[1] + (sizeDeg[1] / 2)]];
  return bbox;
};
