import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PixelScaleSelector from '../components/PixelScaleSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    pixelScale: state.mapSelection.get('pixelScale')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PixelScaleSelector);
