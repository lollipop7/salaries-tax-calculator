// 企业用工成本构成
/**
 * #5fc3be 工资(个人)占比 
 * #2e9458 养老保险（企业） 14.5%
 * #ed58b0 医疗保险（企业） 6.9%
 * #b6e5c0 失业保险（企业） 0.4%
 * #7962a7 工伤保险（企业） 0.1%
 * #ee4d4d 生育保险（企业） 0.7%
 * #d8a068 住房公积金（企业） 5.1%
 * #d8d8d8 补充公积金（企业） 0.0%
 */

export const costPieOption = {
  tooltip: { // 提示框组件 
    trigger: 'item', // 触发类型
    formatter: "{b}: ({c}%)", // 提示框浮层内容格式器 {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
    confine: true // 是否将 tooltip 框限制在图表的区域内。
  },
  color: [
    '#2e9458', '#ed58b0', '#b6e5c0', '#7962a7', '#ee4d4d', '#d8a068', '#d8d8d8', '#5fc3be'
  ],
  // legend: {
  //   orient: 'horizontal',
  //   top: 210,
  //   left: 60,
  //   itemWidth: 14, //图例标记的图形宽度。
  //   itemGap: 14, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
  //   tooltip: { // 提示框组件
  //     show: true
  //   },
  //   data: [
  //     {name: '养老保险（企业）', icon: 'roundRect'},
  //     {name: '医疗保险（企业）', icon: 'roundRect'},
  //     {name: '失业保险（企业）', icon: 'roundRect'},
  //     {name: '工伤保险（企业）', icon: 'roundRect'},
  //     {name: '生育保险（企业）', icon: 'roundRect'},
  //     {name: '住房公积金（企业）', icon: 'roundRect'},
  //     {name: '补充公积金（企业）', icon: 'roundRect'},
  //     {name: '工资(个人)', icon: 'roundRect'},
  //   ],
  //   formatter: function(name){
  //     let index = 0;
  //     nameList.forEach((item, i) => {
  //       if(item === name) {
  //         index = i;
  //       }
  //     })
  //     return name + '：' + dataList[index];
  //   }
  // },
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
          show: false,
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
        {value: 0, name:'养老保险（企业）'},
        {value: 0, name:'医疗保险（企业）'},
        {value: 0, name:'失业保险（企业）'},
        {value: 0, name:'工伤保险（企业）'},
        {value: 0, name:'生育保险（企业）'},
        {value: 0, name:'住房公积金（企业）'},
        {value: 0, name:'补充公积金（企业）'},
        {value: 0, name:'工资(个人)'},
      ]
    }
  ]
};
