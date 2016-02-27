import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Map from '../components/Map';
import * as ViewportActions from '../actions/viewport';

function mapStateToProps(state) {
  return {
    viewport: state.viewport
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ViewportActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
