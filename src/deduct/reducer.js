import {
  SHOW_DEDUCT, 
  HIDE_DEDUCT
} from './actionTypes';

const initState = {

}

export default (state=initState, action) => {
  switch(action.type) {
    case SHOW_DEDUCT:
      return {...state};
    default:
      return state;
  }
}