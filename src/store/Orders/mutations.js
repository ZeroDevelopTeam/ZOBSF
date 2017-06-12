import {LOGLIST,LOGINFO} from './mutation_types'
	  
export default {
		[LOGLIST](state,data) {
				state.logList = data;
		},
		[LOGINFO](state,data){
				state.logInfo = data;
		},
}
