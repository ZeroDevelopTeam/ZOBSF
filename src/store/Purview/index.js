import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
//初始化状态
const state = {
    purviewList: [],
    purviewInfo:{},
}
export default {
    state,
    getters,
    actions,
    mutations
}