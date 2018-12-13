import * as types from './actionTypes';

const CITY_SELECT = {type: types.CITY_SELECT};

export const citySelect = () => (dispatch, getState) => {
  dispatch(CITY_SELECT)
}