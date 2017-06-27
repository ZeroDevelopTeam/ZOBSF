import {get, post, del} from '../../api/api'
import {GETORDERBYPAGE, GETBOOKSBYORDERID } from './mutation_types'
export default {
	getOrderByPage({commit},params) {
		return new Promise((resolve, reject) => {
			get('order/getByPage',params)
	        .then(res => {
	        	commit(GETORDERBYPAGE, res);
	            resolve(res);
	        })
	    });
	},
	deleteOrderByIds({commit},params) {
		return new Promise((resolve, reject) => {
			del('order/deleteOrder',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	getBooksByOrderId({commit},params) {
		return new Promise((resolve, reject) => {
			get('order/getDetailByOrderId',params)
	        .then(res => {
	        	commit(GETBOOKSBYORDERID, res);
	            resolve(res);
	        })
	    });
	
	}
}

