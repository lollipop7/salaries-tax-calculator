import * as types from './actionTypes';

const SHOW_DEDUCT = {type: types.SHOW_DEDUCT};
const HIDE_DEDUCT = {type: types.HIDE_DEDUCT};

export const showModal = () =>(dispatch) => {
  dispatch(SHOW_DEDUCT)
}


export const hideModal = () => (dispatch) => {
  dispatch(HIDE_DEDUCT)
}