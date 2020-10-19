import React, {Component} from "react";
import Modal from "react-modal";
import Button from "./Button";
import styles from "./BuildSelector.css";
import ShowListModal from "../containers/ShowListModal";
import AddListModal from "../containers/AddListModal";
import {modalStyles} from "../utils/ui-utils";

export default class BuildSelector extends Component {
    constructor() {
        super();

        this.setBuild = this.setBuild.bind(this);
        this.state = {
            showingNewList: false,
            showingShowList: false,
            buildId: null
        };
        this.showNewListModal = this.showNewListModal.bind(this);
        this.hideNewListModal = this.hideNewListModal.bind(this);
        this.showShowListModal = this.showShowListModal.bind(this);
        this.hideShowListModal = this.hideShowListModal.bind(this);
        this.useBuildId = this.useBuildId.bind(this);
    }

    componentWillMount() {
        if (!this.props.isInitialized) {
            this.props.getBuildsAction();
        }
    }

    setBuild(event) {
        this.setState({
            buildId: event.target.value
        });
    }

    useBuildId() {
        if (this.state.buildId) {
            this.props.setBuild(
                this.props.builds.find(
                    (build) => build.id === this.state.buildId
                )
            );
        }
    }

    showNewListModal() {
        this.setState({showingNewList: true});
    }

    hideNewListModal() {
        this.setState({showingNewList: false});
    }

    showShowListModal() {
        this.setState({showingShowList: true});
    }

    hideShowListModal() {
        this.setState({showingShowList: false});
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>Valitse lista</div>
                <select
                    data-cy="build-selector"
                    className={styles.buildSelect}
                    onChange={this.setBuild}
                    value={this.state.buildId || ""}>
                    <option disabled value="">
                        {" "}
                        -- Valitse lista --{" "}
                    </option>
                    {this.props.builds.map((build) => (
                        <option key={build.id} value={build.id}>
                            {build.title}
                        </option>
                    ))}
                </select>
                <div className={styles.buttonContainer}>
                    <Button
                        type="select-list"
                        styleClass="lightWithBorder"
                        disabled={!this.state.buildId}
                        onClick={this.useBuildId}>
                        Käytä tätä listaa
                    </Button>
                    <Button
                        type="new-list"
                        styleClass="lightWithBorder"
                        onClick={this.showNewListModal}>
                        Uusi lista
                    </Button>
                    <Modal
                        isOpen={this.state.showingNewList}
                        onRequestClose={this.hideNewListModal}
                        style={modalStyles}>
                        <AddListModal hide={this.hideNewListModal} />
                    </Modal>
                    <Button
                        type="show-list"
                        styleClass="lightWithBorder"
                        disabled={!this.state.buildId}
                        onClick={this.showShowListModal}>
                        Näytä lista
                    </Button>
                    <Modal
                        isOpen={this.state.showingShowList}
                        onRequestClose={this.hideShowListModal}
                        style={modalStyles}>
                        <ShowListModal
                            onClose={this.hideShowListModal}
                            buildId={this.state.buildId}
                        />
                    </Modal>
                </div>
            </div>
        );
    }
}
