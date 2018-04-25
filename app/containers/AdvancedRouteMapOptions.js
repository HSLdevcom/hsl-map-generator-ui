import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    setShowScale,
    setScaleLength,
    setMaxAnchorLineLength,
    setClusterDifferentRoutePointsDistance,
    setClusterSameRoutePointsDistance,
    setPointMinDistanceFromTerminus,
  } from "../actions/routeMapConfiguration";
import AdvancedRouteMapOptions from "../components/AdvancedRouteMapOptions";

function mapStateToProps(state) {
    return {
        showScale: state.routeMapConfiguration.get("showScale"),
        scaleLength: state.routeMapConfiguration.get("scaleLength"),
        maxAnchorLineLength: state.routeMapConfiguration.get("maxAnchorLineLength"),
        clusterDifferentRoutePointsDistance: state.routeMapConfiguration.get("clusterDifferentRoutePointsDistance"),
        clusterSameRoutePointsDistance: state.routeMapConfiguration.get("clusterSameRoutePointsDistance"),
        pointMinDistanceFromTerminus: state.routeMapConfiguration.get("pointMinDistanceFromTerminus"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setShowScale,
        setScaleLength,
        setMaxAnchorLineLength,
        setClusterDifferentRoutePointsDistance,
        setClusterSameRoutePointsDistance,
        setPointMinDistanceFromTerminus,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedRouteMapOptions);
