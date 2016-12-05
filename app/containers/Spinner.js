import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import { generateImageCancel } from "../actions/apiRequests";

function mapStateToProps(state) {
    return {
        isLoading: state.apiRequests.isLoading,
        imagePromise: state.apiRequests.imagePromise,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ generateImageCancel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
