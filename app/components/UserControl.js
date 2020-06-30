import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setUser} from "../actions/login";
import {logout} from "../utils/auth/authService";
import styles from "./UserControl.css";

class UserControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {}

    logout = () => {
        logout().then((response) => {
            if (response.status === 200) {
                this.props.setUser(null);
            }
        });
    };

    render() {
        return (
            <div className={styles.container} onClick={this.logout}>
                <div>Kirjaudu Ulos</div>
                <div className={styles.userName}>{this.props.user}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setUser}, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserControl);
