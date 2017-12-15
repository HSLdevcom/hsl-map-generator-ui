import React, { PropTypes } from "react";

import styles from "./Layer.css";

function Layer(props) {
    return (
        <div className={styles.root}>
            <label htmlFor={`checkbox_${props.id}`}>
                <div className={styles.checkbox}>
                    <input
                        id={`checkbox_${props.id}`}
                        checked={props.selected}
                        type="checkbox" onChange={() => props.toggleLayer(props.id)}
                    />
                    {props.text}
                </div>
            </label>
        </div>
    );
}

Layer.propTypes = {
    id: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default Layer;
