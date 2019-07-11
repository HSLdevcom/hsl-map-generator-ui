import React, {Component} from "react";
import {ModalContainer, ModalDialog} from "react-modal-dialog";
import Button from "./Button";
import styles from "./BuildSelector.css";
import ShowListModal from "../containers/ShowListModal";
import AddListModal from "../containers/AddListModal";

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
                    className={styles.buildSelect}
                    onChange={this.setBuild}
                    value={this.state.buildId || ""}>
                    <option disabled value="empty">
                        {" "}
                        -- Valitse listan --{" "}
                    </option>
                    {this.props.builds.map((build) => (
                        <option key={build.id} value={build.id}>
                            {build.title}
                        </option>
                    ))}
                </select>
                <div className={styles.buttonContainer}>
                    <Button
                        styleClass="lightWithBorder"
                        disabled={!this.state.buildId}
                        onClick={this.useBuildId}>
                        Käytä tätä listaa
                    </Button>
                    <Button
                        styleClass="lightWithBorder"
                        onClick={this.showNewListModal}>
                        Uusi lista
                    </Button>
                    {this.state.showingNewList && (
                        <ModalContainer onClose={this.hideNewListModal}>
                            <ModalDialog onClose={this.hideNewListModal}>
                                <AddListModal hide={this.hideNewListModal} />
                            </ModalDialog>
                        </ModalContainer>
                    )}
                    <Button
                        styleClass="lightWithBorder"
                        disabled={!this.state.buildId}
                        onClick={this.showShowListModal}>
                        Näytä lista
                    </Button>
                    {this.state.showingShowList && (
                        <ModalContainer onClose={this.hideShowListModal}>
                            <ModalDialog onClose={this.hideShowListModal}>
                                <ShowListModal buildId={this.state.buildId} />
                            </ModalDialog>
                        </ModalContainer>
                    )}
                </div>
            </div>
        );
    }
}
