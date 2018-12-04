import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import SalaryTax from './SalaryTax';
import {Provider} from 'react-redux';
import Store from './Store';

ReactDOM.render(
  <Provider>
    <SalaryTax />
  </Provider>
, document.getElementById('root'));
