import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownSelector from '../components/DropdownSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    title: 'Mittakaava',
    value: '1:' + state.mapSelection.get('mapScale')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownSelector);
