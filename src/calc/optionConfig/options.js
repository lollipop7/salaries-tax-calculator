// 指定图表的配置项和数据
/**
 * #5fc3be 税后工资 81.4%
 * #3f4549 养老保险 8.0%
 * #d1d969 医疗保险 2.0%
 * #fb9da2 失业保险 0.5%
 * #4799cd 住房公积金 7.0%
 * #ffe200 补充公积金 0.0%
 * #ffbb7c 个人所得税 1.2%
 */

let arrLt = ['81.4%', '2.0%', '7.0%', '1.2%'],
arrRt = ['8.0%', '0.5%', '0.0%'],
salary = '¥10000';
export const salaryPieOption = {
  graphic: {
    type: 'text',
    zlevel: 200,
    z: 2,
    left: 'center',
    top: 'center',
    style: {
      text: salary,
      x: 100,
      y: 100,
      fill: '#000'
    }
  },
  tooltip: { // 提示框组件 
    trigger: 'item', // 触发类型
    formatter: "{a} <br/>{b}: {c} ({d}%)", // 提示框浮层内容格式器
    confine: true // 是否将 tooltip 框限制在图表的区域内。
  },
  color: ['#5fc3be', '#3f4549', '#d1d969', '#fb9da2', '#4799cd', '#ffe200', '#ffbb7c'],
  legend: [
    {
      orient: 'vertical',
      left: 20,
      top: 210,
      itemWidth: 14, //图例标记的图形宽度。
      itemGap: 14, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
      tooltip: { // 提示框组件
        show: true
      },
      data: [
        {
          name: '税后工资',
          icon: 'roundRect'
        },
        {
          name: '医疗保险',
          icon: 'roundRect'
        },
        {
          name: '住房公积金',
          icon: 'roundRect'
        },
        {
          name: '个人所得税',
          icon: 'roundRect'
        },
      ],
      formatter: function(name){
        let index = 0;
        const data = ['税后工资', '医疗保险', '住房公积金', '个人所得税']
        data.forEach((item, i) => {
          if(item === name) {
            index = i;
          }
        })
        return name + '  ' + arrLt[index];
      }
    },
    {
      orient: 'vertical',
      left: 180,
      top: 210,
      itemWidth: 14, //图例标记的图形宽度。
      itemGap: 14, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
      tooltip: { // 提示框组件
        show: true
      },
      data: [
        {
          name: '养老保险',
          icon: 'roundRect'
        },
        {
          name: '失业保险',
          icon: 'roundRect'
        },
        {
          name: '补充公积金',
          icon: 'roundRect'
        },
      ],
      formatter: function(name){
        let index = 0;
        const data = ['养老保险', '失业保险', '补充公积金']
        data.forEach((item, i) => {
          if(item === name) {
            index = i;
          }
        })
        return name + '  ' + arrRt[index];
      }
    }
  ],
  series: [ //系列列表
    {
      name:'工资构成',
      type:'pie',
      center: ['50%',110], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
      radius: [55, 90], //饼图的半径， 数组的第一项是内半径，第二项是外半径
      avoidLabelOverlap: false,
      label: { //饼图图形上的文本标签
        normal: { 
          show: false,
          // position: 'center'
        },
        emphasis: { //高亮的扇区和标签样式。
          show: true,
          textStyle: {
            fontSize: '12',
          }
        }
      },
      labelLine: { //标签的视觉引导线样式
        normal: {
          show: false
        }
      },
      data:[ //系列中的数据内容数组
        {value: 81.4, name:'税后工资'},
        {value: 8.0, name:'养老保险'},
        {value: 2.0, name:'医疗保险'},
        {value: 0.5, name:'失业保险'},
        {value: 7.0, name:'住房公积金'},
        {value: 0.0, name:'补充公积金'},
        {value: 1.2, name:'个人所得税'},
      ]
    }
  ]
};
