import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {styleFromLayers} from "../utils/map-utils";
import Map from "../components/Map";
import * as ViewportActions from "../actions/viewport";

function mapStateToProps(state) {
    return {
        viewport: state.viewport,
        style: styleFromLayers(state.layers, state.settings.date),
        mapWidth: state.layout.mapWidth,
        mapHeight: state.layout.mapHeight
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ViewportActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);
