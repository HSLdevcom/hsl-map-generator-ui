import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Map from '../components/Map';
import * as ViewportActions from '../actions/viewport';
import { fromJS } from 'immutable';

import style from 'hsl-map-style/style-generator';

const baseStyle = fromJS(style.base);

function mapStateToProps(state) {
  return {
    viewport: state.viewport,
    style: baseStyle.set('layers', fromJS(style.groups.background.layers))
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ViewportActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
