import React, {Component} from 'react';

import {view as Main} from './main';
import {view as Deduct} from './deduct';
import {view as Regions} from './regions';
import {pageInputScroll} from './utils/pageInputScroll'


class SalaryTax extends Component {
  componentDidMount(){
    if(/Android/i.test(navigator.userAgent)){
      pageInputScroll()
    }
  }
  render() {
    return (
      <div style={{overflow: "auto"}}>
        <Main />
        <Deduct />
        <Regions />
      </div>
    )
  }
}

export default SalaryTax;