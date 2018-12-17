import {
  SHOW_REGIONS, 
  HIDE_REGIONS
} from './actionTypes';

const initState = {
  isVisible: false
}

export default (state=initState, action) => {
  switch(action.type) {
    case SHOW_REGIONS:
      return {...state, isVisible: true};
    case HIDE_REGIONS:
      return {...state, isVisible: false};
    default:
      return state;
  }
}