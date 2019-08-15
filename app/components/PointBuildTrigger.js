import React, {Component} from "react";
import moment from "moment";
import classNames from "classnames";
import DayPicker from "./DayPicker";
import Button from "./Button";
import s from "./pointBuildTrigger.css";
import {PointStatus} from "../reducers/publisherRequests";

export default class RouteMapConfigurator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };

        this.update = this.update.bind(this);
        this.sendDate = this.sendDate.bind(this);
        this.setPointDate = this.setPointDate.bind(this);
    }

    componentDidMount() {
        this.update(false);
        this.interval = setInterval(() => this.update(true), 2500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    setPointDate(date) {
        this.setState({
            date
        });
    }

    sendDate() {
        this.props.setConfig(moment(this.state.date));
    }

    update(supressInfo) {
        this.props.fetchConfig(supressInfo);
    }

    isDisabled() {
        return this.props.config && this.props.config.status === "PENDING";
    }

    render() {
        let statusColor = "#DDD";
        let statusText = "Hakee";

        if (this.props.config) {
            switch (this.props.config.status) {
                case PointStatus.DONE:
                    statusColor = "green";
                    statusText = "Käytettävissä";
                    break;
                case PointStatus.PENDING:
                    statusColor = "yellow";
                    statusText = "Päivitys käynnissä";
                    break;
                case PointStatus.ERROR:
                    statusColor = "red";
                    statusText = "Virhe";
                    break;
                default:
                    break;
            }
        } else {
            statusText = "Ei löydetty";
        }

        return (
            <div className={s.container}>
                <div className={s.header}>
                    Poikkileikkauspäivä
                    {this.props.config && (
                        <div>
                            Päivitetty{" "}
                            {moment(this.props.config.updated_at).format(
                                "DD.MM.YYYY"
                            )}
                        </div>
                    )}
                </div>
                <div className={s.statusbar}>
                    <div
                        className={s.status}
                        style={{backgroundColor: statusColor}}>
                        {statusText}
                    </div>
                    <div>
                        {this.props.config
                            ? moment(this.props.config.target_date).format(
                                  "DD.MM.YYYY"
                              )
                            : ""}
                    </div>
                </div>
                <div className={classNames(s.header, s.marginTop)}>
                    Generoi uusi poikkileikkauspäivä
                </div>
                <div className={s.content}>
                    <DayPicker
                        value={this.state.date}
                        onChange={(value) => this.setPointDate(value)}
                        disabled={this.isDisabled()}
                    />
                    <Button
                        styleClass="lightWithBorder"
                        onClick={this.sendDate}
                        disabled={this.isDisabled()}>
                        Päivitä
                    </Button>
                </div>
            </div>
        );
    }
}
