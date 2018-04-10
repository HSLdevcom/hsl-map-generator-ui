import React, { Component } from "react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import Button from "./Button";
import styles from "./BuildSelector.css";
import ShowListModal from "../containers/ShowListModal";

export default class BuildSelector extends Component {
    constructor() {
        super();
        this.setBuild = this.setBuild.bind(this);
        this.state = {
            showingNewList: false,
            showingShowList: false,
        };
        this.showNewListModal = this.showNewListModal.bind(this);
        this.hideNewListModal = this.hideNewListModal.bind(this);
        this.showShowListModal = this.showShowListModal.bind(this);
        this.hideShowListModal = this.hideShowListModal.bind(this);
    }

    componentWillMount() {
        if (!this.props.isInitialized) {
            this.props.getBuildsAction();
        }
    }

    setBuild(event) {
        this.props.setBuild(event.target.value);
    }

    showNewListModal() {
        this.setState({ showingNewList: true });
    }

    hideNewListModal() {
        this.setState({ showingNewList: false });
    }

    showShowListModal() {
        this.setState({ showingShowList: true });
    }

    hideShowListModal() {
        this.setState({ showingShowList: false });
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
                <div className={styles.buttonContainer}>
                    <Button styleClass="lightWithBorder" onClick={this.showNewListModal}>
                        Uusi lista
                    </Button>
                    { this.state.showingNewList &&
                        <ModalContainer onClose={this.hideNewListModal}>
                            <ModalDialog onClose={this.hideNewListModal}>
                                <h1>Dialog Content</h1>
                                <p>More Content. Anything goes here</p>
                            </ModalDialog>
                        </ModalContainer>
                    }
                    <Button styleClass="lightWithBorder" onClick={this.showShowListModal}>
                        Näytä lista
                    </Button>
                    { this.state.showingShowList &&
                        <ModalContainer onClose={this.hideShowListModal}>
                            <ModalDialog onClose={this.hideShowListModal}>
                                <ShowListModal buildId={this.props.buildId}/>
                            </ModalDialog>
                        </ModalContainer>
                    }
                </div>
            </div>
        );
    }
}
