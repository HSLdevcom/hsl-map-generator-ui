import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapScaleSelector from '../components/MapScaleSelector';
import { updateMapScale } from '../actions/mapSelection';
import { toggleTab } from '../actions/tabName';

function mapStateToProps(state) {
  return {
    mapScale: state.mapSelection.get('mapScale'),
    selected: state.tabName === 'mapScale'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateMapScale, toggleTab: toggleTab('mapScale')}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScaleSelector);
