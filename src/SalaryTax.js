import React, {Component} from 'react';

import {view as Main} from './main';
import {view as Deduct} from './deduct';
import {view as Regions} from './regions';


function SalaryTax() {
  return (
    <div>
      <Main />
      <Deduct />
      <Regions />
    </div>
  )
}

export default SalaryTax;