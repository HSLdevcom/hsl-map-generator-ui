import { connect } from "react-redux";
import SideBar from "../components/SideBar";

function mapStateToProps(state) {
    return {
        currentMode: state.modeSelection.get("mode"),
    };
}

export default connect(mapStateToProps)(SideBar);
