import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    setScaleFontSize,
    setScaleLength,
    setMaxAnchorLineLength,
    setClusterDifferentRoutePointsDistance,
    setClusterSameRoutePointsDistance,
    setPointMinDistanceFromTerminus,
    setIntermediatePointFontSize,
    setIntermediatePointMaxWidth,
    setTerminusFontSize,
    setTerminusMaxWidth,
    setStationNameFontSize
} from "../actions/routeMapConfiguration";
import AdvancedRouteMapOptions from "../components/AdvancedRouteMapOptions";

function mapStateToProps(state) {
    return {
        scaleFontSize: state.routeMapConfiguration.get("scaleFontSize"),
        scaleLength: state.routeMapConfiguration.get("scaleLength"),
        maxAnchorLineLength: state.routeMapConfiguration.get(
            "maxAnchorLineLength"
        ),
        clusterDifferentRoutePointsDistance: state.routeMapConfiguration.get(
            "clusterDifferentRoutePointsDistance"
        ),
        clusterSameRoutePointsDistance: state.routeMapConfiguration.get(
            "clusterSameRoutePointsDistance"
        ),
        pointMinDistanceFromTerminus: state.routeMapConfiguration.get(
            "pointMinDistanceFromTerminus"
        ),
        intermediatePointFontSize: state.routeMapConfiguration.get(
            "intermediatePointFontSize"
        ),
        intermediatePointWidth: state.routeMapConfiguration.get(
            "intermediatePointWidth"
        ),
        terminusFontSize: state.routeMapConfiguration.get("terminusFontSize"),
        terminusWidth: state.routeMapConfiguration.get("terminusWidth"),
        stationFontSize: state.routeMapConfiguration.get("stationFontSize")
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setScaleFontSize,
            setScaleLength,
            setMaxAnchorLineLength,
            setClusterDifferentRoutePointsDistance,
            setClusterSameRoutePointsDistance,
            setPointMinDistanceFromTerminus,
            setIntermediatePointFontSize,
            setIntermediatePointMaxWidth,
            setTerminusFontSize,
            setTerminusMaxWidth,
            setStationNameFontSize
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdvancedRouteMapOptions);
