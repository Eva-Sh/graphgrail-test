import React, { Component } from 'react';
import Element from './element';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { elements: props.col };
  }
  render() {
    const { elements } = this.state;
    return (
      <div className='main-block__col'>
        {elements.map((element, i) => {
          return (
            <Element
              key={element.id}
              index={i}
              colId={this.props.id}
              element={element}
            />
          );
        })}
      </div>
    );
  }
}

export default Container;
