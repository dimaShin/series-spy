"use strict";

import React, { Component, PropTypes }  from "react";
import ParseButton from "../start-parsing/button";
import { Provider } from "react-redux";
import { parse } from "../../ducks/startParsing";
import store from "../../store/configure";

import { connect } from "react-redux";

console.log(store);

class App extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
    <Provider store={store}>
      <div id="app-container">
        Hello, {this.props.name}!
        <ParseButton onParse={parse()} />
      </div>
    </Provider>

    );
  }
}

const mapStateToProps = ({ searchResults: { results, isLoading } }) => ({
  results,
  isLoading
});

export default connect(mapStateToProps)(App);
