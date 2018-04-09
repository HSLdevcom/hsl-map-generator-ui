import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { generateRouteMapAction } from "../actions/publisherRequests";
import RouteMapConfigurator from "../components/RouteMapConfigurator";

function mapStateToProps() {
    return {
        // buildId: state.routeMapConfiguration.get("buildId"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        generateRouteMap: generateRouteMapAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMapConfigurator);
