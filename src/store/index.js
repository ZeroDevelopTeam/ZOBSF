import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import user from './User';
import role from './Role';
import log from './Log';
import authorization from './Authorization';

export default new Vuex.Store({
    modules: {
        user,
        role,
        log,
        authorization
    }
});