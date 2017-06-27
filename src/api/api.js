import axios from 'axios';
import {Host} from './Host';
var api = axios.create({
    headers: {'content-type': 'application/json;charset=utf-8'},
    baseURL:`${Host}`,
    timeout: 3000
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




