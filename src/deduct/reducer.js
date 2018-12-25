import {
  SHOW_DEDUCT, 
  HIDE_DEDUCT,
  ADD_DEDUCT
} from './actionTypes';

const initState = {
  isVisible: false,
  deductData: {},
  deduction_num: 0
}

export default (state=initState, actions) => {
  switch(actions.type) {
    case SHOW_DEDUCT:
      return {...state, isVisible: true};
    case HIDE_DEDUCT:
      return {...state, isVisible: false};
    case ADD_DEDUCT:
      return {...state, deductData: actions.payload, deduction_num: actions.num };
    default:
      return state;
  }
}