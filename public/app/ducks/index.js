import { combineReducers } from 'redux';
import searchResults from './startParsing';

const rootReducer = combineReducers({
  searchResults
});

export default rootReducer;
