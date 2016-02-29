import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LayerSelector from '../components/LayerSelector';
import * as LayerActions from '../actions/layers';

function mapStateToProps(state) {
  return {
    layers: state.layers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LayerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerSelector);
