import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import category from './modules/category'
import actionsheet from './modules/actionsheet'
import common from './modules/common'
import page_load_state from './modules/page_load_state'
import orderlist from './modules/orderlist'
import discovery from './modules/discovery'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    modules: {
        home,
        category,
        actionsheet,
        common,
        page_load_state,
        orderlist,
        discovery,
    },
    strict: debug
});
