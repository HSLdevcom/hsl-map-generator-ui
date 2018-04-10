import React, { Component } from "react";
import Button from "./Button";
import styles from "./AddListModal.css";

export default class AddListModal extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    addList() {
        if (this.state.title) {
            this.props.addList(this.state.title);
        }
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>Lisää listan</h1>
                <input
                    className={styles.input}
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <Button onClick={() => this.addList()}>Lisää</Button>
            </div>
        );
    }
}
