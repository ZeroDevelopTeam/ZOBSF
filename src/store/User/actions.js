import {USERLIST,USERINFO} from './types'
import {get,post} from '../../api/api'

export default {
	//获取所有
	getUserList({commit},params){
		return new Promise((resolve, reject) => {
			get('user/getByPage',params)
	        .then(res => {
	        	commit(USERLIST, res)
	            resolve(res);
	        })
	    });
	},
	
	//获取用户信息
	getUser({commit},params){
		return new Promise((resolve, reject) => {
			get('user/info',params)
	        .then(res => {
	        	commit(USERINFO, res)
	            resolve(res);
	        })
	    });
	},
	
	//新增
	addUser({commit},params){
		return new Promise((resolve, reject) => {
			post('user/add',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//修改
	editUser({commit},params){
		return new Promise((resolve, reject) => {
			post('user/edit',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//删除
	removeUser({commit},params){
		return new Promise((resolve, reject) => {
			get('user/delete',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//启用or停用
	changeUserState({commit},params){
		return new Promise((resolve, reject) => {
			get('user/changeState',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//登入
	requestLogin({commit},params){
		return new Promise((resolve, reject) => {
			post('login/login',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//报表
	echarts({commit},params){
		return new Promise((resolve, reject) => {
			get('role/echarts',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
}

