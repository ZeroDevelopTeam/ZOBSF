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
	[CREATE_RETRIEVE_BOOKS](state, data) {
        state.addRetrieveBooks = data.concat();
   },
   [CLEAR_RETRIEVE_BOOKS](state, data) {
   		state.addRetrieveBooks = [];
   },
   [ADDRETRIEVEOBJ](state, data) {
        state.retrieveBookObjArr.push(data);
   },
   [CLEARRETRIEVEOBJ](state, data) {
   		state.retrieveBookObjArr = [];
   },
   [GETRETRIEVEBOOKSBYORDERID](state, data) {
   		state.getRetrieveBooksByOrderId = data;
   },
   [GETRETRIEVESBYPAGE](state, data) {
   		state.getRetrievesByPage = data;
   },
   [GETRETRIEVEBYID](state, data) {
   		state.getRetrieveById = data;
   }
}
