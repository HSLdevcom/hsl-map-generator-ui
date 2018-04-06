import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ModeSelector from "../components/ModeSelector";
import { toggleMode } from "../actions/modeSelection";

function mapStateToProps(state) {
    return {
        currentMode: state.modeSelection.get("mode"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleMode }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModeSelector);
