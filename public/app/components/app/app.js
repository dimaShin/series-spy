"use strict";

import React from "react";
import Button from "../start-parsing/button"

class App extends React.Component {
  constructor (props) {
    super(props);

    this.button = React.createElement(Button);
  }
  render () {
  return (
    <div id="app-container">
      Hello, {this.props.name}!
      <Button />
    </div>
  );
}
}


export default App;
