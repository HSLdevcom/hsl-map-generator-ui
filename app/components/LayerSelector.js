import React, { PropTypes } from "react";
import DayPicker from "./DayPicker";
import Layer from "./Layer";
import styles from "./LayerSelector.css";

function LayerSelector(props) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Näytä kartalla
            </div>
            {props.layers.map((layer, index) => (
                <Layer
                    key={layer.id}
                    id={layer.id}
                    index={index}
                    text={layer.description}
                    selected={layer.enabled}
                    toggleLayer={props.toggleLayer}
                    changeDate={props.changeDate}
                />
            ))}
            <div className={styles.title}>
                Esitettävä päivämäärä
            </div>
            <DayPicker
                value={props.date}
                onChange={value => props.changeDate(value)}
            />
        </div>
    );
}

LayerSelector.propTypes = {
    layers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    toggleLayer: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    date: PropTypes.string,
    changeDate: PropTypes.func.isRequired,
};

export default LayerSelector;
