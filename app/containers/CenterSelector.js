import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CenterSelector from "../components/CenterSelector";
import {updateCenter} from "../actions/mapSelection";
import {toggleTab} from "../actions/tabName";

function mapStateToProps(state) {
    return {
        center: state.mapSelection.getIn(["center", 0, "location"]),
        selected: state.tabName === "center"
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {updateCenter, toggleTab: toggleTab("center")},
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CenterSelector);
