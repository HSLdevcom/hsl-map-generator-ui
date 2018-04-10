import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { generateRouteMapAction } from "../actions/publisherRequests";
import RouteMapConfigurator from "../components/RouteMapConfigurator";

function mapStateToProps(state) {
    return {
        documents: state.routeMapConfiguration.get("documents"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        generateRouteMap: generateRouteMapAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMapConfigurator);
