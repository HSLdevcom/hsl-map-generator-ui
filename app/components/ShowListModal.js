import React, { Component } from "react";
import styles from "./ShowListModal.css";
import ShowListModalItem from "./ShowListModalItem";

class ShowListModal extends Component {
    constructor(props) {
        super();
        props.fetchBuild(props.buildId);
        this.state = {
            openLogId: null,
        };
        this.openLog = this.openLog.bind(this);
        this.closeLog = this.closeLog.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.update, 2500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        this.props.fetchBuild(this.props.buildId, true);
    }

    openLog(id) {
        this.setState({ openLogId: id });
    }

    closeLog() {
        this.setState({ openLogId: null });
    }

    render() {
        if (!this.props.loading && this.props.build) {
            const readyPosters = this.props.build.posters.filter(poster => poster.status === "READY");
            const pendingPosters = this.props.build.posters.filter(poster => poster.status === "PENDING");
            const otherPosters = this.props.build.posters
                .filter(poster => poster.status !== "READY" && poster.status !== "PENDING");
            return (
                <div className={styles.container}>
                    <h1>{this.props.build.title}</h1>
                    <h3>Valmiina</h3>
                    <div>
                        {readyPosters.map(poster => (
                            <ShowListModalItem
                                item={poster}
                                openLog={this.openLog}
                                closeLog={this.closeLog}
                                openLogId={this.state.openLogId}
                            />
                        ))}
                        {!readyPosters.length && <span>-</span>}
                    </div>
                    <h3>Rakentamassa</h3>
                    <div>
                        {pendingPosters.map(poster => (
                            <ShowListModalItem
                                item={poster}
                                openLog={this.openLog}
                                closeLog={this.closeLog}
                                openLogId={this.state.openLogId}
                            />
                        ))}
                        {!pendingPosters.length && <span>-</span>}
                    </div>
                    <h3>Muut</h3>
                    <div>
                        {otherPosters.map(poster => (
                            <ShowListModalItem
                                item={poster}
                                openLog={this.openLog}
                                closeLog={this.closeLog}
                                openLogId={this.state.openLogId}
                            />
                        ))}
                        {!otherPosters.length && <span>-</span>}
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
