import React, { PropTypes } from "react";
import style from "./AdvancedRouteMapOptions.css";

const AdvancedRouteMapOptions = (props) => {
    let scaleLength;
    let anchorLength;
    let clusterDifferent;
    let clusterSame;
    let terminusRadius;
    let intermediateFontSize;
    let intermediateWidth;
    let terminusFontSize;
    let terminusWidth;
    let stationFontSize;

    return (
        <div className={style.container}>
            <h1 className={style.header}>Lisäasetukset</h1>
            <div className={style.element}>
                <div className={style.title}>Show scale</div>
                <div className={style.value}>
                    <input
                        className={style.checkbox}
                        type="checkbox"
                        onChange={() => props.setShowScale(!props.showScale)}
                        defaultChecked={props.showScale}
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>Scale length (meters)</div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (scaleLength) = el; }}
                        className={style.input}
                        value={props.scaleLength}
                        type="number"
                        onChange={() => props.setScaleLength(scaleLength.value)}
                        placeholder="Scale length (meters)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>Max anchor length (meters)</div>
                <div className={style.subtitle}>
                    Only affects intermediate labels,
                    labels are automatically removed if the necessary
                    anchor length is longer than max value
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (anchorLength) = el; }}
                        className={style.input}
                        value={props.maxAnchorLineLength}
                        type="number"
                        onChange={() => props.setMaxAnchorLineLength(anchorLength.value)}
                        placeholder="Max anchor length (meters)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>Cluster points within radius (meters)</div>
                <div className={style.subtitle}>
                    Cluster points that lies close to each other
                    to reduce amount of points on map. Clustered points will
                    have the aggregated list of routes.
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (clusterDifferent) = el; }}
                        className={style.input}
                        value={props.clusterDifferentRoutePointsDistance}
                        type="number"
                        onChange={() =>
                            props.setClusterDifferentRoutePointsDistance(clusterDifferent.value)}
                        placeholder="Cluster points within radius (meters)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>Cluster identical points within radius (meters)</div>
                <div className={style.subtitle}>
                    Cluster points that have the same route list, this will reduce the
                    amount of points along a road where the routes stay the same.
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (clusterSame) = el; }}
                        className={style.input}
                        value={props.clusterSameRoutePointsDistance}
                        type="number"
                        onChange={() =>
                            props.setClusterSameRoutePointsDistance(clusterSame.value)}
                        placeholder="Cluster identical points within radius (meters)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>
                    Minimum distance for intermediate from terminus (meters)
                </div>
                <div className={style.subtitle}>
                    Remove intermediate points that are closer than the given value from
                    any terminus. Terminuses usually create a cluster with too many
                    intermediate points,
                    this setting will reduce the amount of points in such places.
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (terminusRadius) = el; }}
                        className={style.input}
                        value={props.pointMinDistanceFromTerminus}
                        type="number"
                        onChange={() =>
                            props.setPointMinDistanceFromTerminus(terminusRadius.value)}
                        placeholder="Minimum distance for intermediate from terminus (meters)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>
                    Intermediate point font size (px)
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (intermediateFontSize) = el; }}
                        className={style.input}
                        value={props.intermediatePointFontSize}
                        type="number"
                        onChange={() =>
                            props.setIntermediatePointFontSize(intermediateFontSize.value)}
                        placeholder="Intermediate point font size (px)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>
                    Intermediate label box max width (px)
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (intermediateWidth) = el; }}
                        className={style.input}
                        value={props.intermediatePointWidth}
                        type="number"
                        onChange={() =>
                            props.setIntermediatePointMaxWidth(intermediateWidth.value)}
                        placeholder="Intermediate label box max width (px)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>
                    Terminus font size (px)
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (terminusFontSize) = el; }}
                        className={style.input}
                        value={props.terminusFontSize}
                        type="number"
                        onChange={() =>
                            props.setTerminusFontSize(terminusFontSize.value)}
                        placeholder="Terminus font size (px)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>
                    Terminus box max width (px)
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (terminusWidth) = el; }}
                        className={style.input}
                        value={props.terminusWidth}
                        type="number"
                        onChange={() =>
                            props.setTerminusMaxWidth(terminusWidth.value)}
                        placeholder="Terminus box max width (px)"
                    />
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>
                    Station name font size (px)
                </div>
                <div className={style.value}>
                    <input
                        ref={(el) => { (stationFontSize) = el; }}
                        className={style.input}
                        value={props.stationFontSize}
                        type="number"
                        onChange={() =>
                            props.setStationNameFontSize(stationFontSize.value)}
                        placeholder="Station name font size (px)"
                    />
                </div>
            </div>
        </div>
    );
};

AdvancedRouteMapOptions.propTypes = {
    showScale: PropTypes.bool.isRequired,
    scaleLength: PropTypes.number.isRequired,
    maxAnchorLineLength: PropTypes.number.isRequired,
    clusterDifferentRoutePointsDistance: PropTypes.number.isRequired,
    clusterSameRoutePointsDistance: PropTypes.number.isRequired,
    pointMinDistanceFromTerminus: PropTypes.number.isRequired,
    setShowScale: PropTypes.func.isRequired,
    setScaleLength: PropTypes.func.isRequired,
    setMaxAnchorLineLength: PropTypes.func.isRequired,
    setClusterDifferentRoutePointsDistance: PropTypes.func.isRequired,
    setClusterSameRoutePointsDistance: PropTypes.func.isRequired,
    setPointMinDistanceFromTerminus: PropTypes.func.isRequired,
    intermediatePointFontSize: PropTypes.number.isRequired,
    intermediatePointWidth: PropTypes.number.isRequired,
    terminusFontSize: PropTypes.number.isRequired,
    terminusWidth: PropTypes.number.isRequired,
    stationFontSize: PropTypes.number.isRequired,
    setIntermediatePointFontSize: PropTypes.func.isRequired,
    setIntermediatePointMaxWidth: PropTypes.func.isRequired,
    setTerminusFontSize: PropTypes.func.isRequired,
    setTerminusMaxWidth: PropTypes.func.isRequired,
    setStationNameFontSize: PropTypes.func.isRequired,
};

export default AdvancedRouteMapOptions;
