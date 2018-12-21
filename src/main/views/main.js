import React, {Component} from 'react';
import { NavBar, Icon, Flex, List, WingBlank, Card, InputItem, Button, Checkbox, Picker } from 'antd-mobile';
import {createForm} from 'rc-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../Actions';
import supplySelData from '../../data/supply-housing-fund';
import './style.scss'; 
import Custom from './custom';

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
    this.state = {
      isCustomVisible: true,
      calc_btn: '计算',
      calc_num: 1,
      supplyValue: ['8%'],
      salary: 10000.00,
      isSocialBaseCustom: false,
      isHousingFundCustom: false
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
    let {isReCalc, calc_num} = this.state;
    this.setStateAsync({
      calc_num: calc_num ++
    }).then(() => {
      if(calc_num > 1) {
        this.setStateAsync({
          calc_btn: '重新计算'
        })
      }
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

  render() {
    const { getFieldProps } = this.props.form;
    const {
      isCustomVisible, 
      calc_btn,
      isSocialBaseCustom,
      isHousingFundCustom
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
              {/* <Picker
                title="补充公积金比例"
                data={supplySelData}
                cols={1}
                value={this.state.supplyValue}
                onChange={v=>console.log(v)}
              >
                <CheckboxItem 
                  className="lt-checkbox"
                  key="smt_housing_fund"
                  arrow="down"
                >
                  汇缴补充公积金
                </CheckboxItem>
              </Picker> */}
              {
                true && 
                <div className="custom-percent">
                  <div className="st-title" onClick={this.handleCustomPercent}>
                    自定义汇缴比例
                    <i className={`${isCustomVisible ? 'arrow-up' : ''}`}></i>
                  </div>
                  {
                    isCustomVisible && 
                    <Custom />
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
  cityname: state.Regions.cityname
})

const mapDispatchToProps = dispatch => ({
  showDeduct: bindActionCreators(Actions.Deduct.showDeduct, dispatch),
  showRegions: bindActionCreators(Actions.Regions.showRegions, dispatch),
})

Main = createForm()(Main)
export default connect(mapStateToProps, mapDispatchToProps)(Main);

