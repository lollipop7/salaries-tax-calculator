import * as types from './actionTypes';

const SHOW_REGIONS = {type: types.SHOW_REGIONS};
const HIDE_REGIONS = {type: types.HIDE_REGIONS};

export const showRegions = () =>(dispatch) => {
  console.log('打开模态框')
  dispatch(SHOW_REGIONS)
}


export const hideRegions = () => (dispatch) => {
  dispatch(HIDE_REGIONS)
}