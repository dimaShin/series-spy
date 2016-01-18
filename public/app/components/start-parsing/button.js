"use strict";
import React from 'react';

class Button extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return <button type="submit" class="btn btn-primary">Start Parsing</button>;
  }
}

export default Button