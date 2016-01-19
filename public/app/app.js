"use strict";

import React from "react";
import ReactDom from "react-dom";

import App from './components/app/app';

require("babel-core/register");
require("babel-polyfill");


const app = React.createElement(App, {name: 'Series Spy'});

ReactDom.render(app,
  document.getElementById('root'));
