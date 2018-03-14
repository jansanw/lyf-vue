const state = {
    cart_view_data_reload: false,
    cat_goods_list_class_id: 0,
    cat_goods_list_class_init_menu: false,
    cat_goods_list_class_active: 0,
    // default_address: false
    //     {
    //     id: 2,
    //     province_id: 19,
    //     city_id: 301,
    //     district_id: 3125,
    //     name: "小丽",
    //     mobile: "13432722564",
    //     area: "陆河县 广东 汕尾市",
    //     street: "河田镇",
    //     is_default: 1,
    //     create_time: "01-31 15:23",
    //     update_time: "--",
    //     delete_time: "--",
    //     status: 1,
    //     status_alias: "正常",
    //     sn: 2
    // }
    balance: 0
};
const mutations = {
    ['UPDATE_COMMON_DATA'](state, payload) {
        for (let key in payload) {
            state[key] = payload[key]
        }
    },
    // ['DEFAULT_ADDRESS'](state, payload) {
    //     state.default_address = payload;
    // }
};
export default {
    state,
    mutations
}
