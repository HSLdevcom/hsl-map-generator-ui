import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectionWindow from '../components/SelectionWindow';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    mapSelection: state.mapSelection
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionWindow);
