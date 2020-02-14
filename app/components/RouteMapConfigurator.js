import React, {Component} from "react";
import Modal from "react-modal";
import moment from "moment";
import Button from "./Button";
import style from "./RouteMapConfigurator.css";
import AdvancedRouteMapOptions from "../containers/AdvancedRouteMapOptions";
import {PointStatus} from "../reducers/publisherRequests";
import get from "lodash/get";

export default class RouteMapConfigurator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            success: false,
            advancedSettingsOpen: false,
            error: ""
        };
        this.generate = this.generate.bind(this);
        this.closeDone = this.closeDone.bind(this);
        this.openAdvancedSettings = this.openAdvancedSettings.bind(this);
        this.closeAdvancedSettings = this.closeAdvancedSettings.bind(this);
        this.toggleOnlyNearBuses = this.toggleOnlyNearBuses.bind(this);
        this.toggleZones = this.toggleZones.bind(this);

        this.routesLayer = this.props.layers.find(
            (layer) => layer.id === "routes"
        );
        this.regularRoutesLayer = this.props.layers.find(
            (layer) => layer.id === "regular_routes"
        );
        this.nearBusRoutesLayer = this.props.layers.find(
            (layer) => layer.id === "near_bus_routes"
        );

        this.ticketZonesLayer = this.props.layers.find(
            (layer) => layer.id === "ticket_zones"
        );

        this.ticketZoneLabelsLayer = this.props.layers.find(
            (layer) => layer.id === "ticket_zone_labels"
        );
        this.setDefaultLayers();
    }

    setDefaultLayers() {
        if (this.routesLayer.enabled)
            this.props.toggleLayer(this.routesLayer.id);
        if (!get(this, "regularRoutesLayer.enabled", true))
            this.props.toggleLayer(this.regularRoutesLayer.id);
        if (get(this, "nearBusRoutesLayer.enabled", false))
            this.props.toggleLayer(this.nearBusRoutesLayer.id);
        if (this.props.showOnlyNearBuses) this.props.toggleOnlyNearBuses();
    }

    openAdvancedSettings() {
        this.setState({
            advancedSettingsOpen: true
        });
    }

    closeAdvancedSettings() {
        this.setState({
            advancedSettingsOpen: false
        });
    }

    closeDone() {
        this.setState({
            sent: false
        });
    }

    toggleOnlyNearBuses() {
        this.props.toggleLayer(this.regularRoutesLayer.id);
        this.props.toggleLayer(this.nearBusRoutesLayer.id);
        this.props.toggleOnlyNearBuses();
    }

    toggleZones() {
        this.props.toggleZoneLabels();
    }

    generate() {
        this.props.generateRouteMap(
            () => {
                this.setState({sent: true});
            },
            () => {
                this.setState({success: true, error: ""});
            },
            (error) => {
                this.setState({success: false, error});
            }
        );
    }

    render() {
        let input = null;
        const {build, setPosterName, posterName} = this.props;

        return (
            <div className={style.container}>
                <div>
                    <div className={style.header}>Valinnat</div>
                    <div className={style.element}>
                        <div className={style.title}>Lista</div>
                        <div className={style.value}>
                            {build && build.title}
                            {(!build || !build.title) && "-"}
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Tunnus</div>
                        <div className={style.value}>
                            <input
                                ref={(el) => {
                                    input = el;
                                }}
                                className={style.input}
                                value={posterName}
                                onChange={() => setPosterName(input.value)}
                                placeholder="nimi/tunnus"
                            />
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Vain lähibussit</div>
                        <div className={style.value}>
                            <input
                                className={style.checkbox}
                                type="checkbox"
                                onChange={this.toggleOnlyNearBuses}
                                value={this.props.showOnlyNearBuses}
                            />
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Vyöhykesymbolit</div>
                        <div className={style.value}>
                            <input
                                className={style.checkbox}
                                type="checkbox"
                                onChange={this.toggleZones}
                                value={this.props.showZoneLabels}
                            />
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Päivämäärä</div>
                        <div className={style.value}>
                            {this.props.pointConfig &&
                                this.props.pointConfig.target_date && (
                                    <span>
                                        {moment(
                                            this.props.pointConfig.target_date
                                        ).format("DD.MM.YYYY")}
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                <Button
                    styleClass="lightWithBorder"
                    onClick={this.openAdvancedSettings}>
                    Avaa lisäasetukset
                </Button>
                <Modal
                    isOpen={this.state.advancedSettingsOpen}
                    onRequestClose={this.closeAdvancedSettings}>
                    <AdvancedRouteMapOptions />
                </Modal>
                <Button
                    styleClass="lightWithBorder"
                    disabled={
                        !build ||
                        !build.id ||
                        !posterName ||
                        !this.props.pointConfig ||
                        this.props.pointConfig.status !== PointStatus.DONE
                    }
                    onClick={this.generate}>
                    Generoi
                </Button>
                <Modal isOpen={this.state.sent} onRequestClose={this.closeDone}>
                    {this.state.success && (
                        <div style={{color: "black"}}>
                            <h1>Info</h1>
                            <p>
                                Linjakartta {posterName} on nyt rakentamassa.
                                <br />
                                Voit seurata linjakartan rakennusprosessi listan
                                info näkymässä.
                            </p>
                        </div>
                    )}{" "}
                    {this.state.error && (
                        <div>
                            <h3>Virhe</h3>
                            <p>{this.state.error}</p>
                        </div>
                    )}
                </Modal>
            </div>
        );
    }
}
