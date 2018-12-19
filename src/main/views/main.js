import React, {Component} from 'react';
import { NavBar, Icon, Flex, List, WingBlank, Card, InputItem, Button, Checkbox, Picker } from 'antd-mobile';
import {createForm} from 'rc-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../Actions';
import supplySelData from '../../data/supply-housing-fund';
import './style.scss'; 

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
    this.state = {
      supplyValue: ['8%']
    }
  }
  render() {
    const { getFieldProps } = this.props.form;
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
                })}
                className='mid-list-item'
                placeholder="10000.00"
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                moneyKeyboardAlign="right"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              >税前工资（月薪）</InputItem>
            </List>
            <List>
              <InputItem 
                {...getFieldProps('tax_threshold', {
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
                className='mid-list-item'
                placeholder="10000.00"
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                moneyKeyboardAlign="right"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              >起征点（月薪）</InputItem>
            </List>
            <List>
              <InputItem 
                {...getFieldProps('base_social_security', {
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
                className='mid-list-item'
                placeholder="4279-21396元"
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                moneyKeyboardAlign="right"
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
              >社保基数</InputItem>
            </List>
            <List>
              <InputItem 
                {...getFieldProps('base_housingFund', {
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
                className='mid-list-item'
                placeholder="4279-21396元"
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                moneyKeyboardAlign="right"
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
              >公积金汇缴基数</InputItem>
            </List>
            {
              true && 
              <List>
                <Item>
                  <Flex>
                    <Flex.Item></Flex.Item><Flex.Item>个人部分</Flex.Item><Flex.Item>单位部分</Flex.Item>
                  </Flex>
                </Item>
                <div className="percent-list">
                  <Item>
                    <Flex>
                      <Flex.Item><span className="st-title">社保缴费比例</span></Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('p_pension_rate')}
                          placeholder="8%"
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_pension_rate')}
                          placeholder="20%"
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item><span className="st-title">医保缴费比例</span></Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('p_medical_rate')}
                          placeholder="2%"
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_medical_rate')}
                          placeholder="9.5%"
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item><span className="st-title">失业缴费比例</span></Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('p_unemployed_rate')}
                          placeholder="0.5%"
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_unemployed_rate')}
                          placeholder="0.5%"
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item><span className="st-title">工伤缴费比例</span></Flex.Item>
                      <Flex.Item></Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_injury_rate')}
                          placeholder="0.2-1.9%"
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item><span className="st-title">生育缴费比例</span></Flex.Item>
                      <Flex.Item></Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_childbearing_rate')}
                          placeholder="1%"
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                </div>
              </List>
            }
            {/* <List>
              <Item className='st-title'>
                税后工资（2018.10.01新税法）
              </Item>
              <Item 
                className='mid-list-item'
                extra={"计算后的工资"}
              >￥</Item>
            </List> */}
            <List>
              <Button 
                className='others-btn'
                type="primary"  inline>更多</Button>
            </List>
          </Card>
          <div className="deduct-list custom-list">
            {/* <List>
              <Item className='st-title'>
                社保基数
              </Item>
              <Item
                className='mid-list-item'
                extra={
                  <CheckboxItem key="social_base" className="rt-checkbox">
                    自定义
                  </CheckboxItem>
                }
              >
                社保初始数值
              </Item> 
            </List>
            <List>
              <Item className='st-title'>
              公积金汇缴基数
              </Item>
              <Item
                className='mid-list-item'
                extra={
                  <CheckboxItem key="housing_fund" className="rt-checkbox">
                    自定义
                  </CheckboxItem>
              }
              >
                公积金初始数值
              </Item> 
            </List> */}
            <List>
              <Picker
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
              </Picker>
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

