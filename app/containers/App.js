import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { windowResize } from "../actions/windowEvents";

class App extends Component {
    componentDidMount() {
        window.addEventListener("resize", () => this.props.windowResize());
    }
    componentWillUnmount() {
        window.removeEventListener("resize");
    }
    render() {
        return (
            <div>
                {this.props.children}
                {
                    (() => {
                        if (process.env.NODE_ENV !== "production") {
                            const DevTools = require("./DevTools").default; // eslint-disable-line global-require
                            return <DevTools/>;
                        }
                        return null;
                    })()
                }
            </div>
        );
    }
}

export default connect(null, { windowResize })(App);

App.propTypes = {
    children: PropTypes.element.isRequired,
};
