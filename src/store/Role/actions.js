import {ROLELIST,ROLEINFO} from './types'
import {get,post} from '../../api/api'

export default {
	//获取所有角色
	getRoleList({commit},params){
		return new Promise((resolve, reject) => {
			get('role/getByPage',params)
	        .then(res => {
	        	commit(ROLELIST, res)
	            resolve(res);
	        })
	    });
	},
	
	//获取角色信息
	getRole({commit},params){
		return new Promise((resolve, reject) => {
			get('role/info',params)
	        .then(res => {
	        	commit(ROLEINFO, res)
	            resolve(res);
	        })
	    });
	},
	
	//新增
	addRole({commit},params){
		return new Promise((resolve, reject) => {
			post('role/add',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//修改
	editRole({commit},params){
		return new Promise((resolve, reject) => {
			post('role/edit',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//删除
	removeRole({commit},params){
		return new Promise((resolve, reject) => {
			get('role/delete',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//启用or停用
	changeState({commit},params){
		return new Promise((resolve, reject) => {
			get('role/changeState',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	}
}

