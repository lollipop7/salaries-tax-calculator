import React, {Component} from 'react';
import {List, WingBlank, WhiteSpace, Flex, Card} from 'antd-mobile';
import echarts from 'echarts/lib/echarts'; 
import {Chart as PieChart} from './pie-chart';
import {salaryPieOption} from '../optionConfig/salaryPieOptions.js';
import {costPieOption} from '../optionConfig/costPieOptions.js';
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
                  <Flex.Item> 养老保险金</Flex.Item>
                  <Flex.Item>
                    <span>800.00</span>
                    <span className="percent-item">(8%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>2000.00</span>
                    <span className="percent-item">(20%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 医疗保险金</Flex.Item>
                  <Flex.Item>
                    <span>200.00</span>
                    <span className="percent-item">(2%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>950.00</span>
                    <span className="percent-item">(9.5%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 失业保险金</Flex.Item>
                  <Flex.Item>
                    <span>50.00</span>
                    <span className="percent-item">(0.5%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>50.00</span>
                    <span className="percent-item">(0.5%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item>住房公积金</Flex.Item>
                  <Flex.Item>
                    <span>700.00</span>
                    <span className="percent-item">(7%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>700.00</span>
                    <span className="percent-item">(7%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 补充公积金</Flex.Item>
                  <Flex.Item>
                    <span>0.00</span>
                    <span className="percent-item">(0%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>0.00</span>
                    <span className="percent-item">(0%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 工伤保险金</Flex.Item>
                  <Flex.Item></Flex.Item>
                  <Flex.Item>
                    <span>2000.00</span>
                    <span className="percent-item">(8%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 生育保险金</Flex.Item>
                  <Flex.Item></Flex.Item>
                  <Flex.Item>
                    <span>2000.00</span>
                    <span className="percent-item">(8%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 共计支出</Flex.Item>
                  <Flex.Item>
                    <span className="st-title">1750.00</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span className="st-title">3820.00</span>
                  </Flex.Item>
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
                  <Flex.Item> 应税工资</Flex.Item>
                  <Flex.Item>8250.00 <span className="st-title under-line">(0个抵扣项)</span></Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 个人所得税</Flex.Item><Flex.Item>115.00</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 税后工资</Flex.Item>
                  <Flex.Item><span className="st-title">8135.00</span></Flex.Item>
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
            <Card.Body className='salary-pie'>
              <PieChart option={salaryPieOption}></PieChart>
            </Card.Body>
          </Card>
        </WingBlank>
        <WhiteSpace size="lg"></WhiteSpace>
        <WingBlank size="lg">
          <Card full={true}>
            <Card.Header
              title="企业用工成本构成"
            />
            <Card.Body className='cost-pie'>
              <PieChart option={costPieOption}></PieChart>
            </Card.Body>
          </Card>
        </WingBlank>
      </div>
    )
  }
}

export default Calc;
