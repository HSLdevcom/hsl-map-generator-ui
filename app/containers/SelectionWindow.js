import { connect } from "react-redux";
import SelectionWindow from "../components/SelectionWindow";

function mapStateToProps(state) {
  return {
    mapSelection: state.mapSelection
  };
}

export default connect(mapStateToProps)(SelectionWindow);
