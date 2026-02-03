import React, {Component} from "react";
import Modal from "react-modal";
import moment from "moment";
import get from "lodash/get";

import Button from "./Button";
import style from "./RouteMapConfigurator.css";
import AdvancedRouteMapOptions from "../containers/AdvancedRouteMapOptions";
import {PointStatus} from "../reducers/publisherRequests";
import {listModalStyles} from "../utils/ui-utils";

const ZONE_SYMBOLS = [{value: "A"}, {value: "B"}, {value: "C"}, {value: "D"}, {value: "E"}];

export default class RouteMapConfigurator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            success: false,
            advancedSettingsOpen: false,
            error: "",
            selectedSymbol: ""
        };
        this.generate = this.generate.bind(this);
        this.closeDone = this.closeDone.bind(this);
        this.openAdvancedSettings = this.openAdvancedSettings.bind(this);
        this.closeAdvancedSettings = this.closeAdvancedSettings.bind(this);
        this.toggleOnlyNearBuses = this.toggleOnlyNearBuses.bind(this);
        this.toggleZoneSymbols = this.toggleZoneSymbols.bind(this);
        this.setSymbolSize = this.setSymbolSize.bind(this);
        this.selectSymbol = this.selectSymbol.bind(this);
        this.addSymbol = this.addSymbol.bind(this);
        this.toggleJoreIdFiltering = this.toggleJoreIdFiltering.bind(this);

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

        // this.setDefaultLayers();
    }

    setSymbolSize(e) {
        this.props.setSymbolSize(e.target.value);
    }

    setDefaultLayers() {
        if (this.routesLayer.enabled) {
            this.props.toggleLayer(this.routesLayer.id);
        }
        if (!get(this, "regularRoutesLayer.enabled", true)) {
            this.props.toggleLayer(this.regularRoutesLayer.id);
        }
        if (get(this, "nearBusRoutesLayer.enabled", false)) {
            this.props.toggleLayer(this.nearBusRoutesLayer.id);
        }
        if (this.props.showOnlyNearBuses) {
            this.props.toggleOnlyNearBuses();
        }
    }

    addSymbol() {
        this.props.addSymbol(this.state.selectedSymbol);
    }

    selectSymbol(event) {
        this.setState({
            selectedSymbol: event.target.value
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

    toggleZoneSymbols() {
        this.props.toggleZoneSymbols();
    }

    toggleJoreIdFiltering() {
        this.props.toggleJoreIdFiltering();
    }

    openAdvancedSettings() {
        this.setState({
            advancedSettingsOpen: true
        });
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
        const {
            build,
            setPosterName,
            posterName,
            setRouteFilter,
            routeFilter
        } = this.props;
        const isDisabled =
            !build ||
            !build.id ||
            !posterName ||
            !this.props.pointConfig ||
            this.props.pointConfig.status !== PointStatus.DONE ||
            this.state.errorMessage;
        return (
            <div className={style.container}>
                <div>
                    <div className={style.header}>Valinnat</div>
                    <div className={style.element}>
                        <div className={style.title}>Lista</div>
                        <div
                            className={style.value}
                            data-cy="selected-poster-name">
                            {build && build.title}
                            {(!build || !build.title) && "-"}
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Tunnus</div>
                        <div className={style.value}>
                            <input
                                name="new-poster-name"
                                data-cy="new-poster-name"
                                className={style.input}
                                value={posterName}
                                onChange={(e) => setPosterName(e.target.value)}
                                placeholder="nimi/tunnus"
                            />
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Linjavalitsin</div>
                        <div className={style.value}>
                            <input
                                name="route-filter"
                                data-cy="route-filter"
                                className={style.input}
                                value={routeFilter.join(",")}
                                onChange={(e) =>
                                    setRouteFilter(
                                        e.target.value !== ""
                                            ? e.target.value
                                                  .split(",")
                                                  .map((id) => id.trim())
                                            : []
                                    )
                                }
                                placeholder="joreId1,joreId2"
                            />
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Käytä jore-id:tä</div>
                        <div className={style.value}>
                            <input
                                className={style.checkbox}
                                type="checkbox"
                                onChange={this.toggleJoreIdFiltering}
                                value={this.props.useJoreId}
                                checked={this.props.useJoreId}
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
                                checked={this.props.showOnlyNearBuses}
                            />
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.title}>Vyöhykesymbolit</div>
                        <div className={style.value}>
                            <input
                                className={style.checkbox}
                                type="checkbox"
                                onChange={this.toggleZoneSymbols}
                                value={this.props.showZoneSymbols}
                                checked={this.props.showZoneSymbols}
                            />
                        </div>
                    </div>
                    {this.props.showZoneSymbols && (
                        <div className={style.symbolOptionsContainer}>
                            <div className={style.title}>
                                Vyöhykesymbolien koko (pikseliä)
                            </div>
                            <div className={style.value}>
                                <input
                                    className={style.input}
                                    onChange={(e) => {
                                        this.setSymbolSize(e);
                                    }}
                                    value={this.props.symbolSize}
                                />
                            </div>
                            <div className={style.symbolAdd}>
                                Lisää symboli kartalle
                            </div>
                            <select
                                data-cy=""
                                className={style.buildSelect}
                                onChange={this.selectSymbol}
                                value={this.state.selectedSymbol || ""}>
                                <option disabled value="">
                                    {" "}
                                    -- Valitse vyöhyke --{" "}
                                </option>
                                {ZONE_SYMBOLS.map((symbol) => (
                                    <option
                                        key={symbol.value}
                                        value={symbol.value}>
                                        {symbol.value}
                                    </option>
                                ))}
                            </select>
                            <Button
                                styleClass="lightWithBorder"
                                onClick={this.addSymbol}>
                                Lisää symboli
                            </Button>
                            {this.state.errorMessage && (
                                <div className={style.errorMessage}>
                                    {this.state.errorMessage}
                                </div>
                            )}
                        </div>
                    )}
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
                    onRequestClose={this.closeAdvancedSettings}
                    style={listModalStyles}>
                    <AdvancedRouteMapOptions />
                </Modal>
                <Button
                    styleClass="lightWithBorder"
                    type="generate"
                    disabled={isDisabled}
                    onClick={this.generate}
                    style={listModalStyles}>
                    Generoi
                </Button>
                <Modal
                    isOpen={this.state.sent}
                    onRequestClose={this.closeDone}
                    style={listModalStyles}>
                    {this.state.success && (
                        <div style={{color: "black"}}>
                            <h1>Info</h1>
                            <p>
                                Linjakartta {posterName} on nyt generoitumassa.
                                <br />
                                Voit seurata linjakartan rakennusprosessia
                                listan infonäkymästä.
                            </p>
                            <Button
                                onClick={this.closeDone}
                                styleClass="lightWithBorder"
                                type="close-generate-prompt">
                                Sulje
                            </Button>
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
