import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import SelectionMarker from "../components/SelectionMarker";
import * as MapSelectionActions from "../actions/mapSelection";

function mapStateToProps(state) {
    return {
        mapSelection: state.mapSelection,
        center: state.mapSelection.get("center")
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(MapSelectionActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionMarker);
