import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal, List, Picker, Checkbox, InputItem, Flex, Button, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import * as Actions from '../../Actions';
import childrenEduData from '../../data/children-edu.js';
import continuingEduData from '../../data/continuing-edu.js';
import housingRentData from '../../data/housing_rent.js';
import unionBy from 'lodash/unionBy';
import {uniqueBy} from '../../utils/tool';

const CheckboxItem = Checkbox.CheckboxItem;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}


class DeductComponent extends Component {
  constructor(props) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleChildrenEdu = this.handleChildrenEdu.bind(this);
    this.handleOldSupport = this.handleOldSupport.bind(this);
    this.onOldSupportErrorClick = this.onOldSupportErrorClick.bind(this);
    this.handleContinuingEdu = this.handleContinuingEdu.bind(this);
    this.handleHousingRent = this.handleHousingRent.bind(this);
    this.state = {
      isChildrenEdu: false,
      isOldSupport: false,
      isContinuingEdu: false,
      isHousingRent: false,
      isHousingLoan: false,
      children_edu: 1000,
      old_support: 2000,
      continuing_edu: 400,
      housing_rent: 1500,
      housing_loan: 0,
      medical: 0,
      childrenEduArr: [1000, 1],
      childrenEduValue: 500,
      continuingEduArr: [400],
      hasOldSupportInputError: false,
      housingRentArr: [1500],
      deduction_item: {
        children_edu: 0.0,
        old_support: 0.0,
        continuing_edu: 0.0,
        housing_rent: 0.0,
        housing_loan: 0,
        medical: 0.0
      }
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

  handleOldSupportEdit(field, v) {
    this.setStateAsync({
      [field]: !v
    })
    .then(()=> {
      let {
        deduction_item = {},
        old_support,
        isOldSupport,
      } = this.state;
      if(isOldSupport) {
        deduction_item.old_support = old_support;
      }else{
        deduction_item.old_support = 0
      }
      console.log(deduction_item, old_support)
      this.setStateAsync({deduction_item})
    })
  }

  handleRadioEdit(field, v) {
    let {
      deduction_item = {},
      housing_rent,
      housing_loan
    } = this.state;
    this.setStateAsync({
      [field]: !v
    }).then (()=>{
      const {
        isHousingRent,
        isHousingLoan,
      } = this.state;
      if (isHousingRent && isHousingLoan) {
        Toast.info('请选择住房租金或住房贷款其中一项！');
      }
      if(field === 'isHousingLoan') {
        if(isHousingLoan) {
          this.setStateAsync({
            housing_loan: 1000
          }).then(()=>{
            const {housing_loan} = this.state;
            deduction_item.housing_loan = housing_loan;
            console.log(housing_loan)
          })
        }else{
          this.setStateAsync({
            housing_loan: 0
          }).then(()=>{
            const {housing_loan} = this.state;
            deduction_item.housing_loan = housing_loan;
          })
        }
        console.log(deduction_item, housing_loan)      
        this.setStateAsync({deduction_item})
      }
    })
  }

  handleChildrenEdu(v) {
    this.setStateAsync({childrenEduArr: v})
    .then(()=> {
      let children_edu = this.state.childrenEduArr.reduce((prev, cur) => {
        return prev * cur
      });
      this.setStateAsync({children_edu})
    })
    .then(()=> {
      let {
        deduction_item = {},
        children_edu
      } = this.state;
      if(this.state.isChildrenEdu) {
        deduction_item.children_edu = children_edu;
      }else{
        deduction_item.children_edu = 0;
      }
      console.log(deduction_item, children_edu)
      this.setStateAsync({deduction_item})
    })
  }

  handleContinuingEdu(v) {
    this.setStateAsync({ continuingEduArr: v })
    .then(()=> {
      let continuing_edu = this.state.continuingEduArr[0];
      this.setStateAsync({continuing_edu})
    })
    .then(()=> {
      let {
        deduction_item = {},
        continuing_edu,
        isContinuingEdu
      } = this.state;
      if(isContinuingEdu) {
        deduction_item.continuing_edu = continuing_edu;
      }else{
        deduction_item.continuing_edu = 0;
      }
      console.log(deduction_item, continuing_edu)
      this.setStateAsync({deduction_item})
    })
  }

  handleHousingRent(v) {
    this.setStateAsync({ housingRentArr: v })
    .then(()=> {
      let housing_rent = this.state.housingRentArr[0];
      this.setStateAsync({housing_rent})
    })
    .then(()=> {
      let {
        deduction_item = {},
        housing_rent,
        isHousingRent
      } = this.state;
      if(isHousingRent) {
        deduction_item.housing_rent = housing_rent;
      }else{
        deduction_item.housing_rent = 0;
      }
      console.log(deduction_item, housing_rent)
      this.setStateAsync({deduction_item})
    })
  }

  handleOldSupport(v) {
    let min = 0, max = 2000;
    if(parseFloat(v) > min && parseFloat(v) < max) {
      this.setStateAsync({
        old_support: v
      })
      .then(()=> {
        let {
          deduction_item = {},
          old_support,
          isOldSupport,
        } = this.state;
        if(isOldSupport) {
          deduction_item.old_support = old_support;
        }else{
          deduction_item.pop({old_support});
        }
        
        console.log(deduction_item, old_support)
        this.setStateAsync({deduction_item})
      })
    } else {
      this.setStateAsync({
        hasOldSupportInputError: true
      })
    }
  }

  onOldSupportErrorClick() {
    if(this.state.hasOldSupportInputError){
      Toast.info('enter the number from 0 to 2000');
    }
  }

  handleAddItem() {    
    let {
      isChildrenEdu,
      isOldSupport,
      isContinuingEdu,
      isHousingRent,
      isHousingLoan,
      deduction_item = {}
    } = this.state;

    const {
      addDeductNum,
      editCheckedDeduct,
      hideDeduct
    } = this.props;

    if (isHousingRent && isHousingLoan) {
      Toast.info('请选择住房租金或住房贷款其中一项！');
      return false;
    }

    let checked_deduct = [
      {
        checked: isChildrenEdu,
        value: `子女教育: ${deduction_item.children_edu}`
      },
      {
        checked: isOldSupport,
        value: `赡养老人: ${deduction_item.old_support}`
      },
      {
        checked: isContinuingEdu,
        value: `继续教育: ${deduction_item.continuing_edu}`
      },
      {
        checked: isHousingRent,
        value: `住房租金: ${deduction_item.housing_rent}`
      },
      {
        checked: isHousingLoan,
        value: `房贷利息: ${deduction_item.housing_loan}`
      }
    ]

    new Promise((resolve)=>{
      let arr = [];
      arr.push(isChildrenEdu,
        isOldSupport,
        isContinuingEdu,
        isHousingRent,
        isHousingLoan,     
      );
      let deduction_num = 0;
      for (let i in arr) {
        if(arr[i]){
          deduction_num++
        }
      }
      resolve(deduction_num);
      console.log(deduction_num)
    })
    .then((deduction_num)=> {
      addDeductNum(
        deduction_item,
        deduction_num)
    }).then(
      ()=>{
        editCheckedDeduct(checked_deduct);
        hideDeduct();
      }
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
      old_support,
      continuing_edu,
      housing_rent,
      housing_loan,
      childrenEduArr,  
      hasOldSupportInputError,
      continuingEduArr,
      housingRentArr
    } = this.state;
    return (
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
                {...getFieldProps('children_edu')}
                title="子女教育"
                data={childrenEduData}
                cascade={false}
                value={childrenEduArr}
                onChange={v => this.setState({ childrenEduArr: v })}
                onOk={this.handleChildrenEdu}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="childrenEdu"
                  arrow="down"
                  checked={isChildrenEdu}
                  onChange={this.handleEdit.bind(this, 'isChildrenEdu', isChildrenEdu)}
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
                type='money'
                onVirtualKeyboardConfirm={this.handleOldSupport}
                error={hasOldSupportInputError}
                onErrorClick={this.onOldSupportErrorClick}
                clear
                value={old_support}
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
                onChange={this.handleInput.bind(this, 'old_support')}
              >
                <CheckboxItem 
                  key="old_support"
                  onChange={this.handleOldSupportEdit.bind(this, 'isOldSupport', isOldSupport)}
                  checked={isOldSupport}
                >   
                  赡养老人
                </CheckboxItem>
              </InputItem>
              
              <Picker
                {...getFieldProps('continuing_edu')}
                title="继续教育"
                data={continuingEduData}
                value={continuingEduArr}
                cols={1}
                onChange={v => this.setState({ continuingEduArr: v })}
                onOk={this.handleContinuingEdu}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="continuingEdu"
                  arrow="down"
                  onChange={this.handleEdit.bind(this, 'isContinuingEdu', isContinuingEdu)}
                  checked={isContinuingEdu}
                >
                  继续教育
                </CheckboxItem>
              </Picker>
              <Picker
                {...getFieldProps('housing_rent')}
                title="住房租金"
                data={housingRentData}
                value={housingRentArr}
                cols={1}
                onChange={v => this.setState({ housingRentArr: v })}
                onOk={this.handleHousingRent}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="continuingEdu"
                  arrow="down"
                  onChange={this.handleRadioEdit.bind(this, 'isHousingRent', isHousingRent)}
                  checked={isHousingRent}
                >
                  住房租金
                </CheckboxItem>
              </Picker>
              <InputItem 
                {...getFieldProps('housing_loan')}
                className='rt-list-item'
                value={1000}
                editable={false}
              >
                <CheckboxItem 
                  key="housing_loan"
                  onChange={this.handleRadioEdit.bind(this, 'isHousingLoan', isHousingLoan)}
                  checked={isHousingLoan}
                >   
                  房贷利息
                </CheckboxItem>
              </InputItem>
              <InputItem 
                className='rt-list-item'
                value={'暂不纳入计算'}
                disabled
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
              onClick={this.handleAddItem}
            >确定</Button>
          </div>
        </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isVisible: state.Deduct.isVisible
})

const mapDispatchToProps = dispatch => ({
  hideDeduct: bindActionCreators(Actions.Deduct.hideDeduct, dispatch),
  addDeductNum: bindActionCreators(Actions.Deduct.addDeductNum, dispatch),
  editCheckedDeduct: bindActionCreators(Actions.Deduct.editCheckedDeduct, dispatch),
})
DeductComponent = createForm()(DeductComponent);
export default connect(mapStateToProps, mapDispatchToProps)(DeductComponent); 