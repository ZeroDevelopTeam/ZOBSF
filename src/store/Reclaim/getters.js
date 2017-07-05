export default {
	getAddRetrieveBooks: (state) => {
		return state.addRetrieveBooks;
	},
	getRetrieveBooksByOrderId:(state)=> {
		return state.getRetrieveBooksByOrderId;
	},
	getRetrievesByPage:(state)=> {
		return state.getRetrievesByPage;
	},
	getRetrieveById: (state)=> {
		return state.getRetrieveById;
	}
}
