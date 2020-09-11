import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {generateRouteMapAction} from "../actions/publisherRequests";
import {
    setDate,
    setPosterName,
    toggleOnlyNearBuses,
    toggleZoneSymbols,
    setSymbolSize
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
        showOnlyNearBuses: state.routeMapConfiguration.get("onlyNearBuses"),
        showZoneSymbols: state.routeMapConfiguration.get("zoneSymbols"),
        pointConfig: state.publisherRequests.pointConfig,
        symbolSize: state.routeMapConfiguration.get("symbolSize")
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
            toggleZoneSymbols,
            setSymbolSize,
            setLayer,
            addSymbol
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteMapConfigurator);
