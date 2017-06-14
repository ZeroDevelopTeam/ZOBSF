import {get,post} from '../../api/api'
import {ADDBOOK, GETBYPAGE} from './mutation_types'
export default {
	
	addBook({commit},params){
		return new Promise((resolve, reject) => {
			post('book/addBook',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	getByPage({commit},params){
		return new Promise((resolve, reject) => {
			post('book/getByPage',params)
	        .then(res => {
	        	commit(GETBYPAGE, res);
	            resolve(res);
	        })
	    });
	}
	
}

