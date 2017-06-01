import Vue from 'vue'
import axios from 'axios'
import config from './config'

//Vue.use(axios)

/**
 * 解析get请求传进来的参数，用&连接。
 * @param data 参数对象
 */
function parseParams(data){
  if(data == null){return '';}
  let list = [];
  for(let item in data){
    list.push(`${item}=${data[item]}`)
  }
  return list.join("&");
}

/** 
 * 封装的axios的get请求
 * @param url 请求地址
 * @param data 请求参数
 * @param callback 响应回调函数
 */
export function get(url,data=null, callback=(json)=>{}){
	const params = parseParams(data);
    const tarUrl = data==null?url:`${url}?${params}`;
    axios.get(tarUrl,config)
    .then( (response)=> {
    	return response.data;
  	})
    .then( (json)=> {
    	callback(Object.assign({}, json));
    })
  	.catch( (error)=> {
  		console.log(error);
  	});
}

/** 
 * 封装的axios的post请求
 * @param url 请求地址
 * @param data 请求参数
 * @param callback 响应回调函数
 */
export function post(url, data=null, callback=(json)=>{}){
	axios.post(url,JSON.stringify(data),config)
	.then( (response)=> {
		return response.data;
	})
	.then( (json)=> {
		callback(Object.assign({}, json));
	})
	.catch( (error)=> {
		console.log(error);
	})
}
