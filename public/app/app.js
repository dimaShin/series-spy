"use strict";

import React from "react";
import ReactDom from "react-dom";

import App from './components/app/app';

const app = React.createElement(App, {name: 'Series Spy'});

ReactDom.render(app,
  document.getElementById('root'));
