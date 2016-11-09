import React, { Component, PropTypes } from "react";

export default class App extends Component {
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

App.propTypes = {
    children: PropTypes.element.isRequired,
};
