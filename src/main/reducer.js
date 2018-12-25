import {TAX_CALC} from './actionTypes';

const initState = {
  represent_data: {},
  isShowDiagram: false
}

export default (state=initState, actions) => {
  switch(actions.type) {
    case TAX_CALC:
      return {...state, represent_data: actions.payload.d, isShowDiagram: actions.payload.result};
    default:
      return state;
  }
}