import React, { Component } from "react";
import DayPicker from "./DayPicker";
import Button from "./Button";
import s from "./pointBuildTrigger.css";

export default class RouteMapConfigurator extends Component {
    render() {
        const date = new Date();
        return (
            <div className={s.container}>
                <div className={s.header}>
                    Poikkileikkauspäivä
                </div>
                <div className={s.statusbar}>
                    <div className={s.status}>PENDING</div>
                    <div>12.10.2018</div>
                </div>
                <div className={s.content}>
                    <DayPicker
                        value={date}
                        onChange={value => this.setPointDate(value)}
                    />
                    <Button
                        styleClass="lightWithBorder"
                        onClick={this.openAdvancedSettings}
                    >
                        Päivitä
                    </Button>
                </div>
            </div>
        );
    }
}
