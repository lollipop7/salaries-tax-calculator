export function fomatFloat(src,pos){    
  return Math.round(src * Math.pow(10, pos))/Math.pow(10, pos);    
} 

export function keepTwoDecimalFull(num) {
  let result = parseFloat(num);
  if(isNaN(result)) {
    return false;
  }
  result = Math.round(num * 100) / 100;
  let s_x = result.toString();  //将数字转换为字符串
  let pos_decimal = s_x.indexOf('.');   //小数点的索引值
  // 当整数时，pos_decimal=-1 自动补0  
  if(pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  // 当数字的长度< 小数点索引+2时，补0    
  while(s_x.length <= pos_decimal + 3) {
    s_x += '0';
  }
  return s_x;  
}


export function uniqueBy(arr, name) {
  let hash = {};
  let newArr =[];
  newArr = arr.reduceRight(function(item, next) {
      if(!hash[next.name]){
        hash[next.name] = true && item.push(next);
      }
      return item
  }, [])
  return newArr;
}