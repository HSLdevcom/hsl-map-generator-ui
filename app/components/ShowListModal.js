import React, {Component} from "react";
import sortByDate from "../utils/common-utils";
import styles from "./ShowListModal.css";
import ShowListModalItem from "./ShowListModalItem";
import Button from "./Button";

class ShowListModal extends Component {
    constructor(props) {
        super();
        props.fetchBuild(props.buildId);
        this.state = {
            openLogId: null
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
        this.setState({openLogId: id});
    }

    closeLog() {
        this.setState({openLogId: null});
    }

    render() {
        if (
            !this.props.loading &&
            this.props.build &&
            this.props.build.posters
        ) {
            const readyPosters = sortByDate(
                this.props.build.posters.filter(
                    (poster) => poster.status === "READY"
                )
            );
            const pendingPosters = sortByDate(
                this.props.build.posters.filter(
                    (poster) => poster.status === "PENDING"
                )
            );
            const otherPosters = sortByDate(
                this.props.build.posters.filter(
                    (poster) =>
                        poster.status !== "READY" && poster.status !== "PENDING"
                )
            );
            return (
                <div className={styles.container} data-cy="show-list-container">
                    <h1>{this.props.build.title}</h1>
                    <h3>Valmiina</h3>
                    <div>
                        {readyPosters.map((poster) => (
                            <ShowListModalItem
                                item={poster}
                                openLog={this.openLog}
                                closeLog={this.closeLog}
                                openLogId={this.state.openLogId}
                                key={poster.id}
                            />
                        ))}
                        {!readyPosters.length && <span>-</span>}
                    </div>
                    <h3>Rakentumassa</h3>
                    <div>
                        {pendingPosters.map((poster) => (
                            <ShowListModalItem
                                item={poster}
                                openLog={this.openLog}
                                closeLog={this.closeLog}
                                openLogId={this.state.openLogId}
                                key={poster.id}
                            />
                        ))}
                        {!pendingPosters.length && <span>-</span>}
                    </div>
                    <h3>Muut</h3>
                    <div>
                        {otherPosters.map((poster) => (
                            <ShowListModalItem
                                item={poster}
                                openLog={this.openLog}
                                closeLog={this.closeLog}
                                openLogId={this.state.openLogId}
                                key={poster.id}
                            />
                        ))}
                        {!otherPosters.length && <span>-</span>}
                    </div>
                    <Button
                        type="close-list-modal"
                        onClick={this.props.onClose}>
                        Sulje
                    </Button>
                </div>
            );
        }
        return <div className={styles.container}>Loading..</div>;
    }
}

export default ShowListModal;
