import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';


class Element extends Component {

  render() {
    const { element, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{opacity}} className='main-block__element'>
        { element.text }
      </div>
    ));
  }
}

const elementSource = {

  beginDrag(props) {
    return {
      index: props.index,
      colId: props.colId,
      element: props.element
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if ( dropResult && dropResult.colId !== item.colId ) {
      props.removeElement(item.index);
    }
  }
};


const elementTarget = {

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().colId;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if ( props.colId === sourceListId ) {
      props.moveElement(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

export default flow(
  DropTarget("ELEMENT", elementTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("ELEMENT", elementSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Element);
