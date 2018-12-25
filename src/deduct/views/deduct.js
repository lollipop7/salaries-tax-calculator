import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal, List, Picker, Checkbox, InputItem, Flex, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import * as Actions from '../../Actions';
import childrenEduData from '../../data/children-edu.js';
import oldSupportData from '../../data/old-support.js';
import continuingEduData from '../../data/continuing-edu.js';
import merge from 'lodash/merge';
import filter from 'lodash/filter';
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
    this.handleAddItem = this.handleAddItem.bind(this)
    this.state = {
      // childrenEduValue: [12000],
      // continuingEduValue: ['教育期间']
      isChildrenEdu: false,
      isOldSupport: false,
      isContinuingEdu: false,
      isHousingRent: false,
      isHousingLoan: false,
      deduction_num: 0,
      children_edu: 0,
      old_support: 0,
      continuing_edu: 0,
      housing_rent: 0,
      housing_loan: 0
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }
  handleInput(field,v) {
    this.setStateAsync({
      [field]: v
    })
  }

  handleEdit(field, v) {
    this.setStateAsync({
      [field]: !v
    })
  }

  handleAddItem() {
    let {
      isChildrenEdu,
      isOldSupport,
      isContinuingEdu,
      isHousingRent,
      isHousingLoan,
      deduction_num,
      children_edu,
      old_support,
      continuing_edu,
      housing_rent,
      housing_loan
    } = this.state;
    const {
      addDeductNum
    } = this.props;
    const deductObj = merge(
      {}, 
      isChildrenEdu,
      isOldSupport,
      isContinuingEdu,
      isHousingRent,
      isHousingLoan
    );
    deduction_num = deductObj.map((item) => {
      let num = 0;
      if(item) {
        num++
      }
      return num;
    })
    this.setStateAsync({deduction_num}).then(
      addDeductNum(
        {
          children_edu,
          old_support,
          continuing_edu,
          housing_rent,
          housing_loan
        },
        deduction_num)
    )
  }

  render() {
    const { getFieldProps } = this.props.form;
    const {
      isChildrenEdu,
      isOldSupport,
      isContinuingEdu,
      isHousingRent,
      isHousingLoan,
      children_edu,
      old_support,
      continuing_edu,
      housing_rent,
      housing_loan
    } = this.state;
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
              {/* <Picker
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
              </Picker> */}
              <InputItem 
                {...getFieldProps('children_edu', {
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
                clear
                value={children_edu}
                editable={isChildrenEdu}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
                onChange={this.handleInput.bind(this, 'children_edu')}
              >
                <CheckboxItem 
                  key="children_edu"
                  onChange={this.handleEdit.bind(this, 'isChildrenEdu', isChildrenEdu)}
                >   
                  子女教育
                </CheckboxItem>
              </InputItem>
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
                editable={isOldSupport}
                value={old_support}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
                onChange={this.handleInput.bind(this, 'old_support')}
              >
                <CheckboxItem 
                  key="old_support"
                  onChange={this.handleEdit.bind(this, 'isOldSupport', isOldSupport)}
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
              <InputItem 
                {...getFieldProps('continuing_edu', {
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
                clear
                editable={isContinuingEdu}
                value={continuing_edu}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
                onChange={this.handleInput.bind(this, 'continuing_edu')}
              >
                <CheckboxItem 
                  key="continuing_edu"
                  onChange={this.handleEdit.bind(this, 'isContinuingEdu', isContinuingEdu)}
                >   
                继续教育
                </CheckboxItem>
              </InputItem>
              {/* <Picker
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
              </Picker> */}
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
                editable={isHousingRent}
                value={housing_rent}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
                onChange={this.handleInput.bind(this, 'housing_rent')}
              >
                <CheckboxItem 
                  key="housing_rent"
                  onChange={this.handleEdit.bind(this, 'isHousingRent', isHousingRent)}
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
                editable={isHousingLoan}
                value={housing_loan}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
                onChange={this.handleInput.bind(this, 'housing_loan')}
              >
                <CheckboxItem 
                  key="housing_loan"
                  onChange={this.handleEdit.bind(this, 'isHousingLoan', isHousingLoan)}
                >   
                  房贷利息
                </CheckboxItem>
              </InputItem>
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
                defaultValue={'暂不纳入计算'}
                type='money'
                clear
                disabled
                editable={false}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
              >
                <CheckboxItem 
                  key="medical"
                  disabled
                >   
                  大病医疗
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
  hideDeduct: bindActionCreators(Actions.Deduct.hideDeduct, dispatch),
  addDeductNum: bindActionCreators(Actions.Deduct.addDeductNum, dispatch),
})
DeductComponent = createForm()(DeductComponent);
export default connect(mapStateToProps, mapDispatchToProps)(DeductComponent); 