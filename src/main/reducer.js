import {CITY_SELECT} from './actionTypes';

const initState = {
}

export default (state=initState, action) => {
  switch(action.type) {
    case CITY_SELECT:
      return {...state};
    default:
      return state;
  }
}