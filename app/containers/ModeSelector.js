import {connect} from "react-redux";
import ModeSelector from "../components/ModeSelector";

function mapStateToProps(state) {
    return {
        currentMode: state.modeSelection.get("mode")
    };
}

export default connect(mapStateToProps)(ModeSelector);
