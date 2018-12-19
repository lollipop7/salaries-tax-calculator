import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal, List, Picker, Checkbox, InputItem, Flex, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import * as Actions from '../../Actions';
import childrenEduData from '../../data/children-edu.js';
import oldSupportData from '../../data/old-support.js';
import continuingEduData from '../../data/continuing-edu.js';
import './style.scss';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

const CheckboxItem = Checkbox.CheckboxItem;

class DeductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childrenEduValue: [12000],
      continuingEduValue: ['教育期间']
    };
  }
  componentWillUpdate(){
    console.log(this.props.isVisible)
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
      <Modal
          visible={this.props.isVisible}
          closable={true}
          maskClosable={false}
          transparent={true}
          onClose={this.props.hideDeduct}
          animationType="slide-up"
          className="deduct-modal"
        >
          <div className="custom-list">
            <List>
              <h3>个税专项附加扣除</h3>
              <Picker
                title="子女教育"
                data={childrenEduData}
                cols={1}
                value={this.state.childrenEduValue}
                onChange={v=>console.log(v)}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="childrenEdu"
                  arrow="down"
                >
                  子女教育
                </CheckboxItem>
              </Picker>
              <InputItem 
                {...getFieldProps('old_support', {
                  normalize: (v, prev) => {
                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                      if (v === '.') {
                        return '0.';
                      }
                      return prev;
                    }
                    return v;
                  },
                })}
                className='rt-list-item'
                placeholder='0-2000'
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                editable
                maxLength={5}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
              >
                <CheckboxItem 
                  key="old_support"
                  onChange={v=>{console.log(v)}}
                >   
                  赡养老人
                </CheckboxItem>
              </InputItem>
              {/* <Picker
                title="赡养老人"
                data={oldSupportData}
                cols={1}
                value={this.state.oldSupportValue}
                onChange={v=>console.log(v)}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="oldSupport"
                  arrow="down"
                >
                  赡养老人
                </CheckboxItem>
              </Picker> */}
              <Picker
                title="继续教育"
                data={continuingEduData}
                cols={1}
                value={this.state.continuingEduValue}
                onChange={v=>console.log(v)}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="continuingEdu"
                  arrow="down"
                >
                  继续教育
                </CheckboxItem>
              </Picker>
              <InputItem 
                {...getFieldProps('medical', {
                  normalize: (v, prev) => {
                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                      if (v === '.') {
                        return '0.';
                      }
                      return prev;
                    }
                    return v;
                  },
                })}
                className='rt-list-item'
                placeholder='15000-60000'
                defaultValue={15000}
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                editable
                maxLength={5}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
              >
                <CheckboxItem 
                  key="medical"
                  onChange={v=>{console.log(v)}}
                >   
                  大病医疗
                </CheckboxItem>
              </InputItem>
              <InputItem 
                {...getFieldProps('housing_rent', {
                  normalize: (v, prev) => {
                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                      if (v === '.') {
                        return '0.';
                      }
                      return prev;
                    }
                    return v;
                  },
                })}
                className='rt-list-item'
                placeholder='0-1200'
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                editable
                maxLength={5}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
              >
                <CheckboxItem 
                  key="housing_rent"
                  onChange={v=>{console.log(v)}}
                >   
                  住房租金
                </CheckboxItem>
              </InputItem>
              <InputItem 
                {...getFieldProps('housing_loan', {
                  normalize: (v, prev) => {
                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                      if (v === '.') {
                        return '0.';
                      }
                      return prev;
                    }
                    return v;
                  },
                })}
                className='rt-list-item'
                placeholder='0-2000'
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                editable
                maxLength={5}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
              >
                <CheckboxItem 
                  key="housing_loan"
                  onChange={v=>{console.log(v)}}
                >   
                  房贷利息
                </CheckboxItem>
              </InputItem>
            </List>
            <Button 
              type="primary"
              inline
              className="btn-deduct"
              onClick={v=>{console.log(v)}}
            >确定</Button>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isVisible: state.Deduct.isVisible
})

const mapDispatchToProps = dispatch => ({
  hideDeduct: bindActionCreators(Actions.Deduct.hideDeduct, dispatch)
})
DeductComponent = createForm()(DeductComponent);
export default connect(mapStateToProps, mapDispatchToProps)(DeductComponent); 