import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { styleFromLayers } from "hsl-map-generator-utils";
import Map from "../components/Map";
import * as ViewportActions from "../actions/viewport";

function mapStateToProps(state) {
    return {
        viewport: state.viewport,
        style: styleFromLayers(state.layers),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ViewportActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
