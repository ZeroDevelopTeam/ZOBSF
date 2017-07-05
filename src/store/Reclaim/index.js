import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
//初始化状态
const state = {
	addRetrieveBooks: [],//回收图书简单信息列表
	retrieveBookObjArr: [],//将要存入数据库的书实体的数组
	getRetrieveBooksByOrderId: {},//根据订单id查找回收图书
	getRetrievesByPage: {},//分页获取回收单
	getRetrieveById: {},//根据id获取回收单
}
export default {
    state,
    getters,
    actions,
    mutations
}