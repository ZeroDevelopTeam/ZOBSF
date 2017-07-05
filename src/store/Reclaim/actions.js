import {get,post, del} from '../../api/api'
import {
	CREATE_RETRIEVE_BOOKS,
	CLEAR_RETRIEVE_BOOKS, 
	ADDRETRIEVEOBJ, 
	CLEARRETRIEVEOBJ, 
	GETRETRIEVEBOOKSBYORDERID, 
	GETRETRIEVESBYPAGE,
	GETRETRIEVEBYID
} from './mutation_types'

export default {
	//添加回收相关图书
	create_retrieve_book: ({commit}, pramas) => {
        commit(CREATE_RETRIEVE_BOOKS, pramas);
    },
    //点击取消或者关闭对话框按钮时清空数据
    clear_retrieve_book: ({commit}, params)=> {
    	commit(CLEAR_RETRIEVE_BOOKS);
    },
    //添加回收图书实体
	addRetrieveBookObj: ({commit}, pramas) => {
        commit(ADDRETRIEVEOBJ, pramas);
    },
    //点击取消或者关闭对话框按钮时清空数据
    clearRetrieveBookObj: ({commit}, params)=> {
    	commit(CLEARRETRIEVEOBJ);
    },
    //通过orderId获取图书
    getRetrieveBooksByOrderId: ({commit}, params)=> {
		return new Promise((resolve, reject) => {
			get('order/getDetailByOrderId',params)
	        .then(res => {
	        	commit(GETRETRIEVEBOOKSBYORDERID);
	            resolve(res);
	        })
	    });
    },
    //新增回收单
    addRetrieve: ({commit}, params)=> {
    	return new Promise((resolve, reject) => {
			post('retrieve/addRetrieve',params)
			.then(res => {
	            resolve(res);
	        })
	    });
    },
    //分页获取回收单
    getRetrievesByPage: ({commit}, params)=> {
    	return new Promise((resolve, reject) => {
			get('retrieve/getByPage',params)
	        .then(res => {
	        	commit(GETRETRIEVESBYPAGE,res);
	            resolve(res);
	        })
	    }); 
    },
    //删除回收单
    deleteRetrieve: ({commit}, params)=> {
    	return new Promise((resolve, reject) => {
			del('retrieve/deleteRetrieve',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
    },
    //根据id获取回收单
    getRetrieveById: ({commit}, params)=> {
    	return new Promise((resolve, reject) => {
			get('retrieve/getRetrieveById',params)
	        .then(res => {
	        	commit(GETRETRIEVEBYID,res);
	            resolve(res);
	        })
	    }); 
    },
    //修改回收单
    editRetrieve: ({commit}, params)=> {
    	return new Promise((resolve, reject) => {
			post('retrieve/editRetrieve',params)
	        .then(res => {
	            resolve(res);
	        })
	    });  
    }
}

