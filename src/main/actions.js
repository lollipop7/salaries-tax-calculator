import * as types from './actionTypes';
import {AjaxByPost} from '../utils/ajax';

const TAX_CALC = {type: types.TAX_CALC};

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

