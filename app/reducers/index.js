import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import layers from './layers';
import mapSelection from './mapSelection';
import tabName from './tabName';
import viewport from './viewport';

const rootReducer = combineReducers({
  layers,
  mapSelection,
  tabName,
  viewport,
  routing
});

export default rootReducer;
