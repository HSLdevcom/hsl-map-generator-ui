import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DpiSelector from "../components/DpiSelector";
import { updateDpi } from "../actions/mapSelection";
import { toggleTab } from "../actions/tabName";

function mapStateToProps(state) {
  return {
    dpi: state.mapSelection.get("dpi"),
    selected: state.tabName === "dpi"
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateDpi, toggleTab: toggleTab("dpi")}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DpiSelector);
