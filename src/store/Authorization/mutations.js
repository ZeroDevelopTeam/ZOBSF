import {AUTHLIST,AUTHINFO} from './types'
	  
export default {
	[AUTHLIST](state,data) {
			state.authList = data;
	},
	[AUTHINFO](state,data){
			state.authInfo = data;
	},
}
