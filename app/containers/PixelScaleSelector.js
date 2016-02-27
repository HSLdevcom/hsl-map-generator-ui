import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownSelector from '../components/DropdownSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    title: 'Tekstin skaalaus',
    value: state.mapSelection.get('pixelScale')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownSelector);
