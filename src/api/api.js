import axios from 'axios';
import {Host} from './Host';
let user = sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):'';
var api = axios.create({
    headers: {
    	'user_id':user.userCode,
    	'content-type': 'application/json;charset=utf-8',
    	'token':user.token,
    },
    baseURL:`${Host}`,
    timeout: 3000,
});
export function post(url, params) {
    return new Promise((resolve, reject) => {
        api.post(url, params)
        .then(response => {
            resolve(response.data);
        })
        .catch((error) => {
          console.log(error)
           reject(error)
        })
    })
}

export function get(url, params) {
	return new Promise((resolve, reject) => {
        api.get(url, {params: params})
        .then(response => {
            resolve(response.data);
        })
        .catch((error) => {
          console.log(error)
           reject(error)
        })
    });
}

export function del(url, params) {
	return new Promise((resolve, reject) => {
        api.delete(url, {params: params})
        .then(response => {
            resolve(response.data);
        })
        .catch((error) => {
          console.log(error)
           reject(error)
        })
    });
}




