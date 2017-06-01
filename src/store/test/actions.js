import {get,post} from '../../api/ajaxApi';
import * as types from './mutations_types';

export default {
	increment(context,param) {
		return new Promise((resolve,reject)=> {
			get('user/getByPage',param,(resp)=> {
		        context.commit(types.INCREMENT,resp);
		        resolve();
			});
		});
    },
    decrement(contexts) {
        context.commit(types.DECREMENT);
    }
}
