import React, {Component} from 'react';
import {List, WingBlank, WhiteSpace, Flex, Card} from 'antd-mobile';
import echarts from 'echarts/lib/echarts'; 
import {Chart as PieChart} from './pie-chart';
import {salaryPieOption} from '../optionConfig/salaryPieOptions.js';
import {costPieOption} from '../optionConfig/costPieOptions.js';
import './style.scss'; 

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../Actions';

const Item = List.Item;
const Brief = Item.Brief;



class Calc extends Component {

  constructor(props) {
    super(props);
    this.handlePersonItem = this.handlePersonItem.bind(this);
    this.state = {
      isPersonVisible: false
    }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  handlePersonItem() {
    const { isPersonVisible } = this.state;
    this.setStateAsync({isPersonVisible: !isPersonVisible})
  }
  
  render (){
    const {
      isPersonVisible
    } = this.state;
    const {
      represent_data
    } = this.props;
    console.log(represent_data)
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
            <List>
              <Item className="am-list-header">税后工资明细 <a href="javascript:void(0)"  className="st-title under-line">（3个抵扣项）</a></Item>
              <Item>
                <Flex>
                  <Flex.Item>月份</Flex.Item>
                  <Flex.Item>个人所得税</Flex.Item>
                  <Flex.Item>税后工资</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 一月</Flex.Item>
                  <Flex.Item> </Flex.Item>
                  <Flex.Item> </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 二月</Flex.Item>
                  <Flex.Item> </Flex.Item>
                  <Flex.Item> </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 三月</Flex.Item>
                  <Flex.Item> </Flex.Item>
                  <Flex.Item> </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 四月</Flex.Item>
                  <Flex.Item> </Flex.Item>
                  <Flex.Item> </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 五月</Flex.Item>
                  <Flex.Item> </Flex.Item>
                  <Flex.Item> </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 六月</Flex.Item>
                  <Flex.Item> </Flex.Item>
                  <Flex.Item> </Flex.Item>
                </Flex>
              </Item>
              {
                isPersonVisible && 
                  <div>
                    <Item>
                      <Flex>
                        <Flex.Item> 七月</Flex.Item>
                        <Flex.Item> </Flex.Item>
                        <Flex.Item> </Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 八月</Flex.Item>
                        <Flex.Item> </Flex.Item>
                        <Flex.Item> </Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 九月</Flex.Item>
                        <Flex.Item> </Flex.Item>
                        <Flex.Item> </Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 十月</Flex.Item>
                        <Flex.Item> </Flex.Item>
                        <Flex.Item> </Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 十一月</Flex.Item>
                        <Flex.Item> </Flex.Item>
                        <Flex.Item> </Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 十二月</Flex.Item>
                        <Flex.Item> </Flex.Item>
                        <Flex.Item> </Flex.Item>
                      </Flex>
                    </Item>
                  </div>
              }
              <div className="display-list">
                <div className="st-title" onClick={this.handlePersonItem}>
                  {isPersonVisible ? '收起' : '显示全部'}
                  <i className={`${isPersonVisible ? 'arrow-up' : ''}`}></i>
                </div>
              </div>
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

const mapStateToProps = state => ({
  represent_data: state.Main.represent_data
})


export default connect(mapStateToProps, null)(Calc);
