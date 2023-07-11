import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Spinner from "../components/Spinner";
import {generateImageCancelAll} from "../actions/apiRequests";

function mapStateToProps(state) {
    return {
        isLoading: state.apiRequests.isLoading,
        imagePromises: state.apiRequests.imagePromises
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({generateImageCancelAll}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
