import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CenterMarker from "../components/CenterMarker";
import * as MapSelectionActions from "../actions/mapSelection";

function mapStateToProps(state) {
    return {
        center: state.mapSelection.get("center")
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterMarker);
