import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as Main} from './main';
import {reducer as Deduct} from './deduct';
import {reducer as Regions} from './regions';


const rootReducer = combineReducers({
  Main,
  Deduct,
  Regions
})

const store  = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));

export default store;