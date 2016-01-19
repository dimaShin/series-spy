"use strict";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../ducks/index";
import thunk from "redux-thunk";
import createLogger from "redux-logger";

const createStoreWithMiddlewares = applyMiddleware(
  thunk,
  createLogger()
)(createStore);

export default createStoreWithMiddlewares(rootReducer);