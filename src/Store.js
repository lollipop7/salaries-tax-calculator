import {createStore} from 'redux';

import {reducer as mainReducer} from './main';

const store  = createStore(mainReducer, {});

export default store;