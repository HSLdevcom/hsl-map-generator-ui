import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchConfig, setConfig} from "../actions/publisherRequests";
import {changeDate} from "../actions/settings";

import PointBuildTrigger from "../components/PointBuildTrigger";

function mapStateToProps(state) {
    return {
        config: state.publisherRequests.pointConfig,
        date: state.settings.date
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchConfig,
            setConfig,
            changeDate
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PointBuildTrigger);
