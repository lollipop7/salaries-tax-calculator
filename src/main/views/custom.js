import React, {Component} from 'react';
import { Flex, List } from 'antd-mobile';
import {createForm} from 'rc-form';
import {fomatFloat} from '../../utils/tool';
import InputBlock from './input-block';

const Item = List.Item;


class Custom extends Component {
  constructor(props) {
    super(props);
    this.handleResetData = this.handleResetData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.state = {
    //   p_pension_rate: 8,  //社保缴费比例（个人）
    //   p_medical_rate: 2,  //医保缴费比例（个人）
    //   p_unemployed_rate:  0.5,  //失业缴费比例（个人）
    //   p_injury_rate: 0, //工伤缴费比例（个人）
    //   p_childbearing_rate: 0, //生育缴费比例（个人）
    //   c_pension_rate: 20, //社保缴费比例（单位）
    //   c_medical_rate: 9.5,  //医保缴费比例（单位）
    //   c_unemployed_rate: 0.5,   //失业缴费比例（单位）
    //   c_injury_rate: 8, //工伤缴费比例（单位）
    //   c_childbearing_rate: 8, //生育缴费比例（单位）
    //   housingFund_rate: 7,  //公积金缴费比例
    //   housingFundAddition_rate: 0,  //汇缴补充公积金比例
    // }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  handleResetData(){
    console.log(this.props.form)
  }

  handleChange(field, v){
    const {
      handleUpdateCustom
    } = this.props;
    handleUpdateCustom(field, v)
  }

  render() {
    const { getFieldProps } = this.props.form;
    const {rate_item} = this.props;
    const {
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
              <InputBlock
                itemname={'p_pension_rate'}
                getFieldProps={getFieldProps}
                value={p_pension_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'c_pension_rate'}
                getFieldProps={getFieldProps}
                value={c_pension_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>医保保险金</Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'p_medical_rate'}
                getFieldProps={getFieldProps}
                value={p_medical_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'c_medical_rate'}
                getFieldProps={getFieldProps}
                value={c_medical_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>失业保险金</Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'p_unemployed_rate'}
                getFieldProps={getFieldProps}
                value={p_unemployed_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'c_unemployed_rate'}
                getFieldProps={getFieldProps}
                value={c_unemployed_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>住房公积金</Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'housingFund_rate'}
                getFieldProps={getFieldProps}
                value={housingFund_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'housingFund_rate'}
                getFieldProps={getFieldProps}
                value={housingFund_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>补充公积金</Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'housingFundAddition_rate'}
                getFieldProps={getFieldProps}
                value={0}
                isEditable={false}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'housingFundAddition_rate'}
                getFieldProps={getFieldProps}
                value={housingFundAddition_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>工伤保险金</Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'p_injury_rate'}
                getFieldProps={getFieldProps}
                value={0}
                isEditable={false}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'c_injury_rate'}
                getFieldProps={getFieldProps}
                value={c_injury_rate}
                handleChange={this.handleChange}
              />
            </Flex.Item>
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Flex.Item>生育保险金</Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'p_childbearing_rate'}
                getFieldProps={getFieldProps}
                value={0}
                isEditable={false}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                itemname={'c_childbearing_rate'}
                getFieldProps={getFieldProps}
                value={c_childbearing_rate}
                handleChange={this.handleChange}
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
