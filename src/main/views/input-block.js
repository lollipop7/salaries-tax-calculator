import React, {Component, Fragment} from 'react';
import { InputItem } from 'antd-mobile';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class InputBlock extends Component {

  normalizeFun = (v, prev) => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
      if (v === '.') {
        return '0.';
      }
      return prev;
    }
    return v;
  }

  handleChange(field, v) {
    this.props.handleChange(field, v)
  }

  render() {
    const {
      itemname,
      getFieldDecorator,
      setFieldsValue,
      rate_item,
      isEditable,
    } = this.props;
    return (
      <Fragment>
        {
          getFieldDecorator(itemname, {
            initialValue: rate_item[itemname],
            normalize: this.normalizeFun,
            trigger: 'onChange',
          })(
            <InputItem
              type='money'
              extra={'%'}
              editable={isEditable}
              onChange={this.handleChange.bind(this, itemname)}
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
          )
        }
      </Fragment>
    )
  }
}

export default InputBlock;