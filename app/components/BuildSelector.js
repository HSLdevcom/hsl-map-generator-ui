import React, {Component} from "react";
import Modal from "react-modal";
import Button from "./Button";
import styles from "./BuildSelector.css";
import ShowListModal from "../containers/ShowListModal";
import AddListModal from "../containers/AddListModal";
import DeleteListModal from "../containers/DeleteListModal";
import {listModalStyles, deleteModalStyles} from "../utils/ui-utils";

export default class BuildSelector extends Component {
    constructor() {
        super();

        this.setBuild = this.setBuild.bind(this);
        this.state = {
            showingNewList: false,
            showingShowList: false,
            showingDeleteList: false,
            buildId: null
        };
        this.showNewListModal = this.showNewListModal.bind(this);
        this.hideNewListModal = this.hideNewListModal.bind(this);
        this.showShowListModal = this.showShowListModal.bind(this);
        this.hideShowListModal = this.hideShowListModal.bind(this);
        this.showDeleteListModal = this.showDeleteListModal.bind(this);
        this.hideDeleteListModal = this.hideDeleteListModal.bind(this);
        this.useBuildId = this.useBuildId.bind(this);
        this.getBuild = this.getBuild.bind(this);
        this.resetBuildSelection = this.resetBuildSelection.bind(this);
    }

    componentWillMount() {
        if (!this.props.isInitialized) {
            this.props.getBuildsAction();
        }
    }

    getBuild() {
        return this.props.builds.find(
            (build) => build.id === this.state.buildId
        );
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

    showDeleteListModal() {
        this.setState({showingDeleteList: true});
    }

    hideDeleteListModal() {
        this.setState({showingDeleteList: false});
    }

    resetBuildSelection() {
        this.setState({buildId: null});
        this.props.setBuild(null);
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
                        styleClass={
                            this.state.buildId
                                ? "lightWithBorder"
                                : "lightWithBorderDisabled"
                        }
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
                        style={listModalStyles}>
                        <AddListModal hide={this.hideNewListModal} />
                    </Modal>
                    <Button
                        type="show-list"
                        styleClass={
                            this.state.buildId
                                ? "lightWithBorder"
                                : "lightWithBorderDisabled"
                        }
                        disabled={!this.state.buildId}
                        onClick={this.showShowListModal}>
                        Näytä lista
                    </Button>
                    <Modal
                        isOpen={this.state.showingShowList}
                        onRequestClose={this.hideShowListModal}
                        style={listModalStyles}>
                        <ShowListModal
                            onClose={this.hideShowListModal}
                            buildId={this.state.buildId}
                        />
                    </Modal>
                    <Button
                        type="delete-list"
                        styleClass={
                            this.state.buildId
                                ? "lightRedWithBorder"
                                : "lightWithBorderDisabled"
                        }
                        disabled={!this.state.buildId}
                        onClick={this.showDeleteListModal}>
                        Poista lista
                    </Button>
                    <Modal
                        isOpen={this.state.showingDeleteList}
                        onRequestClose={this.hideDeleteListModal}
                        style={deleteModalStyles}>
                        <DeleteListModal
                            build={this.getBuild()}
                            hide={this.hideDeleteListModal}
                            resetBuildSelection={this.resetBuildSelection}
                        />
                    </Modal>
                </div>
            </div>
        );
    }
}
