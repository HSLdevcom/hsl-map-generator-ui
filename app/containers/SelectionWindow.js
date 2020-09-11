import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import SelectionWindow from "../components/SelectionWindow";
import {updateSelectionSize} from "../actions/mapSelection";

function mapStateToProps(state) {
    return {
        mapSelection: state.mapSelection
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateSelectionSize}, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectionWindow);
