import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './components/container';

import './app.styl';

class App extends Component {
 /*const colOne = [];

  const colTwo = [
    {
      id: 1,
      text: "Element One"
    },
    {
      id: 2,
      text: "Element Two"
    },
    {
      id: 6,
      text: "Element Three"
    },
    {
      id: 4,
      text: "Element Four"
    },
    {
      id: 5,
      text: "Element Five"
    },
    {
      id: 6,
      text: "Element Six"
    },
    {
      id: 7,
      text: "Element Seven"
    }
  ];*/
  render() {
    return(
      <div className='main-block'>
        <Container/>
        <Container />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
