import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import mapSelection from './mapSelection';
import tabName from './tabName';
import viewport from './viewport';


const rootReducer = combineReducers({
  mapSelection,
  tabName,
  viewport,
  routing
});

export default rootReducer;
