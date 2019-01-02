import React, {Component} from 'react';
import { NavBar, Icon, Flex, List, WingBlank, Card, InputItem, Button, Checkbox, Picker } from 'antd-mobile';
import {createForm} from 'rc-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../Actions';
import './style.scss'; 
import Custom from './custom';
import Calc from './calc';
import {keepTwoDecimalFull, formatDecimal} from '../../utils/tool';

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}



class Main extends Component {
  constructor(props) {
    super(props);

    this.handleCustomPercent = this.handleCustomPercent.bind(this);
    this.handleCalc = this.handleCalc.bind(this);
    this.handleUpdateCustom = this.handleUpdateCustom.bind(this);
    this.calcRadix = this.calcRadix.bind(this);
    this.state = {
      isCustomVisible: false,
      calc_btn: '计算',
      calc_num: 1,
      supplyValue: ['8%'],
      salary: 10000.00,                   //税前月薪
      tax_threshold: 5000.0,              //起征点
      base_social_security: 10000.0,       //社保基数
      base_housingFund: 10000.0,           //公积金汇缴基数
      
      // children_edu: 1000.0,               //子女教育
      // old_support: 0.0,                   //赡养老人
      // continuing_edu: 0.0,                //继续教育
      // medical: 0.0,                       //大病医疗
      // housing_rent: 0.0,                  //住房租金
      // housing_loan: 0.0,                  //房贷利息
      social_security_threshold: '',
      base_housingFund_threshold: '',
      //rate_item
      rate_item : {
        p_pension_rate: 8,  //社保缴费比例（个人）
        p_medical_rate: 2,  //医保缴费比例（个人）
        p_unemployed_rate:  0.5,  //失业缴费比例（个人）
        p_injury_rate: "0", //工伤缴费比例（个人）
        p_childbearing_rate: "0", //生育缴费比例（个人）
        c_pension_rate: 20, //社保缴费比例（单位）
        c_medical_rate: 9.5,  //医保缴费比例（单位）
        c_unemployed_rate: 0.5,   //失业缴费比例（单位）
        c_injury_rate: 0.2, //工伤缴费比例（单位）
        c_childbearing_rate: 1, //生育缴费比例（单位）
        housingFund_rate: 7,  //公积金缴费比例
        housingFundAddition_rate: "0",  //汇缴补充公积金比例
      }
      
    }
  }

