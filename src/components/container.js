import React, { Component } from 'react';
import update from 'react/lib/update';
import Element from './element';
import { DropTarget } from 'react-dnd';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { elements: props.col };
  }

  pushElement(element) {
    this.setState(update(this.state, {
      elements: {
        $push: [ element ]
      }
    }));
  }

  removeElement(index) {
    this.setState(update(this.state, {
      elements: {
        $splice: [
          [index, 1]
        ]
      }
    }));
  }

  moveElement(dragIndex, hoverIndex) {
    const { elements } = this.state;
    const dragElement = elements[dragIndex];

    this.setState(update(this.state, {
      elements: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement]
        ]
      }
    }));
  }

  render() {
    const { elements } = this.state;
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    const backgroundColor = isActive ? 'pink' : '#FFF';

    return connectDropTarget(
      <div className='main-block__col'>
        {elements.map((element, i) => {
          return (
            <Element
              key={element.id}
              index={i}
              colId={this.props.id}
              element={element}
              removeElement={this.removeElement.bind(this)}
              moveElement={this.moveElement.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}

const elementTarget = {
  drop(props, monitor, component ) {
    const { id } = props;
    const sourceObj = monitor.getItem();
    if ( id !== sourceObj.colId ) component.pushElement(sourceObj.element);
    return {
      colId: id
    };
  }
}

export default DropTarget("ELEMENT", elementTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Container);
