import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import viewport from './viewport';
import mapSelection from './mapSelection';

const rootReducer = combineReducers({
  viewport,
  mapSelection,
  routing
});

export default rootReducer;
