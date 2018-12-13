import React, {Component} from 'react';

import {view as Main} from './main';
import {view as Calc} from './calc';
import {view as Deduct} from './deduct';


function SalaryTax() {
  return (
    <div>
      <Main />
      <Calc />
      <Deduct />
    </div>
  )
}

export default SalaryTax;