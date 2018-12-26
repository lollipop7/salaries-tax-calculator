import * as types from './actionTypes';

const SHOW_DEDUCT = {type: types.SHOW_DEDUCT};
const HIDE_DEDUCT = {type: types.HIDE_DEDUCT};
const ADD_DEDUCT = {type: types.ADD_DEDUCT};

export const showDeduct = () =>(dispatch) => {
  dispatch(SHOW_DEDUCT)
}


export const hideDeduct = () => (dispatch) => {
  dispatch(HIDE_DEDUCT)
}

export const addDeductNum = (obj, num) => (dispatch, getState) => {
  dispatch({...ADD_DEDUCT, payload: obj, num: num})
}