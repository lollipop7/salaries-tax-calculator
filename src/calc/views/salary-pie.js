import React, { PureComponent } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie';

export  class Chart extends PureComponent {
  constructor(props) {
    super(props)
    this.initPie = this.initPie.bind(this)
  }
  chartInstance = null;
  initPie() {
    const { option={} } = this.props //外部传入的data数据
    this.chartInstance = echarts.init(this.ID, {height: 330}) //初始化echarts

    //设置options
    this.chartInstance.setOption(option)
    window.onresize = function() {
      this.chartInstance.resize()
    }
  }
  
  componentDidMount() {
    this.initPie()
  }
  
  componentDidUpdate() {
    this.chartInstance.setOption({
      series: [{
        name: '¥10000'
      }]
    })
  }
  
  render() {
    const { width="100%", height = '200px' } = this.props
    return <div className='pie-chart' ref={ID => this.ID = ID} style={{width, height}}></div>
  }
 }