import {LOGLIST,LOGINFO} from './types'
import {get,post} from '../../api/api'

export default {
	//获取所有
	getLogList({commit},params){
		return new Promise((resolve, reject) => {
			get('log/getByPage',params)
	        .then(res => {
	        	commit(LOGLIST, res)
	            resolve(res);
	        })
	    });
	},
	
	//获取用户信息
	getLog({commit},params){
		return new Promise((resolve, reject) => {
			get('log/info',params)
	        .then(res => {
	        	commit(LOGINFO, res)
	            resolve(res);
	        })
	    });
	},
	
	//新增
	addLog({commit},params){
		return new Promise((resolve, reject) => {
			post('log/add',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//修改
	editLog({commit},params){
		return new Promise((resolve, reject) => {
			post('log/edit',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//删除
	removeLog({commit},params){
		return new Promise((resolve, reject) => {
			get('log/delete',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//启用or停用
	changeLogState({commit},params){
		return new Promise((resolve, reject) => {
			get('log/changeState',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
}

