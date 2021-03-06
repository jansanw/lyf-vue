import http from '../../api/http.js'

let list = [];
let catLen = 12;
for (let i = 0; i < catLen; i++) {
    list.push({
        init: false,
        goods: [],///ok
        sub_category: [],///
        scroll: 0,
        page: 1,
        is_load: false,
        load_more: true,
        more_data: '--- 到底了 ---',
    })
}

const state = {
    slide: [],
    category: [],
    list,
    active: 0,
    init_load: false
};

const actions = {
    getData(context, cb) {
        context.commit("UPDATE_LIST", {
            is_load: true
        });
        let category_id = 0;
        if (state.category[state.active])
            category_id = state.category[state.active].id;
        let showpage = 1;
        let activelist = state.list[state.active];
        if (activelist) showpage = state.list[state.active].page;
        http.userGet('index?page=' + showpage + '&categoryId=' + category_id, res => {
            context.commit('SET_DATA', res);
            $loading.hide();
            cb(res)
        }, error => {
            console.log(error);
            context.commit("UPDATE_LIST", {
                is_load: false,
                load_more: false,
                init_load: true,
                more_data: '--- 加载失败，点击重新加载 ---',
            });
            $loading.hide();
            cb(error)
        })
    }
};
const mutations = {
    ['SET_DATA'](state, payload) {
        state.list[state.active].init = true;
        if (state.list[state.active].page === 1) {
            if (state.active === 0) {
                state.category = payload.data.data.category;
                state.slide = payload.data.data.slide;
            } else {
                state.list[state.active].sub_category = payload.data.data.category;
            }
            state.list[state.active].goods = payload.data.data.goods.list;
        } else {
            for (let i = 0; i < payload.data.data.goods.list.length; i++) {
                state.list[state.active].goods.push(payload.data.data.goods.list[i]);
            }
        }
        if (state.list[state.active].page >= payload.data.data.goods.pageCount) {
            state.list[state.active].page = payload.data.data.goods.page;
            state.list[state.active].load_more = false;
        }
        state.list[state.active].is_load = false;

        state.init_load = true;
    },
    ['UPDATE'](state, payload) {
        for (let key in payload) {
            state[key] = payload[key];
        }
    },
    ['UPDATE_LIST'](state, payload) {
        for (let key in payload) {
            state.list[state.active][key] = payload[key];
        }

    },
    ['UPDATE_HOME_LIST_SCROLL'](state, payload) {
        state.list[payload.active].scroll = payload.scrol;
    }
};
export default {
    state,
    actions,
    mutations
}
