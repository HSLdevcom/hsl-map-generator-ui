import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBuildsAction } from "../actions/publisherRequests";
import { setBuild } from "../actions/routeMapConfiguration";
import BuildSelector from "../components/BuildSelector";

function mapStateToProps(state) {
    return {
        buildId: state.routeMapConfiguration.get("buildId"),
        builds: state.publisherRequests.builds,
        loading: state.publisherRequests.buildsAreLoading,
        isInitialized: state.publisherRequests.buildIsInitialized,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getBuildsAction, setBuild }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildSelector);
