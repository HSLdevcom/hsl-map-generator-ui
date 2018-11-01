import React from "react";
import styles from "./SideBar.css";
import Modes from "../enums/Modes";
import LayerSelector from "../containers/LayerSelector";
import FileOperations from "../containers/FileOperations";
import BuildSelector from "../containers/BuildSelector";
import RouteMapConfigurator from "../containers/RouteMapConfigurator";
import PointBuildTrigger from "../containers/PointBuildTrigger";

const SideBar = ({ currentMode }) => (
    <div className={styles.sideBar}>
        { currentMode === Modes.MAP && [
            <LayerSelector key="LayerSelector"/>,
            <FileOperations key="FileOperations"/>,
        ]}
        { currentMode === Modes.ROUTEMAP && [
            <PointBuildTrigger key="PointBuildTrigger"/>,
            <BuildSelector key="BuildSelector"/>,
            <RouteMapConfigurator key="RouteMapConfigurator"/>,
        ]}
    </div>
);

export default SideBar;
