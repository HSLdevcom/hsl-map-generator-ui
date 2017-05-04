import React, { PropTypes } from "react";

const style = {
    margin: "0 1rem",
    borderTop: "1px solid #666",
    padding: "0.5rem 1rem",
    color: "#ddd",
    fontWeight: 300,
    opacity: 1,
};

function Layer(props) {
    return (
        <div>
            <label htmlFor={`checkbox_${props.id}`}>
                <div style={style}>
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
    toggleLayer: PropTypes.func.isRequired,
};

export default Layer;
