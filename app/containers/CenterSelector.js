import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CenterSelector from '../components/CenterSelector';
import * as MapSelectionActions from '../actions/mapSelection';

function mapStateToProps(state) {
  return {
    center: state.mapSelection.getIn(['center', 0, 'location'])
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterSelector);
