const state = {
    showpicksheet: false,
    firstTimeOpenSheet: false,
    cur_specx: [],
    cur_spec_namex: [],
    quantityx: 1,
    stock_choose: {
        id: 0,
        name: '',
        goods_id: 0,
        price: '',
        stock: '',
        quantity: 1,
        number: 0,
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
