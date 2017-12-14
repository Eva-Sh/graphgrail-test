import React, { Component } from 'react';
import Element from './element';

class Container extends Component {

  render() {
    return (
      <div className='main-block__col'>
        <Element />
      </div>
    );
  }
}

export default Container;
