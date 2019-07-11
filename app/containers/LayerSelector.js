import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LayerSelector from "../components/LayerSelector";

import {toggleLayer} from "../actions/layers";
import {changeDate} from "../actions/settings";

function mapStateToProps(state) {
    return {
        layers: state.layers,
        date: state.settings.date
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({toggleLayer, changeDate}, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayerSelector);
