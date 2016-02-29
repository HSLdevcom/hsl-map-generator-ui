import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SizeSelector from '../components/SizeSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    size: state.mapSelection.get('size')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector);
