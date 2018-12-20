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
                })}
                className='mid-list-item'
                placeholder="10000.00"
                type='money'
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clear
                moneyKeyboardAlign="right"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                onChange={v=>console.log(v)}
              >¥</InputItem>
            </List>
            {/* 
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
            </List> */}
            <List>
              <Button 
                className='calc-btn'
                type="primary"  inline>计算</Button>  
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
                extra={
                  <CheckboxItem key="social_base" className="rt-checkbox">
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
                extra={
                  <CheckboxItem key="housing_fund" className="rt-checkbox">
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
                  <div className="st-title">
                    自定义汇缴比例
                    <span className="am-icon"></span>
                  </div>
                  <Item className="custom-header">
                    <Flex>
                      <Flex.Item></Flex.Item><Flex.Item>个人部分</Flex.Item><Flex.Item>单位部分</Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item>养老保险金</Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('p_pension_rate')}
                          extra={'%'}
                          defaultValue={8}
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_pension_rate')}
                          extra={'%'}
                          defaultValue={20}
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item>医保保险金</Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('p_medical_rate')}
                          extra={'%'}
                          defaultValue={2}
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_medical_rate')}
                          extra={'%'}
                          defaultValue={9.5}
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item>失业保险金</Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('p_unemployed_rate')}
                          extra={'%'}
                          defaultValue={0.5}
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_unemployed_rate')}
                          extra={'%'}
                          defaultValue={0.5}
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item>住房公积金</Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('housingFund_rate')}
                          extra={'%'}
                          defaultValue={0.5}
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('housingFund_rate')}
                          extra={'%'}
                          defaultValue={0.5}
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item>补充公积金</Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('housingFundAddition_rate')}
                          extra={'%'}
                          defaultValue={0}
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('housingFundAddition_rate')}
                          extra={'%'}
                          defaultValue={0}
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item>工伤保险金</Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('p_injury_rate')}
                          extra={'%'}
                          defaultValue={0}
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_injury_rate')}
                          extra={'%'}
                          defaultValue={8}
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
                  <Item>
                    <Flex>
                      <Flex.Item>生育保险金</Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_childbearing_rate')}
                          extra={'%'}
                          defaultValue={0}
                        />
                      </Flex.Item>
                      <Flex.Item>
                        <InputItem
                          {...getFieldProps('c_childbearing_rate')}
                          extra={'%'}
                          defaultValue={8}
                        />
                      </Flex.Item>
                    </Flex>
                  </Item>
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

