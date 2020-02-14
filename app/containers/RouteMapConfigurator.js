import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {generateRouteMapAction} from "../actions/publisherRequests";
import {
    setDate,
    setPosterName,
    toggleOnlyNearBuses,
    toggleZoneLabels
} from "../actions/routeMapConfiguration";
import RouteMapConfigurator from "../components/RouteMapConfigurator";
import {toggleLayer} from "../actions/layers";

function mapStateToProps(state) {
    return {
        documents: state.routeMapConfiguration.get("documents"),
        build: state.routeMapConfiguration.get("build"),
        date: state.routeMapConfiguration.get("date"),
        layers: state.layers,
        posterName: state.routeMapConfiguration.get("posterName"),
        showOnlyNearBuses: state.routeMapConfiguration.get("onlyNearBuses"),
        showZoneLabels: state.routeMapConfiguration.get("zoneLabels"),
        pointConfig: state.publisherRequests.pointConfig
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            generateRouteMap: generateRouteMapAction,
            setDate,
            setPosterName,
            toggleLayer,
            toggleOnlyNearBuses,
            toggleZoneLabels
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteMapConfigurator);
