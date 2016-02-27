export const UPDATE_CENTER = 'UPDATE_CENTER';
export const UPDATE_SIZE = 'UPDATE_SIZE';
export const UPDATE_DPI = 'UPDATE_DPI';
export const UPDATE_MAP_SCALE = 'UPDATE_MAP_SCALE';
export const UPDATE_PIXEL_SCALE = 'UPDATE_PIXEL_SCALE';

export function updateCenter(center) {
  return {
    type: UPDATE_CENTER,
    center
  };
}

export function updateSize(size) {
  return {
    type: UPDATE_SIZE,
    size
  };
}

export function updateDpi(dpi) {
  return {
    type: UPDATE_DPI,
    dpi
  };
}

export function updateMapScale(mapScale) {
  return {
    type: UPDATE_MAP_SCALE,
    mapScale
  };
}

export function updatePixelScale(pixelScale) {
  return {
    type: UPDATE_PIXEL_SCALE,
    pixelScale
  };
}
