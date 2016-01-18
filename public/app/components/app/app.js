
import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div id="app-container">
        Hello, {this.props.name}!
      </div>
    );
  }
});
