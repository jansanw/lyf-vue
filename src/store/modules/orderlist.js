let list = [];
let catLen = 5;
for (let i = 0; i < catLen; i++) {
    list.push({
        init: false,
        active: 0,
        order_list: [],
        page: 1,
        load_more: true,
    })

}

const state = {
    list,
    active: 0,
};

const mutations = {
    ['ORDERLIST_GETDATA_CALLBACK'](state, payload) {
        state.list[state.active].init = true;
        if (state.list[state.active].page === 1) {
            state.list[state.active].order_list = payload.data.list
        } else {
            state.list[state.active].page = payload.page;
            for (let i = 0; i < payload.data.list.length; i++) {
                state.list[state.active].order_list.push(payload.data.list[i]);
            }
        }
        state.list[state.active].load_more = !(payload.page >= payload.pageCount);
        state.list[state.active].init = true;

        //state.list[state.active].is_load = false;
        //state.init_load = true;
    },
    ['ORDERLIST_UPDATE'](state, payload) {
        for (let key in payload) {
            state[key] = payload[key]
        }

    },
    ['ORDERLIST_UPDATE_LIST'](state, payload) {
        for (let key in payload) {
            state.list[state.active][key] = payload[key]
        }

    },

};
export default {
    state,
    mutations
}
