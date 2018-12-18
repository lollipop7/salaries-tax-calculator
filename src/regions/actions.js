import * as types from './actionTypes';

const SHOW_REGIONS = {type: types.SHOW_REGIONS};
const HIDE_REGIONS = {type: types.HIDE_REGIONS};
const SET_AREA = {type: types.SET_AREA};

export const showRegions = () =>(dispatch) => {
  dispatch(SHOW_REGIONS);
}

export const hideRegions = () => (dispatch) => {
  dispatch(HIDE_REGIONS);
}

export const setArea = (cityname) => (dispatch) => {
  dispatch({...SET_AREA, cityname: cityname});
}