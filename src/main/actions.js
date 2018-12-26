import * as types from './actionTypes';
import {AjaxByPost} from '../utils/ajax';
import store from 'store';

const TAX_CALC = {type: types.TAX_CALC};

export const taxCalc = (data) => (dispatch, getState) => {
  store.clearAll()
  AjaxByPost('salaryCalculate', {
    head: {
      "transcode": "SC0001",
       type: 'h'
    },
    data: data
  })
  .then(res=>{
    dispatch({...TAX_CALC, payload: res});
    // return Promise.resolve(res.d);
  })
  // .then((data)=>{
  //   console.log(data)
  //   store.set('person_income_item', data.person_income_item);
  //   store.set('company_cost_item', data.company_cost_item);
  //   store.set('salary', data.salary);
  //   store.set('total_cost', data.total_cost);
  // })
}

