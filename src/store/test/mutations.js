import {INCREMENT,DECREMENT} from './mutations_types'
import Vue from 'vue'
export default {
	[INCREMENT](state,param){
		state.userList = param;
		state.count++;
	},
	[DECREMENT](state,cou){
		state.count--;
	}
}
