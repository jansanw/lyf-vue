const state = {
    showpicksheet: false,
    firstTimeOpenSheet: false,
    cur_specx: [],
    cur_spec_namex: [],
    quantityx: 1,
    stock_choose: {
        id: -1,
        name: '',
        price: 0,
        stock: 0,
        quantity: 1,
        cover: ''
    }
};

const mutations = {
    ['ACTION_SHEET_STOCK'](state, payload) {
        for (let k in payload) {
            state.stock_choose[k] = payload[k];
        }
    },
    ['ACTIONSHEET_UPDATE'](state, payload) {
        state[payload.key] = payload.value;
    },
    ['ACTIONSHEET_UPDATE_ARR'](state, payload) {
        state[payload.key] = [];
        for (let i in payload.value) {
            state[payload.key].push(payload.value[i])
        }
    },
    ['ACTIONSHEET_CLEAN'](state) {
        state.showpicksheet = false;
    },
};

export default {
    state,
    mutations
}
