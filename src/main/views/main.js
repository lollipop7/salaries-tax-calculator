import React, {Component} from 'react';
import { NavBar, Icon, Flex, List, WingBlank, Card, InputItem, Button, Checkbox } from 'antd-mobile';
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
          <Card className='s-card'>
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
                extra={"计算后的工资"}
              >￥</Item>
            </List>
            <List>
              <Button 
                className='calc-btn'
                type="primary"  inline>计算</Button>
            </List>
          </Card>
          <div className="deduct-list">
            <List>
              <Item className='st-title'>
                社保基数
              </Item>
              <Item
                extra={
                  <CheckboxItem key="social_base" className="st-checkbox">
                    自定义
                  </CheckboxItem>
              }
              >
                
                社保/公积金初始数值显示当前城市的下限值
              </Item> 
            </List>
            
               
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default createForm()(Main);

