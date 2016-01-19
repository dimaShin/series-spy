"use strict";
import React from 'react';

class Button extends React.Component {

  constructor (props) {
    super(props);
  };

  render() {
    return (
        <form onSubmit={this.onFormSubmit}>
          <button type="submit">Start Parsing</button>;
        </form>
      )

  };

  onFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.onParse()
  };
}

export default Button