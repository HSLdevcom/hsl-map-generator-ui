import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchConfig, setConfig } from "../actions/publisherRequests";

import PointBuildTrigger from "../components/PointBuildTrigger";

function mapStateToProps(state) {
    return {
        config: state.publisherRequests.buildData,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchConfig,
        setConfig,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PointBuildTrigger);
