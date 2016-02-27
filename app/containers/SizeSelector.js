import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownSelector from '../components/DropdownSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    title: 'Koko',
    value: state.mapSelection.get('size').toArray().join(' x ') + ' mm'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownSelector);
