import React, { Component, PropTypes } from "react";
import { DragDropContext as dragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Layer from "./Layer";
import styles from "./LayerSelector.css";

class LayerSelector extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
    }

    moveCard(dragIndex, hoverIndex) {
        this.props.switchLayer(dragIndex, hoverIndex);
    }

    render() {
        return (
            <div className={styles.container}>
                {this.props.layers.map((layer, index) => (
                    <Layer
                        key={layer.id}
                        id={layer.id}
                        index={index}
                        text={layer.text}
                        selected={layer.enabled}
                        moveCard={this.moveCard}
                        toggleLayer={this.props.toggleLayer}
                    />
                ))}
            </div>
        );
    }
}

LayerSelector.propTypes = {
    layers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    switchLayer: PropTypes.func.isRequired,
    toggleLayer: PropTypes.func.isRequired,

    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
    connectDragSource: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default dragDropContext(HTML5Backend)(LayerSelector);
