import React, { Component } from 'react';
import {render} from 'react-dom';

import './app.styl';

export default class App extends Component {
  render() {
    return(
      <div className='main-block'>
        <div className='main-block__col main-block__col--left'>Hello left</div>
        <div className='main-block__col main-block__col--right'>Hello right</div>
      </div>
    );
  }
}