  calcRadix() {
    let {
      salary,                   //税前月薪
    } = this.state;
    if(parseFloat(salary)<2300) {
      this.setStateAsync({
        base_social_security: 4279,
        base_housingFund: 2300,
        social_security_threshold: '下限',
        base_housingFund_threshold: '下限'
      })
    }else if(parseFloat(salary)>=2300 && parseFloat(salary)<=4279) {
      this.setStateAsync({
        base_social_security: 4279,
        base_housingFund: salary,
        social_security_threshold: '下限',
        base_housingFund_threshold: ''
      })
    }else if(parseFloat(salary)>4279 && parseFloat(salary)<=21400){
      this.setStateAsync({
        base_social_security: salary,
        base_housingFund: salary,
        social_security_threshold: '',
        base_housingFund_threshold: ''
      })
    }else if(parseFloat(salary)>21400 && parseFloat(salary)<=23196){
      this.setStateAsync({
        base_social_security: salary,
        base_housingFund: 21400,
        social_security_threshold: '',
        base_housingFund_threshold: '上限'
      })
    }else{
      this.setStateAsync({
        base_social_security: 23196,
        base_housingFund: 21400,
        social_security_threshold: '上限',
        base_housingFund_threshold: '上限'
      })
    }
  }
  componentDidMount(){
    this.calcRadix()
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  handleCustomPercent() {
    const { isCustomVisible } = this.state;
    this.setStateAsync({isCustomVisible: !isCustomVisible})
  }

  handleCalc() {
    let {
      isReCalc,
      calc_num,
      salary,
      tax_threshold,
      base_social_security,
      base_housingFund,
      rate_item={}
    } = this.state;
    let {
      p_pension_rate,
      c_pension_rate,
      p_medical_rate,
      c_medical_rate,
      p_unemployed_rate,
      c_unemployed_rate,
      housingFund_rate,
      housingFundAddition_rate,
      p_injury_rate,
      c_injury_rate,
      p_childbearing_rate,
      c_childbearing_rate
    } = rate_item;

    const {
      deduction_item={},
      deduction_num,
    } = this.props;

    let {
      children_edu,
      old_support,
      continuing_edu,
      medical,
      housing_rent,
      housing_loan,
    } = deduction_item;
    const {
      cityname,
      taxCalc
    } = this.props;
    this.setStateAsync({
      calc_num: calc_num ++
    }).then(() => {
      if(calc_num > 1) {
        this.setStateAsync({
          calc_btn: '重新计算'
        })
      }
      taxCalc({
        "area": cityname,
        "salary": keepTwoDecimalFull(salary),
        "tax_threshold": keepTwoDecimalFull(tax_threshold),
        "base_social_security": keepTwoDecimalFull(base_social_security),
        "base_housingFund": keepTwoDecimalFull(base_housingFund),
        "rate_item": {
            "p_pension_rate": formatDecimal(p_pension_rate/100, 3),
            "p_medical_rate": formatDecimal(p_medical_rate/100, 3),
            "p_injury_rate": formatDecimal(p_injury_rate/100, 3),
            "p_unemployed_rate": formatDecimal(p_unemployed_rate/100, 3),
            "p_childbearing_rate": formatDecimal(p_childbearing_rate/100, 3),
            "c_pension_rate": formatDecimal(c_pension_rate/100, 3),
            "c_medical_rate": formatDecimal(c_medical_rate/100, 3),
            "c_injury_rate": formatDecimal(c_injury_rate/100, 3),
            "c_unemployed_rate": formatDecimal(c_unemployed_rate/100, 3),
            "c_childbearing_rate": formatDecimal(c_childbearing_rate/100, 3),
            "housingFund_rate": formatDecimal(housingFund_rate/100, 3),
            "housingFundAddition_rate": formatDecimal(housingFundAddition_rate/100, 3)
        },
        "deduction_item": {
            "children_edu": keepTwoDecimalFull(children_edu),
            "old_support": keepTwoDecimalFull(old_support),
            "continuing_edu": keepTwoDecimalFull(continuing_edu),
            "medical": keepTwoDecimalFull(medical),
            "housing_rent": keepTwoDecimalFull(housing_rent),
            "housing_loan": keepTwoDecimalFull(housing_loan)
        }
      })
    })
  }

  handleInput(field, v) {
    this.setStateAsync({
      [field]: v
    })
  }

  handleUpdateCustom(field, v) {
    // let rate_item = Object.assign({}, this.state.rate_item, {[field]: v})
    let {
      rate_item
    } = this.state;
    rate_item[field] = v;
    this.setStateAsync({
      rate_item
    })
    console.log(this.customRef)
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
    const { getFieldProps } = this.props.form;
    const {
      salary,
      base_social_security,
      base_housingFund,
      isCustomVisible, 
      calc_btn,
      rate_item = {},
      social_security_threshold,
      base_housingFund_threshold,
    } = this.state;
    const {
      isShowDiagram,
      deduction_num,
      deduction_item
    } = this.props;
    return(
      <div className="animated-router-forward-enter-done">
        <Flex justify="around">
          <p>51金融圈薪税计算器</p>
          <Flex className="city-name">
            <span className='am-icon'></span>
            <span>当前城市：</span>
            <b onClick={
              this.props.showRegions
            }>{this.props.cityname}</b>
          </Flex>
        </Flex>
        <WingBlank size="lg">
          <Card className='s-card custom-list'>
            <List>
              <Item className='st-title'>
                税前工资（月薪）
              </Item>
              <InputItem 
                {...getFieldProps('salary', {
                  normalize: this.normalizeFun,
                  initialValue: salary
                })}
                className='mid-list-item'
                type='money'
                onVirtualKeyboardConfirm={this.calcRadix}
                clear
                moneyKeyboardAlign="right"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                onChange={this.handleInput.bind(this, 'salary')}
              >¥</InputItem>
            </List>
          </Card>
          <div className="deduct-list custom-list">
            <List>
              <InputItem
                className='mid-list-item'
                {...getFieldProps('base_social_security', {
                  normalize: this.normalizeFun,
                  initialValue: base_social_security
                })}
                type='money'
                clear
                onChange={this.handleInput.bind(this, 'base_social_security')}
                moneyKeyboardAlign="right"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              >
              <span className="st-title">
                社保基数{social_security_threshold && `(${social_security_threshold})`}
              </span>
              </InputItem> 
            </List>
            <List>
              <InputItem
                className='mid-list-item'
                {...getFieldProps('base_social_security', {
                  normalize: this.normalizeFun,
                  initialValue: base_housingFund
                })}
                type='money'
                clear
                onChange={this.handleInput.bind(this, 'base_housingFund')}
                moneyKeyboardAlign="left"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                moneyKeyboardAlign="right"
              >
              <span className="st-title">
              公积金汇缴基数{base_housingFund_threshold && `(${base_housingFund_threshold})`}
              </span>
              </InputItem> 
            </List>
            <List>
              <div className="custom-percent display-list">
                <div className="st-title" onClick={this.handleCustomPercent}>
                  自定义汇缴比例
                  <i className={`${isCustomVisible ? 'arrow-up' : ''}`}></i>
                </div>
                {
                  isCustomVisible && 
                  <Custom 
                    rate_item = {rate_item}
                    handleUpdateCustom = {this.handleUpdateCustom}
                    ref={el=>this.customRef=el}
                  />
                }
                
              </div>
              <Flex
                justify="around"
                className="add-deduct"
                align="start"
              >
                <Button 
                  type="primary"  
                  inline
                  onClick={this.handleCalc}
                >{calc_btn}</Button> 
                <Flex
                  direction="column"
                >
                  <Button 
                    type="primary"
                    inline={true}
                    onClick={this.props.showDeduct}
                  >添加抵扣项&nbsp;+</Button>
                  <Flex.Item>已添加{deduction_num}个项目</Flex.Item>
                </Flex>
              </Flex>
                
            </List>
          </div>
        </WingBlank>
        {isShowDiagram && <Calc />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cityname: state.Regions.cityname,
  represent_data: state.Main.represent_data,
  isShowDiagram: state.Main.isShowDiagram,
  deduction_num: state.Deduct.deduction_num,
  deduction_item: state.Deduct.deduction_item,
})

const mapDispatchToProps = dispatch => ({
  showDeduct: bindActionCreators(Actions.Deduct.showDeduct, dispatch),
  showRegions: bindActionCreators(Actions.Regions.showRegions, dispatch),
  taxCalc: bindActionCreators(Actions.Main.taxCalc, dispatch),
})

Main = createForm()(Main)
export default connect(mapStateToProps, mapDispatchToProps)(Main);

