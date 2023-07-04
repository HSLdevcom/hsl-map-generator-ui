import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {windowResize} from "../actions/windowEvents";
import {setUser} from "../actions/login";
import {
    authorizeUsingCode,
    checkExistingSession
} from "../utils/auth/authService";
import Login from "./Login";
import {removeAuthParams} from "../utils/urlManager";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.onWindowResize);
        const code = new URL(window.location.href).searchParams.get("code");
        const isTesting = new URL(window.location.href).searchParams.get(
            "testing"
        );
        checkExistingSession().then((json) => {
            if (json && json.isOk && json.email) {
                this.props.setUser(json.email);
                this.setState({loading: false});
            } else {
                this.props.setUser(null);
                if (code) {
                    removeAuthParams();
                    authorizeUsingCode(code, isTesting).then((res) => {
                        if (res && res.isOk && res.email)
                            this.props.setUser(res.email);
                        this.setState({loading: false});
                    });
                } else {
                    this.setState({loading: false});
                }
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    onWindowResize() {
        this.props.windowResize();
    }

    render() {
        const {user} = this.props;

        return (
            <div>
                {!user && !this.state.loading && <Login />}
                {user && !this.state.loading && this.props.children}
                {(() => {
                    if (process.env.NODE_ENV !== "production") {
                        const DevTools = require("./DevTools").default; // eslint-disable-line global-require
                        return <DevTools />;
                    }
                    return null;
                })()}
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
    return bindActionCreators({windowResize, setUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
    children: PropTypes.element.isRequired
};
