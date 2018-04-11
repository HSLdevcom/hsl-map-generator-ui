import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { generateRouteMapAction } from "../actions/publisherRequests";
import { setDate } from "../actions/routeMapConfiguration";
import RouteMapConfigurator from "../components/RouteMapConfigurator";

function mapStateToProps(state) {
    return {
        documents: state.routeMapConfiguration.get("documents"),
        build: state.routeMapConfiguration.get("build"),
        date: state.routeMapConfiguration.get("date"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        generateRouteMap: generateRouteMapAction,
        setDate,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMapConfigurator);
