import * as types from './actionTypes';
import {AjaxByPost} from '../utils/ajax';

const TAX_CALC = {type: types.TAX_CALC};
const SHOW_CHECKED_DEDUCT = {type: types.SHOW_CHECKED_DEDUCT};
const HIDE_CHECKED_DEDUCT = {type: types.HIDE_CHECKED_DEDUCT};

export const taxCalc = (data) => (dispatch, getState) => {
  AjaxByPost('salaryCalculate', {
    head: {
      "transcode": "SC0001",
       type: 'h'
    },
    data: data
  })
  .then(res=>{
    dispatch({...TAX_CALC, payload: res});
  })
}

export const showCheckedDeduct = () =>(dispatch) => {
  dispatch(SHOW_CHECKED_DEDUCT)
}


export const hideCheckedDeduct = () => (dispatch) => {
  dispatch(HIDE_CHECKED_DEDUCT)
}

