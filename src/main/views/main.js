import React, {Component} from 'react';
import { NavBar, Icon, Flex, List, WingBlank, Card, InputItem, Button, Checkbox, Picker } from 'antd-mobile';
import {createForm} from 'rc-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../Actions';
import supplySelData from '../../data/supply-housing-fund';
import './style.scss'; 
import Custom from './custom';
import {keepTwoDecimalFull} from '../../utils/tool';

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
    this.handleInput = this.handleInput.bind(this);
    this.handleUpdateCustom = this.handleUpdateCustom.bind(this);
    this.state = {
      isCustomVisible: true,
      calc_btn: '计算',
      calc_num: 1,
      supplyValue: ['8%'],
      salary: 10000.00,                   //税前月薪
      tax_threshold: 5000.0,              //起征点
      base_social_security: 4200.0,       //社保基数
      base_housingFund: 4200.0,           //公积金汇缴基数
      
      children_edu: 1000.0,               //子女教育
      old_support: 0.0,                   //赡养老人
      continuing_edu: 0.0,                //继续教育
      medical: 0.0,                       //大病医疗
      housing_rent: 0.0,                  //住房租金
      housing_loan: 0.0,                  //房贷利息
      isSocialBaseCustom: false,
      isHousingFundCustom: false,
      //
      p_pension_rate: 8,  //社保缴费比例（个人）
      p_medical_rate: 2,  //医保缴费比例（个人）
      p_unemployed_rate:  0.5,  //失业缴费比例（个人）
      p_injury_rate: 0, //工伤缴费比例（个人）
      p_childbearing_rate: 0, //生育缴费比例（个人）
      c_pension_rate: 20, //社保缴费比例（单位）
      c_medical_rate: 9.5,  //医保缴费比例（单位）
      c_unemployed_rate: 0.5,   //失业缴费比例（单位）
      c_injury_rate: 8, //工伤缴费比例（单位）
      c_childbearing_rate: 8, //生育缴费比例（单位）
      housingFund_rate: 7,  //公积金缴费比例
      housingFundAddition_rate: 0,  //汇缴补充公积金比例
    }
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
      children_edu,
      old_support,
      continuing_edu,
      medical,
      housing_rent,
      housing_loan,
      p_pension_rate,
      p_medical_rate,
      p_unemployed_rate,
      p_injury_rate,
      p_childbearing_rate,
      c_pension_rate,
      c_medical_rate,
      c_unemployed_rate,
      c_injury_rate,
      c_childbearing_rate,
      housingFund_rate,
      housingFundAddition_rate
    } = this.state;
    
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
            "p_pension_rate": keepTwoDecimalFull(p_pension_rate),
            "p_medical_rate": keepTwoDecimalFull(p_medical_rate),
            "p_injury_rate": keepTwoDecimalFull(p_injury_rate),
            "p_unemployed_rate": keepTwoDecimalFull(p_unemployed_rate),
            "p_childbearing_rate": keepTwoDecimalFull(p_childbearing_rate),
            "c_pension_rate": keepTwoDecimalFull(c_pension_rate),
            "c_medical_rate": keepTwoDecimalFull(c_medical_rate),
            "c_injury_rate": keepTwoDecimalFull(c_injury_rate),
            "c_unemployed_rate": keepTwoDecimalFull(c_unemployed_rate),
            "c_childbearing_rate": keepTwoDecimalFull(c_childbearing_rate),
            "housingFund_rate": keepTwoDecimalFull(housingFund_rate),
            "housingFundAddition_rate": keepTwoDecimalFull(housingFundAddition_rate)
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

  handleInput(v) {
    this.setStateAsync()
  }

  handleEdit(field, v) {
    this.setStateAsync({
      [field]: !v
    })
  }

  handleUpdateCustom(field, v) {
    this.setStateAsync({
      [field]: v
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const {
      isCustomVisible, 
      calc_btn,
      isSocialBaseCustom,
      isHousingFundCustom,
    } = this.state;
    return(
      <div>
        <NavBar
          className="nav-bar"
          mode="light"
          icon={<Icon type="left" />}
        >薪税计算器</NavBar>
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
                  normalize: (v, prev) => {
                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                      if (v === '.') {
                        return '0.';
                      }
                      return prev;
                    }
                    return v;
                  },
                  onChange: this.handleInput,
                  initialValue: this.state.salary
                })}
                className='mid-list-item'
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                moneyKeyboardAlign="right"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                ref={el => this.salaryRef = el}
              >¥</InputItem>
            </List>
            <List>
              <Button 
                className='calc-btn'
                type="primary"  
                inline
                onClick={this.handleCalc}
              >{calc_btn}</Button>  
            </List>
          </Card>
          <div className="deduct-list custom-list">
            <List>
              <Item className='st-title'>
                社保基数{true && '（下限）'}
              </Item>
              <InputItem
                className='mid-list-item'
                defaultValue={4279}
                editable={isSocialBaseCustom}
                extra={
                  <CheckboxItem 
                    key="social_base" 
                    className="rt-checkbox"
                    onChange={this.handleEdit.bind(this, 'isSocialBaseCustom', isSocialBaseCustom)}
                  >
                    自定义
                  </CheckboxItem>
                }
              >
              </InputItem> 
            </List>
            <List>
              <Item className='st-title'>
              公积金汇缴基数
              </Item>
              <InputItem
                className='mid-list-item'
                defaultValue={7000}
                editable={isHousingFundCustom}
                extra={
                  <CheckboxItem 
                    key="housing_fund" 
                    className="rt-checkbox"
                    onChange={this.handleEdit.bind(this, 'isHousingFundCustom', isHousingFundCustom)}
                  >
                    自定义
                  </CheckboxItem>
              }
              >
              </InputItem> 
            </List>
            <List>
              {
                true && 
                <div className="custom-percent display-list">
                  <div className="st-title" onClick={this.handleCustomPercent}>
                    自定义汇缴比例
                    <i className={`${isCustomVisible ? 'arrow-up' : ''}`}></i>
                  </div>
                  {
                    isCustomVisible && 
                    <Custom 
                      rate_item = {this.state}
                      handleUpdateCustom = {this.handleUpdateCustom}
                    />
                  }
                  
                </div>
              }
              <Flex
                direction="column"
                className="add-deduct"
              >
                <Button 
                  type="primary"
                  inline={true}
                  onClick={this.props.showDeduct}
                >添加抵扣项&nbsp;+</Button>
                <Flex.Item>已添加{3}个项目</Flex.Item>
              </Flex>
                
            </List>
          </div>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cityname: state.Regions.cityname,
  represent_data: state.Main.represent_data
})

const mapDispatchToProps = dispatch => ({
  showDeduct: bindActionCreators(Actions.Deduct.showDeduct, dispatch),
  showRegions: bindActionCreators(Actions.Regions.showRegions, dispatch),
  taxCalc: bindActionCreators(Actions.Main.taxCalc, dispatch),
})

Main = createForm()(Main)
export default connect(mapStateToProps, mapDispatchToProps)(Main);

