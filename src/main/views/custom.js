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
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  handleResetData(){
    const {
      resetFields
    } = this.props.form;
    resetFields()
  }

  handleChange(field, v){
    const {
      handleUpdateCustom
    } = this.props;
    handleUpdateCustom(field, v)
  }

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const {rate_item} = this.props;
    
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
                rate_item={rate_item}
                itemname={'p_pension_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                rate_item={rate_item}
                itemname={'c_pension_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
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
                rate_item={rate_item}
                itemname={'p_medical_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
              rate_item={rate_item}Ï
                itemname={'c_medical_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
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
                rate_item={rate_item}
                itemname={'p_unemployed_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                rate_item={rate_item}
                itemname={'c_unemployed_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
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
                rate_item={rate_item}
                itemname={'housingFund_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                rate_item={rate_item}
                itemname={'housingFund_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
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
                rate_item={rate_item}
                itemname={'housingFundAddition_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                rate_item={rate_item}
                itemname={'housingFundAddition_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
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
                rate_item={rate_item}
                itemname={'p_injury_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                isEditable={false}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                rate_item={rate_item}
                itemname={'c_injury_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
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
                rate_item={rate_item}
                itemname={'p_childbearing_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                isEditable={false}
                handleChange={this.handleChange}
              />
            </Flex.Item>
            <Flex.Item>
              <InputBlock
                rate_item={rate_item}
                itemname={'c_childbearing_rate'}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                handleChange={this.handleChange}
              />
            </Flex.Item>
          </Flex>
        </Item>
        {/* <Item className="reset-data">
          <div  onClick={this.handleResetData}
          >还原默认值</div>
        </Item> */}
      </div>
    )
  }
}

Custom = createForm()(Custom);
export default Custom;
