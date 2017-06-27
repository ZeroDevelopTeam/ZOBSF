import {GETORDERBYPAGE, GETBOOKSBYORDERID} from './mutation_types'
	  
export default {
		[GETORDERBYPAGE](state,data) {
				state.orderList = data;
		},
		[GETBOOKSBYORDERID](state,data) {
			state.getBooksByOrderId = data;
		}
}
