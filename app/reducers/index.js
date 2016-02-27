import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import viewport from './viewport';

const rootReducer = combineReducers({
  viewport,
  routing
});

export default rootReducer;
