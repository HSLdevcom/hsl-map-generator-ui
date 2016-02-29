import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapScaleSelector from '../components/MapScaleSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    mapScale: state.mapSelection.get('mapScale')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScaleSelector);
