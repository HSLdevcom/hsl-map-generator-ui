import React, { Component } from "react";
import Button from "./Button";
import styles from "./ShowListModal.css";
import ShowListModalItem from "./ShowListModalItem";

class ShowListModal extends Component {
    constructor(props) {
        super();
        props.fetchBuild(props.buildId);
    }

    render() {
        if (!this.props.loading && this.props.build) {
            return (
                <div className={styles.container}>
                    <h1>{this.props.build.title}</h1>
                    <h3>Valmiina</h3>
                    <div>
                        {this.props.build.posters.filter(poster => poster.status === "READY").map(poster => (
                            <ShowListModalItem item={poster}/>
                        ))}
                    </div>
                    <h3>Rakentamassa</h3>
                    <div>
                        {this.props.build.posters.filter(poster => poster.status === "PENDING").map(poster => (
                            <ShowListModalItem item={poster}/>
                        ))}
                    </div>
                    <h3>Muut</h3>
                    <div>
                        {this.props.build.posters
                            .filter(poster => poster.status !== "READY" && poster.status !== "PENDING").map(poster => (
                                <ShowListModalItem item={poster}/>
                        ))}
                    </div>
                </div>
            );
        }
        return (
            <div className={styles.container}>
                Loading..
            </div>
        );
    }
}

export default ShowListModal;
