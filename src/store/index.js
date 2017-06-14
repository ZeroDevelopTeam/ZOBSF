import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import user from './User';
import role from './Role';
import log from './Log';
import purview from './Purview';
import books from './Books';
import bookTypes from './BookTypes';
import orders from './Orders';
import reclaim from './Reclaim';

export default new Vuex.Store({
    modules: {
        user,
        role,
        log,
        purview,
        books,
        bookTypes,
        orders,
        reclaim
    }
});