import React, {Component} from 'react';
import { NavBar, Icon, Flex, List, WingBlank, Card, InputItem, Button, Checkbox, Piker } from 'antd-mobile';
import {createForm} from 'rc-form';
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
  render() {
    const { getFieldProps } = this.props.form;
    // console.log(getFieldProps)
    return(
      <div>
        <NavBar
          className="nav-bar"
          mode="light"
          icon={<Icon type="left" />}
        >薪税计算器</NavBar>
        <Flex justify="around">
          <p>51金融圈薪税计算器</p>
          <div>
            <Flex>
              <span className='am-icon'></span>
              <span>当前城市</span>
              <a href="#">上海</a>
            </Flex>
          </div>
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
                moneyKeyboardWrapProps = {moneyKeyboardWrapProps}
              >￥</InputItem>
            </List>
            
            <List>
              <Item className='st-title'>
                税后工资（2018.10.01新税法）
              </Item>
              <Item 
                className='mid-list-item'
                extra={"计算后的工资"}
              >￥</Item>
            </List>
            <List>
              <Button 
                className='calc-btn'
                type="primary"  inline>计算</Button>
            </List>
          </Card>
          <div className="deduct-list custom-list">
            <List>
              <Item className='st-title'>
                社保基数
              </Item>
              <Item
                extra={
                  <CheckboxItem key="social_base" className="rt-checkbox">
                    自定义
                  </CheckboxItem>
                }
                className='mid-list-item'
              >
                社保初始数值
              </Item> 
            </List>
            <List>
              <Item className='st-title'>
                社保基数
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
            </List>
            <List>
              <Piker>
                <CheckboxItem key="smt_housing_fund">
                  汇缴补充公积金
                </CheckboxItem>
              </Piker>
                
            </List>
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default createForm()(Main);

