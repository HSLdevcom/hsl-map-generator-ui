import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DpiSelector from '../components/DpiSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    dpi: state.mapSelection.get('dpi')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DpiSelector);
