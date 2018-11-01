import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PointBuildTrigger from "../components/PointBuildTrigger";

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PointBuildTrigger);
