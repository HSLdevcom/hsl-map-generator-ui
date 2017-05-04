import React, { PropTypes } from "react";
import Layer from "./Layer";
import styles from "./LayerSelector.css";

function LayerSelector(props) {
    return (
        <div className={styles.container}>
            {props.layers.map((layer, index) => (
                <Layer
                    key={layer.id}
                    id={layer.id}
                    index={index}
                    text={layer.text}
                    selected={layer.enabled}
                    toggleLayer={props.toggleLayer}
                />
            ))}
        </div>
    );
}

LayerSelector.propTypes = {
    layers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    toggleLayer: PropTypes.func.isRequired,
};

export default LayerSelector;
