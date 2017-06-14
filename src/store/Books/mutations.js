import {GETBYPAGE} from './mutation_types'
	  
export default {
		[GETBYPAGE](state,data) {
				state.bookList = data;
		}
}
