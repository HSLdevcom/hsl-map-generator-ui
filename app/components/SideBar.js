import React from "react";
import styles from "./SideBar.css";
import Modes from "../enums/Modes";
import LayerSelector from "../containers/LayerSelector";
import FileOperations from "../containers/FileOperations";
import BuildSelector from "../containers/BuildSelector";
import RouteMapConfigurator from "../containers/RouteMapConfigurator";
import PointBuildTrigger from "../containers/PointBuildTrigger";
import Button from "./Button";

const SideBar = ({currentMode, toggleMode}) => (
    <div className={styles.sideBar}>
        <div className={styles.modeSelector}>
            <Button
                onClick={toggleMode}
                styleClass="lightWithBorder"
                type="toggle-mode">
                Siirry{" "}
                {currentMode === Modes.MAP
                    ? "Linjakarttageneraatoriin"
                    : "Karttageneratoriin"}
            </Button>
        </div>
        {currentMode === Modes.MAP && [
            <LayerSelector key="LayerSelector" />,
            <FileOperations key="FileOperations" />
        ]}
        {currentMode === Modes.ROUTEMAP && [
            <PointBuildTrigger key="PointBuildTrigger" />,
            <BuildSelector key="BuildSelector" />,
            <RouteMapConfigurator key="RouteMapConfigurator" />
        ]}
    </div>
);

export default SideBar;
