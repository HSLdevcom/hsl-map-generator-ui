import React, { Component } from "react";
import { downloadPoster } from "../utils/publisher-api";
import Button from "./Button";
// import styles from "./ShowListModal.css";

export default class ShowListModal extends Component {
    constructor(props) {
        super();
        props.fetchBuild(props.buildId);
    }

    componentWillReceiveProps() {
        console.log("fetching");
        /* this.props.fetchBuild(
            this.props.buildId,
        ); */
    }

    render() {
        if (!this.props.loading && this.props.build) {
            return (
                <div>
                    <h1>{this.props.build.title}</h1>
                    <div>
                        {this.props.build.posters.filter(poster => poster.status === "READY").map(poster => (
                            <div>
                                {poster.createdAt}
                                <Button onClick={() => downloadPoster({ id: poster.id })}>
                                    Lataa
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return (
            <div>Loading</div>
        );
    }
}
