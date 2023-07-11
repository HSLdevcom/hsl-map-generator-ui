import PropTypes from "prop-types";
import React, {Component} from "react";
import Button from "./Button";
import styles from "./DeleteListModal.css";

class DeleteListModal extends Component {
    constructor(props) {
        super();
        this.state = {title: props.build.title, done: false};
        this.deleteList = this.deleteList.bind(this);
    }

    deleteList() {
        this.props.deleteList(this.props.build.id, () => {
            this.setState({done: true});
        });
        this.props.resetBuildSelection();
    }

    render() {
        return (
            <div className={styles.container}>
                {!this.state.done && (
                    <div>
                        <h1>Poistetaanko lista {this.state.title}?</h1>
                        <div className={styles.row}>
                            <Button
                                type="confirm-delete-list"
                                className={styles.button}
                                onClick={() => this.deleteList()}>
                                Poista
                            </Button>
                            <Button
                                type="cancel-delete-list"
                                className={styles.button}
                                onClick={() => this.props.hide()}>
                                Peruuta
                            </Button>
                        </div>
                    </div>
                )}
                {this.state.done && (
                    <div>
                        <h1>Lista on poistettu</h1>
                        <Button
                            type="close-delete-list"
                            onClick={() => this.props.hide()}>
                            Sulje
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}

DeleteListModal.propTypes = {
    hide: PropTypes.func.isRequired
};

export default DeleteListModal;
