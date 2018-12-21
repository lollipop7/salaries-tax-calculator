import React, {Component} from 'react';
import { Flex, List, InputItem } from 'antd-mobile';
import {createForm} from 'rc-form';

const Item = List.Item;

class Custom extends Component {
  constructor(props) {
    super(props);
    this.handleResetData = this.handleResetData.bind(this);
    this.state = {
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

  handleResetData(){
    this.props.form.resetFields()
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
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
                {...getFieldProps('p_pension_rate', {
                  initialValue: this.state.p_pension_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('c_pension_rate', {
                  initialValue: this.state.c_pension_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>医保保险金</Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('p_medical_rate', {
                  initialValue: this.state.p_medical_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('c_medical_rate', {
                  initialValue: this.state.c_medical_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>失业保险金</Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('p_unemployed_rate', {
                  initialValue: this.state.p_unemployed_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('c_unemployed_rate', {
                  initialValue: this.state.c_unemployed_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>住房公积金</Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('housingFund_rate', {
                  initialValue: this.state.housingFund_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('housingFund_rate', {
                  initialValue: this.state.housingFund_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>补充公积金</Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('housingFundAddition_rate', {
                  initialValue: this.state.housingFundAddition_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('housingFundAddition_rate', {
                  initialValue: this.state.housingFundAddition_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>工伤保险金</Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('p_injury_rate', {
                  initialValue: this.state.p_injury_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('c_injury_rate', {
                  initialValue: this.state.c_injury_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>生育保险金</Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('p_childbearing_rate', {
                  initialValue: this.state.p_childbearing_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
            <Flex.Item>
              <InputItem
                {...getFieldProps('c_childbearing_rate', {
                  initialValue: this.state.c_childbearing_rate
                })}
                extra={'%'}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item className="reset-data">
          <div  onClick={this.handleResetData}
          >还原默认值</div>
        </Item>
      </div>
    )
  }
}

Custom = createForm()(Custom);
export default Custom;
