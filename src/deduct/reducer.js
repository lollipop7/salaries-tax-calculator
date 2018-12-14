import {
  SHOW_DEDUCT, 
  HIDE_DEDUCT
} from './actionTypes';

const initState = {
  isVisible: false
}

export default (state=initState, action) => {
  switch(action.type) {
    case SHOW_DEDUCT:
      return {...state, isVisible: true};
    case HIDE_DEDUCT:
      return {...state, isVisible: false};
    default:
      return state;
  }
}