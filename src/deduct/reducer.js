import {
  SHOW_DEDUCT, 
  HIDE_DEDUCT,
  ADD_DEDUCT,
  CHECKED_DEDUCT
} from './actionTypes';

const initState = {
  isVisible: false,
  deduction_item: {
    children_edu: 0.0,
    old_support: 0.0,
    continuing_edu: 0.0,
    housing_rent: 0.0,
    housing_loan: 0.0,
    medical: 0.0
  },
  deduction_num: 0,
  checked_deduct: []
}

export default (state=initState, actions) => {
  switch(actions.type) {
    case SHOW_DEDUCT:
      return {...state, isVisible: true};
    case HIDE_DEDUCT:
      return {...state, isVisible: false};
    case ADD_DEDUCT:
      return {...state, deduction_item: actions.payload, deduction_num: actions.num };
    case CHECKED_DEDUCT:
      return {...state, checked_deduct: actions.payload };
    default:
      return state;
  }
}