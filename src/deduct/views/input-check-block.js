import React, {Component} from 'react';
import {Checkbox, InputItem} from 'antd-mobile';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class InputCheckBlock extends Component {

  normalizeFun = (v, prev) => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
      if (v === '.') {
        return '0.';
      }
      return prev;
    }
    return v;
  }

  render() {
    const {
      itemname,
      getFieldProps,
      value,
      isEditable
    } = this.props;
    return (
      <InputItem 
          {...getFieldProps(itemname, {
            normalize: this.normalizeFun
          })}
          className='rt-list-item'
          placeholder='0-2000'
          type='money'
          clear
          editable
          moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
        >
          <CheckboxItem 
            key={itemname}  
            onChange={v=>{console.log(v)}}
          >   
            子女教育
          </CheckboxItem>
        </InputItem>
    )
  }
}