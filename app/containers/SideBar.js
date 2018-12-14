import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleMode } from "../actions/modeSelection";

import SideBar from "../components/SideBar";

function mapStateToProps(state) {
    return {
        currentMode: state.modeSelection.get("mode"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleMode }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
