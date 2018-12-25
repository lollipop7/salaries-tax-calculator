import React, {Component} from 'react';
import { InputItem } from 'antd-mobile';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class InputBlock extends Component {

  handleChange(field, v){
    this.props.handleChange(field, v)
  }

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
            normalize: this.normalizeFun,
          })}
          type='money'
          extra={'%'}
          value={value}
          editable={isEditable}
          onChange={this.handleChange.bind(this, itemname)}
          moneyKeyboardAlign="left"
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
        />
    )
  }
}

export default InputBlock;