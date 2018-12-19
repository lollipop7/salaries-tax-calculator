import {
  SHOW_REGIONS, 
  HIDE_REGIONS,
  SET_AREA
} from './actionTypes';

const initState = {
  isVisible: false,
  cityname: '上海'
}

export default (state=initState, actions) => {
  switch(actions.type) {
    case SHOW_REGIONS:
      return {...state, isVisible: true};
    case HIDE_REGIONS:
      return {...state, isVisible: false};
    case SET_AREA:
      console.log(actions.cityname)
      return {...state, cityname: actions.cityname}
    default:
      return state;
  }
}