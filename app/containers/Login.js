import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Login from "../components/Login";
import * as LoginActions from "../actions/login";

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(LoginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
