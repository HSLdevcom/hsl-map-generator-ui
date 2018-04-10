import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchBuild } from "../actions/publisherRequests";
import ShowListModal from "../components/ShowListModal";

function mapStateToProps(state) {
    return {
        build: state.publisherRequests.buildData,
        loading: state.publisherRequests.buildDataIsLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBuild }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowListModal);
