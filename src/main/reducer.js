import {
  TAX_CALC,
  SHOW_CHECKED_DEDUCT,
  HIDE_CHECKED_DEDUCT
} from './actionTypes';

const initState = {
  represent_data: {},
  isShowDiagram: false,
  isVisible: false,
}

export default (state=initState, actions) => {
  switch(actions.type) {
    case SHOW_CHECKED_DEDUCT:
      return {...state, isVisible: true};
    case HIDE_CHECKED_DEDUCT:
      return {...state, isVisible: false};
    case TAX_CALC:
      return {...state, represent_data: actions.payload.d, isShowDiagram: actions.payload.result};
    default:
      return state;
  }
}