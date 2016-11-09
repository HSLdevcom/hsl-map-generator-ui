import { TOGGLE_TAB } from "../actions/tabName";
import { LOAD_STATE } from "../actions/fileOperations";

export default function viewport(state = {}, action) {
  switch (action.type) {
    case TOGGLE_TAB:
      return action.tabName === state ? null : action.tabName;
    case LOAD_STATE:
      return action.state.tabName;
    default:
      return state;
  }
}
