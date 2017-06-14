import {PURVIEWLIST,PURVIEWINFO} from './types'
import {get,post} from '../../api/api'

export default {
	//获取所有
	getPurviewList({commit},params){
		return new Promise((resolve, reject) => {
			get('purview/getByPage',params)
	        .then(res => {
	        	commit(PURVIEWLIST, res)
	            resolve(res);
	        })
	    });
	},
	
	//获取用户信息
	getPurview({commit},params){
		return new Promise((resolve, reject) => {
			get('purview/info',params)
	        .then(res => {
	        	commit(PURVIEWINFO, res)
	            resolve(res);
	        })
	    });
	},
	
	//新增
	addPurview({commit},params){
		return new Promise((resolve, reject) => {
			post('purview/add',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//修改
	editPurview({commit},params){
		return new Promise((resolve, reject) => {
			post('purview/edit',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//删除
	removePurview({commit},params){
		return new Promise((resolve, reject) => {
			get('purview/delete',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//启用or停用
	changePurviewState({commit},params){
		return new Promise((resolve, reject) => {
			get('purview/changeState',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
}

