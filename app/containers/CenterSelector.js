import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownSelector from '../components/DropdownSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    title: 'Sijainti',
    value: state.mapSelection.getIn(['center', 0, 'location']).toArray().map(integer => integer.toFixed(5)).reverse().join(', ')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownSelector);
