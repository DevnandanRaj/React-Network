import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import networkReducer  from './reducer';


const rootReducer = combineReducers({
  network: networkReducer,
});

const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default Store;
