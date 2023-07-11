import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PixelScaleSelector from "../components/PixelScaleSelector";
import {updatePixelScale} from "../actions/mapSelection";
import {toggleTab} from "../actions/tabName";

function mapStateToProps(state) {
    return {
        pixelScale: state.mapSelection.get("pixelScale"),
        selected: state.tabName === "pixelScale"
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {updatePixelScale, toggleTab: toggleTab("pixelScale")},
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PixelScaleSelector);
