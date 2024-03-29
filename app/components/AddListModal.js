import PropTypes from "prop-types";
import React, {Component} from "react";
import Button from "./Button";
import styles from "./AddListModal.css";

class AddListModal extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            done: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.reset = this.reset.bind(this);
    }

    addList() {
        if (this.state.title) {
            this.props.addList(this.state.title, () => {
                this.setState({done: true});
            });
        }
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    reset() {
        this.setState({
            done: false,
            title: ""
        });
        this.props.hide();
    }

    render() {
        return (
            <div className={styles.container}>
                {!this.state.done && (
                    <div>
                        <h1>Uusi lista</h1>
                        <input
                            data-cy="new-list-name-input"
                            placeholder="Nimi"
                            className={styles.input}
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="add-list"
                            className={styles.button}
                            onClick={() => this.addList()}>
                            Lisää
                        </Button>
                    </div>
                )}
                {this.state.done && (
                    <div>
                        <h1>Lista on lisätty</h1>
                        <h3>Listan nimi: {this.state.title}</h3>
                        <Button
                            type="close-new-list"
                            onClick={() => this.reset()}>
                            Sulje
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}

AddListModal.propTypes = {
    addList: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired
};

export default AddListModal;
