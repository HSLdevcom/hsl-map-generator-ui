import React from "react";
import Map from "../containers/Map";
import CenterSelector from "../containers/CenterSelector";
import SizeSelector from "../containers/SizeSelector";
import DpiSelector from "../containers/DpiSelector";
import MapScaleSelector from "../containers/MapScaleSelector";
import PixelScaleSelector from "../containers/PixelScaleSelector";
import SideBar from "../containers/SideBar";
import ModeSelector from "../containers/ModeSelector";
import styles from "./Home.css";

const Home = () => (
    <div className={styles.container}>
        <div className={styles.topBar}>
            <ModeSelector />
            <CenterSelector />
            <SizeSelector />
            <DpiSelector />
            <MapScaleSelector />
            <PixelScaleSelector />
        </div>
        <div className={styles.main}>
            <div className={styles.sideBar}>
                <div className={styles.sideBarContent}>
                    <SideBar />
                </div>
            </div>
            <div className={styles.mainMap}>
                <Map />
            </div>
        </div>
    </div>
);

export default Home;
