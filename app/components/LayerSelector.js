import React, { Component, PropTypes } from 'react';
import Layer from './Layer';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styles from './LayerSelector.css';

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
  layers: PropTypes.array.isRequired,
  switchLayer: PropTypes.func.isRequired,
  toggleLayer: PropTypes.func.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default dragDropContext(HTML5Backend)(LayerSelector);
