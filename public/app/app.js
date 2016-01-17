"use strict";

import React from "react";
import ReactDom from "react-dom";

import Greeting from "./greeting";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('starting app');
  }

  render () {
    return (
      'Hi there!'
    )
  }
}


ReactDom.render(App,
  document.getElementById('root'));
