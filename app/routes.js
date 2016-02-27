import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import MapPage from './containers/MapPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={MapPage} />
  </Route>
);
