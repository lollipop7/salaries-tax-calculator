import axios from 'axios';

const CancelToken = axios.CancelToken;
const cancel = [];


export const  AjaxByPost = (uri, data) => {
  return new Promise(function(resolve, reject) {
    axios({
      url: `/vita/m/salary/${uri}`,
      method: 'post',
      data: data,
      headers: {
        contentType: 'application/json;charset=utf-8'
      },
      cancelToken: new CancelToken(function(c) {
        cancel.push({
          [uri]: c
        })
      }),
      transformRequest(data) {
        // 对 data 进行任意转换处理
        return JSON.stringify(data);
      },
      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse(data) {
        try{
          return JSON.parse(data);
        }catch(err){
          console.log(err);
        }
      }
    })
    .then(response => {
      const {data} = response;
      resolve(data)
    })
    .catch(function(response, e) {
      if(response instanceof Error) {
        reject(response);
      }
    })
  })
}