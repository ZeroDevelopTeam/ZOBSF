import {AUTHLIST,AUTHINFO} from './types'
import {get,post} from '../../api/api'

export default {
	//获取所有
	getAuthList({commit},params){
		return new Promise((resolve, reject) => {
			get('auth/getByPage',params)
	        .then(res => {
	        	commit(AUTHLIST, res)
	            resolve(res);
	        })
	    });
	},
	
	//获取用户信息
	getAuth({commit},params){
		return new Promise((resolve, reject) => {
			get('auth/info',params)
	        .then(res => {
	        	commit(AUTHINFO, res)
	            resolve(res);
	        })
	    });
	},
	
	//新增
	addAuth({commit},params){
		return new Promise((resolve, reject) => {
			post('auth/add',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//修改
	editAuth({commit},params){
		return new Promise((resolve, reject) => {
			post('auth/edit',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//删除
	removeAuth({commit},params){
		return new Promise((resolve, reject) => {
			get('auth/delete',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//启用or停用
	changeAuthState({commit},params){
		return new Promise((resolve, reject) => {
			get('auth/changeState',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
}

