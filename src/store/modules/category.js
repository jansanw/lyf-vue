import http from '../../api/http.js'

const state = {
    class_list: false,
};
const actions = {
    getClassIndexData(context, cb) {
        context.commit("UPDATE_CATEGORY", {
            is_load: true
        });
        http.userGet('category/index', res => {
            context.commit('SET_CATEGORY_DATA', res);
            $loading.hide();
            cb(res)
        }, error => {
            context.commit("UPDATE_CATEGORY", {
                is_load: false,
            });
            $loading.hide();
            cb(error)
        })
    }
};
const mutations = {
    ['SET_CATEGORY_DATA'](state, payload) {
        state.class_list = payload.data.data;
        state.is_load = false;
    },
    ['UPDATE_CATEGORY'](state, payload) {
        for (let key in payload) {
            state[key] = payload[key];
        }

    }
};
export default {
    state,
    actions,
    mutations
}
