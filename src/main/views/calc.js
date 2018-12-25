import React, {Component} from 'react';
import {List, WingBlank, WhiteSpace, Flex, Card} from 'antd-mobile';
import echarts from 'echarts/lib/echarts'; 
import {Chart as PieChart} from './pie-chart';
import {salaryPieOption} from '../optionConfig/salaryPieOptions.js';
import {costPieOption} from '../optionConfig/costPieOptions.js';
import represent_data from '../../data/response.js';
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
    // const {
    //   represent_data
    // } = this.props;
    // console.log(represent_data)
    console.log(represent_data);
    const {
      person_wxyj_item = {},  //个人五险一金明细
      company_wxyj_item = {}, //企业五险一金明细
      person_income_item = {},  //个人收入（月）占比
      company_cost_item = {},   //企业总成本（月）占比
      tax_list = [],  //纳税明细
      salary_after_tax_avg, //税后工资
      salary, //税前月薪
    } = represent_data;
    const  {
      pr_salary_after_tax,  //税后工资占比
      pr_pension,  //养老保险占比
      pr_medical,   //医疗保险占比
      pr_unemployed,  //失业保险占比
      pr_housingfund,   //住房公积金占比
      pr_housingfund_add,   //补充公积金占比
    } = person_income_item;
    
    const salarySeries = {
      data: [
        {value: pr_salary_after_tax, name:'税后工资'},
        {value: pr_pension, name:'养老保险'},
        {value: pr_medical, name:'医疗保险'},
        {value: pr_unemployed, name:'失业保险'},
        {value: pr_housingfund, name:'住房公积金'},
        {value: pr_housingfund_add, name:'补充公积金'},
        {value: salary_after_tax_avg / salary, name:'个人所得税'},
      ]
    };
    const {
      cr_salary,  //工资(个人)占比
      cr_pension,   //养老保险(企业)占比
      cr_medical,   //医疗保险(企业)占比
      cr_unemployed,    //失业保险(企业)占比
      cr_injury,    //工伤保险(企业)占比
      cr_childbearing,    //生育保险(企业)占比
      cr_housingfund,   //住房公积金(企业)占比
      cr_housingfund_add,   //补充公积金(企业)占比
    } = company_cost_item;

    const costSeries = {
      data:[ //系列中的数据内容数组
        {value: cr_salary, name:'养老保险（企业）'},
        {value: cr_pension, name:'养老保险（企业）'},
        {value: cr_medical, name:'医疗保险（企业）'},
        {value: cr_unemployed, name:'失业保险（企业）'},
        {value: cr_injury, name:'工伤保险（企业）'},
        {value: cr_childbearing, name:'生育保险（企业）'},
        {value: cr_housingfund, name:'住房公积金（企业）'},
        {value: cr_housingfund_add, name:'补充公积金（企业）'},
      ]
    }
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
                    <span>{person_wxyj_item.p_pension}</span>
                    <span className="percent-item">({pr_pension}%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>{company_wxyj_item.c_pension}</span>
                    <span className="percent-item">({cr_pension}%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 医疗保险金</Flex.Item>
                  <Flex.Item>
                    <span>{person_wxyj_item.p_medical}</span>
                    <span className="percent-item">({pr_medical}%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>{company_wxyj_item.c_medical}</span>
                    <span className="percent-item">({cr_medical}%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 失业保险金</Flex.Item>
                  <Flex.Item>
                    <span>{person_wxyj_item.p_unemployed}</span>
                    <span className="percent-item">({pr_unemployed})</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>{company_wxyj_item.c_unemployed}</span>
                    <span className="percent-item">({cr_unemployed}%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item>住房公积金</Flex.Item>
                  <Flex.Item>
                    <span>{person_wxyj_item.p_housingfund}</span>
                    <span className="percent-item">({pr_housingfund})</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>{company_wxyj_item.c_housingfund}</span>
                    <span className="percent-item">({cr_housingfund}%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 补充公积金</Flex.Item>
                  <Flex.Item>
                    <span>{person_wxyj_item.p_housingfund_add}</span>
                    <span className="percent-item">({pr_housingfund_add})</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>{company_wxyj_item.c_housingfund_add}</span>
                    <span className="percent-item">({cr_housingfund_add}%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 工伤保险金</Flex.Item>
                  <Flex.Item>
                    <span>{person_wxyj_item.p_injury}</span>
                    <span className="percent-item">(0%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>{company_wxyj_item.c_injury}</span>
                    <span className="percent-item">({cr_injury}%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 生育保险金</Flex.Item>
                  <Flex.Item>
                    <span>{person_wxyj_item.p_childbearing}</span>
                    <span className="percent-item">(0%)</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span>{company_wxyj_item.c_childbearing}</span>
                    <span className="percent-item">({cr_childbearing}%)</span>
                  </Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 共计支出</Flex.Item>
                  <Flex.Item>
                    <span className="st-title">{person_wxyj_item.p_wxyj_pay_count}</span>
                  </Flex.Item>
                  <Flex.Item>
                    <span className="st-title">{company_wxyj_item.c_wxyj_pay_count}</span>
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
                  <Flex.Item>{tax_list[0].tax}</Flex.Item>
                  <Flex.Item>{tax_list[0].salary_after_tax}</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 二月</Flex.Item>
                  <Flex.Item>{tax_list[1].tax}</Flex.Item>
                  <Flex.Item>{tax_list[1].salary_after_tax}</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 三月</Flex.Item>
                  <Flex.Item>{tax_list[2].tax}</Flex.Item>
                  <Flex.Item>{tax_list[2].salary_after_tax}</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 四月</Flex.Item>
                  <Flex.Item>{tax_list[3].tax}</Flex.Item>
                  <Flex.Item>{tax_list[3].salary_after_tax}</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 五月</Flex.Item>
                  <Flex.Item>{tax_list[4].tax}</Flex.Item>
                  <Flex.Item>{tax_list[4].salary_after_tax}</Flex.Item>
                </Flex>
              </Item>
              <Item>
                <Flex>
                  <Flex.Item> 六月</Flex.Item>
                  <Flex.Item>{tax_list[5].tax}</Flex.Item>
                  <Flex.Item>{tax_list[5].salary_after_tax}</Flex.Item>
                </Flex>
              </Item>
              {
                isPersonVisible && 
                  <div>
                    <Item>
                      <Flex>
                        <Flex.Item> 七月</Flex.Item>
                        <Flex.Item>{tax_list[6].tax}</Flex.Item>
                        <Flex.Item>{tax_list[6].salary_after_tax}</Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 八月</Flex.Item>
                        <Flex.Item>{tax_list[7].tax}</Flex.Item>
                        <Flex.Item>{tax_list[7].salary_after_tax}</Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 九月</Flex.Item>
                        <Flex.Item>{tax_list[8].tax}</Flex.Item>
                        <Flex.Item>{tax_list[8].salary_after_tax}</Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 十月</Flex.Item>
                        <Flex.Item>{tax_list[9].tax}</Flex.Item>
                        <Flex.Item>{tax_list[9].salary_after_tax}</Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 十一月</Flex.Item>
                        <Flex.Item>{tax_list[10].tax}</Flex.Item>
                        <Flex.Item>{tax_list[10].salary_after_tax}</Flex.Item>
                      </Flex>
                    </Item>
                    <Item>
                      <Flex>
                        <Flex.Item> 十二月</Flex.Item>
                        <Flex.Item>{tax_list[11].tax}</Flex.Item>
                        <Flex.Item>{tax_list[11].salary_after_tax}</Flex.Item>
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
              <PieChart option={salaryPieOption} series={salarySeries}></PieChart>
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
              <PieChart option={costPieOption} series={costSeries}></PieChart>
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
