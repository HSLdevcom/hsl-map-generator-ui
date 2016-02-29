import { connect } from 'react-redux';
import DebugOverlay from '../components/DebugOverlay';

function mapStateToProps(state) {
  return {
    mapSelection: state.mapSelection
  };
}

export default connect(mapStateToProps)(DebugOverlay);
