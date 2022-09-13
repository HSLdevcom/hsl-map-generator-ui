import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {generateRouteMapAction} from "../actions/publisherRequests";
import {
    setDate,
    setPosterName,
    setRouteFilter,
    toggleOnlyNearBuses,
    toggleZoneSymbols,
    setSymbolSize,
    toggleJoreIdFiltering
} from "../actions/routeMapConfiguration";
import {addSymbol} from "../actions/viewport";
import RouteMapConfigurator from "../components/RouteMapConfigurator";
import {toggleLayer, setLayer} from "../actions/layers";

function mapStateToProps(state) {
    return {
        documents: state.routeMapConfiguration.get("documents"),
        build: state.routeMapConfiguration.get("build"),
        date: state.routeMapConfiguration.get("date"),
        layers: state.layers,
        posterName: state.routeMapConfiguration.get("posterName"),
        routeFilter: state.routeMapConfiguration.get("routeFilter"),
        showOnlyNearBuses: state.routeMapConfiguration.get("onlyNearBuses"),
        showZoneSymbols: state.routeMapConfiguration.get("zoneSymbols"),
        pointConfig: state.publisherRequests.pointConfig,
        symbolSize: state.routeMapConfiguration.get("symbolSize"),
        useJoreId: state.routeMapConfiguration.get("useJoreId")
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            generateRouteMap: generateRouteMapAction,
            setDate,
            setPosterName,
            setRouteFilter,
            toggleLayer,
            toggleOnlyNearBuses,
            toggleZoneSymbols,
            setSymbolSize,
            setLayer,
            addSymbol,
            toggleJoreIdFiltering
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteMapConfigurator);
