import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import SalaryTax from './SalaryTax';
import {Provider} from 'react-redux';
import store from './Store';

ReactDOM.render(
  <Provider store={store}>
    <SalaryTax />
  </Provider>
, document.getElementById('root'));
