import { TOGGLE_TAB } from '../actions/tabName';

export default function viewport(state = {}, action) {
  switch (action.type) {
  case TOGGLE_TAB:
    return action.tabName === state ? null : action.tabName;
  default:
    return state;
  }
}
