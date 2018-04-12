import React, { Component } from "react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";

import Button from "./Button";
import style from "./RouteMapConfigurator.css";
import DayPicker from "./DayPicker";

export default class RouteMapConfigurator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            success: false,
            error: "",
        };
        this.generate = this.generate.bind(this);
        this.closeDone = this.closeDone.bind(this);
    }

    closeDone() {
        this.setState({
            sent: false,
        });
    }

    generate() {
        this.props.generateRouteMap(
            () => {
                this.setState({ sent: true });
            },
            () => {
                this.setState({ success: true, error: "" });
            },
            (error) => {
                this.setState({ success: false, error });
            },
        );
    }

    render() {
        let input = null;
        const {
            build,
            date,
            setDate,
            setPosterName,
            posterName,
        } = this.props;

        return (
            <div className={style.container}>
                <div>
                    <div className={style.header}>Valinnat</div>
                    <div className={style.element}>
                        <div className={style.title}>Lista</div>
                        <div className={style.value}>
                            { build && build.title }
                            { (!build || !build.title) && "-" }
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Tunnus</div>
                        <div className={style.value}>
                            <input
                                ref={(el) => { (input) = el; }}
                                className={style.input}
                                value={posterName}
                                onChange={() => setPosterName(input.value)}
                                placeholder="nimi/tunnus"
                            />
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Päivämäärä</div>
                        <div className={style.value}>
                            <DayPicker
                                value={date}
                                onChange={value => setDate(value)}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    styleClass="lightWithBorder"
                    disabled={!build || !build.id || !posterName}
                    onClick={this.generate}
                >
                    Generoi
                </Button>
                { this.state.sent &&
                    <ModalContainer onClose={this.closeDone}>
                        <ModalDialog onClose={this.closeDone}>
                            { this.state.success &&
                                <div>
                                    <h1>Info</h1>
                                    <p>
                                        Linjakartta {posterName} on nyt rakentamassa.
                                        <br/>
                                        Voit seurata linjakartan rakennusprosessi
                                        listan info näkymässä.
                                    </p>
                                </div>
                            } { this.state.error &&
                                <div>
                                    <h3>Virhe</h3>
                                    <p>
                                        {this.state.error}
                                    </p>
                                </div>
                            }
                        </ModalDialog>
                    </ModalContainer>
                }
            </div>
        );
    }
}
