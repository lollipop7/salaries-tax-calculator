import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {reducer as main} from './main';
import {reducer as deduct} from './deduct';

const rootReducer = combineReducers({
  main,
  deduct
})

const store  = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));

export default store;