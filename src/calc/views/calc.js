import React, {Component} from 'react';
import {List, WingBlank, WhiteSpace, Flex, Card} from 'antd-mobile';
import echarts from 'echarts/lib/echarts'; 
import {Chart as SalaryPie} from './salary-pie';
import {salaryPieOption} from '../optionConfig/options.js';
import './style.scss'; 
const Item = List.Item;
const Brief = Item.Brief;



class Calc extends Component {
  
  render (){
    return (
      <div>
        <WhiteSpace size="lg"></WhiteSpace>
        <WingBlank size="lg">
          <div className='calc-list'>
            <List renderHeader={() => '五险一金汇缴明细'}>
              <Item>
                <Flex>
                  <Flex.Item></Flex.Item><Flex.Item>个人部分</Flex.Item><Flex.Item>单位部分</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 养老保险金</Flex.Item><Flex.Item>800.00 (8%)</Flex.Item><Flex.Item>2000.00 (20%)</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 医疗保险金</Flex.Item><Flex.Item>200.00 (2%)</Flex.Item><Flex.Item>950.00 (9.5%)</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 失业保险金</Flex.Item><Flex.Item>50.00 (0.5%)</Flex.Item><Flex.Item>50.00 (0.5%)</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 住房公积金</Flex.Item><Flex.Item>700.00 (7%)</Flex.Item><Flex.Item>700.00 (7%)</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 补充公积金</Flex.Item><Flex.Item>0.00 (0%)</Flex.Item><Flex.Item>0.00 (0%)</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 工伤保险金</Flex.Item><Flex.Item></Flex.Item><Flex.Item>2000.00 (8%)</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 生育保险金</Flex.Item><Flex.Item></Flex.Item><Flex.Item>2000.00 (8%)</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 共计支出</Flex.Item><Flex.Item>1750.00</Flex.Item><Flex.Item>3820.00</Flex.Item>
                </Flex>
              </Item>
            </List>
            
          </div>
        </WingBlank>

        <WhiteSpace size="lg"></WhiteSpace>
        <WingBlank size="lg">
          <div className="calc-list">
            <List renderHeader={() => '个税缴纳明细'}>
              <Item>
                <Flex>
                  <Flex.Item> 应税工资</Flex.Item><Flex.Item>8250.00 (0个抵扣项)</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 个人所得税</Flex.Item><Flex.Item>115.00</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 税后工资</Flex.Item><Flex.Item>8135.00</Flex.Item>
                </Flex>
              </Item>
            </List>
          </div>
        </WingBlank>

        <WhiteSpace size="lg"></WhiteSpace>
        <WingBlank size="lg">
          <Card full={true}>
            <Card.Header
              title="工资构成"
            />
            <Card.Body className='pie-wrap'>
              <SalaryPie option={salaryPieOption}></SalaryPie>
            </Card.Body>
          </Card>
        </WingBlank>
      </div>
    )
  }
}

export default Calc;
