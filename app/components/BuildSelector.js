import React, { Component } from "react";
import styles from "./BuildSelector.css";

export default class BuildSelector extends Component {
    constructor() {
        super();
        this.setBuild = this.setBuild.bind(this);
    }

    componentWillMount() {
        if (!this.props.isInitialized) {
            this.props.getBuildsAction();
        }
    }

    setBuild(event) {
        this.props.setBuild(event.target.value);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    Valitse lista
                </div>
                <select
                    className={styles.buildSelect}
                    onChange={this.setBuild}
                >
                    <option disabled selected value="empty"> -- Valitse listan -- </option>
                    { this.props.builds.map(build => (
                        <option key={build.id} value={build.id}>{build.title}</option>
                    ))}
                </select>
                <button>Uusi lista</button>
            </div>
        );
    }
}
