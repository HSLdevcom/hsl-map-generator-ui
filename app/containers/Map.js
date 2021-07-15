import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import moment from "moment";
import {styleFromLayers} from "../utils/map-utils";
import Map from "../components/Map";
import * as ViewportActions from "../actions/viewport";
import Modes from "../enums/Modes";

function mapStateToProps(state) {
    // Visualized date is either the one in user input, or, in RouteMap mode, the generated one if it exists.
    const date =
        state.modeSelection.get("mode") === Modes.ROUTEMAP &&
        state.publisherRequests.pointConfig
            ? moment(state.publisherRequests.pointConfig.target_date).format(
                  "YYYY-MM-DD"
              )
            : state.settings.date;
    return {
        viewport: state.viewport,
        style: styleFromLayers(
            state.layers,
            date,
            state.routeMapConfiguration.get("routeFilter")
        ),
        mapWidth: state.layout.mapWidth,
        mapHeight: state.layout.mapHeight,
        zoneSymbols: state.mapSelection.get("zoneSymbols"),
        showZoneSymbols: state.routeMapConfiguration.get("zoneSymbols"),
        mapSelection: state.mapSelection,
        symbolSize: state.routeMapConfiguration.get("symbolSize"),
        mapSelectionSize: state.mapSelection.get("selectionSize")
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ViewportActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
