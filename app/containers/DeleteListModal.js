import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {deleteList} from "../actions/publisherRequests";
import DeleteListModal from "../components/DeleteListModal";

function mapStateToProps(state) {
    return {
        error: state.routeMapConfiguration.deleteBuildErrorMessage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteList}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteListModal);
