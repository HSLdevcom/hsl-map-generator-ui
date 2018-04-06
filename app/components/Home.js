import React from "react";
import Map from "../containers/Map";
import CenterSelector from "../containers/CenterSelector";
import SizeSelector from "../containers/SizeSelector";
import DpiSelector from "../containers/DpiSelector";
import MapScaleSelector from "../containers/MapScaleSelector";
import PixelScaleSelector from "../containers/PixelScaleSelector";
import LayerSelector from "../containers/LayerSelector";
import FileOperations from "../containers/FileOperations";
import ModeSelector from "../containers/ModeSelector";
import styles from "./Home.css";

const Home = () => (
    <div>
        <div className={styles.topBar}>
            <ModeSelector/>
            <CenterSelector/>
            <SizeSelector/>
            <DpiSelector/>
            <MapScaleSelector/>
            <PixelScaleSelector/>
        </div>
        <div className={styles.main}>
            <div className={styles.sideBar}>
                <LayerSelector/>
                <FileOperations/>
            </div>
            <div className={styles.mainMap}>
                <Map/>
            </div>
        </div>
    </div>
);

export default Home;
