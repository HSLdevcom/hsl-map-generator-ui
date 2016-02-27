export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';

export function updateViewport(viewport) {
  return {
    type: UPDATE_VIEWPORT,
    viewport
  };
}
