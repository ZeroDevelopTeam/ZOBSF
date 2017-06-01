import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)
//初始化状态
const state = {
    count: 10,
    userList: {}
}
export default {
	actions,
	mutations,
	state,
	getters
}
