import React, { Component } from 'react';

class Element extends Component {
  render() {
    const { element } = this.props;
    return(
      <div className='main-block__element'>
        { element.text }
      </div>
    );
  }
}

export default Element;
