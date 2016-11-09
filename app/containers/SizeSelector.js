import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SizeSelector from "../components/SizeSelector";
import { updateSize } from "../actions/mapSelection";
import { toggleTab } from "../actions/tabName";

function mapStateToProps(state) {
  return {
    size: state.mapSelection.get("size"),
    selected: state.tabName === "size"
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateSize, toggleTab: toggleTab("size")}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector);
