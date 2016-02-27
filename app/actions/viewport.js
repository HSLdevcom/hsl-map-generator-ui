export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';

export function update(viewport) {
  return {
    type: UPDATE_VIEWPORT,
    viewport
  };
}
