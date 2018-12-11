import React, {Component} from 'react';

import {view as Main} from './main';
import {view as Calc} from './calc';


function SalaryTax() {
  return (
    <div>
      <Main />
      <Calc />
    </div>
  )
}

export default SalaryTax;