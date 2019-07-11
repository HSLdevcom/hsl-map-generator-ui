import React, {PropTypes} from "react";

import styles from "./Layer.css";

function Layer(props) {
    return (
        <div className={styles.container}>
            <label htmlFor={`checkbox_${props.id}`}>
                <input
                    id={`checkbox_${props.id}`}
                    checked={props.selected}
                    type="checkbox"
                    onChange={() => props.toggleLayer(props.id)}
                />
                {props.text}
            </label>
        </div>
    );
}

Layer.propTypes = {
    id: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    toggleLayer: PropTypes.func.isRequired
};

export default Layer;
