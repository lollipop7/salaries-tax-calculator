import {TAX_CALC} from './actionTypes';

const initState = {
  represent_data: {}
}

export default (state=initState, actions) => {
  switch(actions.type) {
    case TAX_CALC:
      console.log(actions.payload)
      return {...state, represent_data: actions.payload};
    default:
      return state;
  }
}