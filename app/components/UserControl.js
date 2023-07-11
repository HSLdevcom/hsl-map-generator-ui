/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setUser} from "../actions/login";
import {logout} from "../utils/auth/authService";
import styles from "./UserControl.css";

class UserControl extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        logout().then((response) => {
            if (response.status === 200) {
                this.props.setUser(null);
            }
        });
    }

    render() {
        return (
            <button
                type="button"
                className={styles.container}
                onClick={this.logout}>
                <div>Kirjaudu Ulos</div>
                <div className={styles.userName}>{this.props.user}</div>
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserControl);
