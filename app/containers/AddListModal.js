import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {addList} from "../actions/publisherRequests";
import AddListModal from "../components/AddListModal";

function mapStateToProps(state) {
    return {
        isLoading: state.routeMapConfiguration.addBuildIsLoading,
        error: state.routeMapConfiguration.addBuildErrorMessage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addList}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddListModal);
