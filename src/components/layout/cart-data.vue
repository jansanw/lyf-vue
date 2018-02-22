<style lang="css">
    .cartbuy .bundlev2 .itemv2 {
        border-top: 1px solid #e7e7e7;
    }

    .nav-tab-top ul {
        display: flex;
        background: #fff;
        border-bottom: 0.01rem solid #e7e7e7;
    }

    .nav-tab-top ul li {
        height: 1.067rem;
        line-height: 1.067rem;
        margin-bottom: -0.01rem;
        text-align: center;
        font-size: 0.37rem;
        font-weight: 400;
        flex-grow: 1;
        flex-shrink: 0;
    }

    .nav-tab-top ul .cur {
        border-bottom: 0.08rem solid #ea5a49;
        box-sizing: border-box;
        color: #ea5a49;
    }
</style>
<template lang="html">
    <div v-if="show_page">
        <div class="page-content">
            <div class="nav-tab-top">
                <ul>
                    <li class="cur">商品</li>
                </ul>
            </div>
            <div class="cartbuy" style="margin-bottom: 1.32rem;">
                <div class="allItemv2" v-for="(store,key) in list" v-if="store.goods.length > 0">
                    <div class="bundlev2" style="margin-top: 0">
                        <div class="shop">
                            <div class="o-t-title-shop">
                                <div class="tcont">
                                    <div class="shopcb">
                                        <!--<p>-->
                                        <!--<input :id="'cb-s-'+store.store_id" :value="store.store_id"-->
                                        <!--v-model="store_check_all" class="o-t-cb" type="checkbox">-->
                                        <!--<label :for="'cb-s-'+store.store_id"></label>-->
                                        <!--</p>-->
                                        <strong>全部商品({{list.length}})</strong>
                                    </div>
                                    <!--<div class="ico">-->
                                    <!--<span class="shopIco_B"></span>-->
                                    <!--</div>-->
                                    <div class="contact">
                                        <a>
                                            <p class="title">{{store.store_name}}</p>
                                            <!--<p class="arrow"><span class="icon-right"></span></p>-->
                                        </a>
                                    </div>
                                    <div class="state">
                                        <div class="state-cont" v-if="store.voucher_list.length > 0">
                                            <p class="edit undefined color-assertive"
                                               @click="neck_voucher(store.voucher_list,store.store_name)"><i
                                                    class="ion-fireball"></i> 领券</p>
                                        </div>
                                        <div class="state-cont">
                                            <p class="edit undefined" @click="edit_cart(key)">
                                                {{store.edit_text}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="group groupPromotion">
                            <!--<div class="group-promotion" style="background:#fff8f4;" v-if="false">-->
                            <!--<div class="ctrl-ui-label">-->
                            <!--<div class="icon">-->
                            <!--<img src="//img.alicdn.com/tfs/TB1oh1BRFXXXXb4XFXXXXXXXXXX-160-36.png"></div>-->
                            <!--<div class="box full limitHeight ">-->
                            <!--<div class="title">-->
                            <!--<div>-->
                            <!--<h2 class="titleSub">6.18-6.20每300减60，可跨店</h2></div>-->
                            <!--</div>-->
                            <!--<div class="sub">-->
                            <!--<div>-->
                            <!--<div class="subSmall">去凑单</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="arrow"></div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <div class="itemv2 edit-false" v-for="(goods,index) in store.goods">
                                <div class="item-box" style="background:#fff8f4;" v-if="!store.is_edit">
                                    <div class="item-list o-t-item undefined">
                                        <div class="item-cb">
                                            <p>
                                                <input :id="'cb-'+goods.id" type="checkbox"
                                                       v-model="goods.is_check" class="cb o-t-cb">
                                                <label :for="'cb-'+goods.id"></label>
                                            </p>
                                        </div>
                                        <div class="item-detail">
                                            <div>
                                                <div class="item-img">
                                                    <a @click="go_goods(goods.id)">
                                                        <img class="lazy" :src="goods.cover">
                                                    </a>
                                                    <div class="icoTxt" v-if="false">
                                                    <span>
                                                        <img src="">
                                                    </span>
                                                    </div>
                                                </div>
                                                <div class="item-info">
                                                    <a>
                                                        <h3 class="title" @click="go_goods(goods.id)">
                                                            {{goods.name}}</h3>
                                                        <div class="sku" style="min-height: 1.12rem;">
                                                            <p>{{goods.stock_name}}</p>
                                                        </div>
                                                    </a>
                                                    <div class="item-logos">

                                                    </div>
                                                    <div class="pay">
                                                        <div class="pay-price">
                                                            <div class="price">
                                                                <p class="o-t-price" data-symbol="￥">
                                                                    <!--<span>-->
                                                                    <!--</span>-->
                                                                    <span class="major">{{goods.price}}</span>
                                                                    <span class="point" v-if="false">.</span>
                                                                    <span class="minor" v-if="false">00</span>
                                                                </p>
                                                            </div>
                                                            <div class="originPrice">
                                                                <p>
                                                                    <del v-show="goods.price_market">
                                                                        ￥{{goods.price_market}}
                                                                    </del>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div class="quantity">
                                                            <p>
                                                                <span>x</span>
                                                                <span>{{goods.number}}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-edit o-t-item undefined" style="background:#fff8f4;"
                                     v-if="store.is_edit">
                                    <div class="item-cb">
                                        <p>
                                            <input :id="'cb-'+goods.id" type="checkbox" class="cb o-t-cb"
                                                   v-model="goods.is_check">
                                            <label :for="'cb-'+goods.id"></label>
                                        </p>
                                    </div>
                                    <div class="item-detail">
                                        <div>
                                            <div class="item-img">
                                                <a>
                                                    <img class="lazy" :src="goods.cover">
                                                </a>
                                            </div>
                                            <div class="item-info2">
                                                <div class="edit-quantity">
                                                    <p class="btn-minus">
                                                        <a @click="cut_goods_num(key,index)"
                                                           class="btn minus off"></a>
                                                    </p>
                                                    <p class="btn-input">
                                                        <input type="number" min="1"
                                                               v-on:blur="changeCount(key,index)"
                                                               v-model.number="goods.number">
                                                    </p>
                                                    <p class="btn-plus">
                                                        <a @click="add_goods_num(key,index)" class="btn plus"
                                                           max="2"></a>
                                                    </p>
                                                </div>
                                                <div class="edit-sku">
                                                    <div>
                                                        <p>{{goods.stock_name}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="icoTxt" v-if="false">
                                        <span>
                                      <img src=""></span>
                                        </div>
                                    </div>
                                    <div class="item-del c-edit-delshow"
                                         @click="del_cart(goods.id,key,index)">
                                        <p>删除</p>
                                    </div>
                                </div>
                                <div class="op2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <cart-no-data v-if="count <= 0"></cart-no-data>
            </div>
        </div>
        <div class="cartbuy" v-if="count > 0" style="position:fixed; width:100%;bottom: 1.31rem; margin-top:0;">
            <div class="footer" :class="{'c_fb':show_footer}" style="margin-top:0;">
                <div :class="{'c_fb':show_footer}" class="f-fx">
                    <div>
                        <div class="ft-cb">
                            <p>
                                <input id="cb-footer" type="checkbox" class="cb o-t-cb" v-model="cart_check_all">
                                <label for="cb-footer"></label>
                            </p>
                        </div>
                        <div class="qx">全选</div>
                        <div class="pay">
                            <div>
                                <div>合计：
                                    <p class="o-t-price" data-symbol="￥">
                                        <span v-html="total.total"></span>
                                    </p>
                                </div>
                                <p>不含运费，优惠券等</p>
                            </div>
                        </div>
                        <div class="btn" :class="{'btn-success':total.num>0}" @click="submit_cart()">
                            <p>
                                <span>结算</span>
                                <span>(</span><span>{{total.num}}</span><span>)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<voucher-list :popupVisible="popupVisible" :voucherlist="voucher_list" :storename="voucher_store_name"-->
        <!--:from="'cart'"></voucher-list>-->
    </div>
</template>

<script>
    import '../../assets/cart.scss';
    import CartNoData from './cart-no-data';
    import bus from '../../bus.js';
    // import VoucherList from '../layout/voucher-list.vue';
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "cart_data",
        components: {
            CartNoData,
            // VoucherList
        },
        data() {
            return {
                list: [],
                count: 0,
                store_check_all: [],
                show_page: false,
                is_cart_state: [],
                is_c: true,
                popupVisible: false,
                voucher_list: [],
                voucher_store_name: "店铺优惠券",
            }
        },
        watch: {
            store_check_all: function (val, oldVal) {
                let add = val.length > oldVal.length;
                let difference = val.concat(oldVal).filter(function (v) {
                    return val.indexOf(v) === -1 || oldVal.indexOf(v) === -1
                });
                if (difference.length > 0 && this.is_c) {
                    for (let key in this.list[difference[0]].goods) {
                        this.$set(this.list[difference[0]].goods[key], 'is_check', add)
                    }
                }
                this.is_c = true
            },
            is_cart_state: function (val, oldVal) {
                this.is_c = false;
                this.store_check_all = [];
                for (let key in val) {
                    if (!this.$api.isCon(this.store_check_all, key)) {
                        this.is_c = false;
                        this.store_check_all.push(Number(key))
                    }
                }
            },
            cart_view_data_reload(val, oldVal) {
                // console.log(val);
                if (val) {
                    this.getList()
                }
            }
        },
        computed: {
            ...mapState({
                cart_view_data_reload: state => state.common.cart_view_data_reload,
            }),
            cart_check_all: {
                get: function () {
                    let all = 0;
                    let check = 0;
                    for (let k in this.list) {
                        let g_all = 0;
                        let g_check = 0;
                        for (let key in this.list[k].goods) {
                            all++;
                            g_all++;
                            if (this.list[k].goods[key].is_check) {
                                check++;
                                g_check++;
                            }
                        }
                        if (g_all == g_check) {
                            this.$set(this.is_cart_state, k, true)
                        } else {
                            this.$delete(this.is_cart_state, k)
                        }
                    }
                    return (all == check && all > 0);
                },
                set: function (val) {
                    for (let k in this.list) {
                        for (let key in this.list[k].goods) {
                            this.$set(this.list[k].goods[key], 'is_check', val)
                        }
                    }
                }
            },
            total: function () {
                let total = 0;
                let num = 0;
                for (let k in this.list) {
                    let goods_list = this.list[k].goods;
                    for (let key in goods_list) {
                        let goods = goods_list[key];
                        if (goods.is_check) {
                            num++;
                            total = total + goods.number * goods.price
                        }
                    }
                }
                return {
                    total: this.$api.fmoney(total, 2),
                    num: num
                };
            }
        },
        props: {
            show_footer: { //是否显示底部导航栏
                type: Boolean,
                default: true,
                required: false,
            }
        },
        mounted() {
            if (!this.show_page) {
                $loading.show("");
                this.getList();
            }
            // bus.$on("onVoucherStateByCart", res => {
            //     // console.log(res);
            //     this.popupVisible = res
            // })
        },
        methods: {
            getList() {
                //mock
                // let _res = {
                //     data: {
                //         data: {
                //             list: [{
                //                 store_id: 0,
                //                 store_name: "苏宁",
                //                 voucher_list: [],//neck_voucher
                //                 // edit_text: "编辑",
                //                 // is_edit: true,
                //                 goods: [
                //                     {
                //                         cart_id: 66,
                //                         // is_check: false,
                //                         goods_image_url: "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/bad7373fe7d6e15364d74ae0473358d7_121_121.jpg",
                //                         goods_name: "抱枕",
                //                         goods_spec_text: "红色，大大的",
                //                         goods_price: 99,
                //                         goods_marketprice: 999,
                //                         goods_num: 1
                //                     },
                //                     {
                //                         cart_id: 67,
                //                         // is_check: false,
                //                         goods_image_url: "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/bad7373fe7d6e15364d74ae0473358d7_121_121.jpg",
                //                         goods_name: "抱枕",
                //                         goods_spec_text: "红色，大大的",
                //                         goods_price: 99,
                //                         goods_marketprice: 999,
                //                         goods_num: 1
                //                     }
                //                 ]
                //             }]
                //         }
                //     }
                // };
                // for (let key in res.data.data.list) {
                //     this.$set(res.data.data.list[key], "is_edit", false);
                //     this.$set(res.data.data.list[key], "edit_text", "编辑");
                //     for (let c_k in res.data.data.list[key].goods) {
                //         this.$set(res.data.data.list[key].goods[c_k], "is_check", false)
                //     }
                // }
                // this.list = res.data.data.list;
                // this.count = res.data.data.count;
                // console.log(this.list);
                // this.show_page = true;
                // $loading.hide();
                // this.$store.commit('UPDATE_COMMON_DATA', {
                //     cart_view_data_reload: false
                // });
                // return;
                this.$api.userAuthGet('cart/page', rps => {
                    this.$store.commit('UPDATE_COMMON_DATA', {cart_view_data_reload: false});
                    this.$api.responseFilter(rps.data, data => {
                        // console.log(rps);
                        for (let i in data.list) {
                            this.$set(data.list[i], "is_edit", false);
                            this.$set(data.list[i], "edit_text", "编辑");
                            for (let j in data.list[i].goods) {
                                this.$set(data.list[i].goods[j], "is_check", false)
                            }
                        }
                        this.list = data.list;
                        this.count = data.count;
                        this.show_page = true;
                        $loading.hide();
                    });
                    // }, error => {
                    //     this.$store.commit('UPDATE_COMMON_DATA', {
                    //         cart_view_data_reload: false
                    //     });
                })
            },
            edit_cart(key) {
                if (this.list[key].is_edit) {
                    this.list[key].is_edit = false;
                    this.list[key].edit_text = "编辑";
                } else {
                    this.list[key].is_edit = true;
                    this.list[key].edit_text = "完成";
                }
            },
            add_goods_num(key, index) {
                $loading.show("");
                this.list[key].goods[index].number++;
                let number = this.list[key].goods[index].number;
                let id = this.list[key].goods[index].id;
                if (number < 1) {
                    $toast.show("受不鸟了，宝贝不能再减少了哦");
                    return
                }
                this.$api.userAuthGet('cart/update?id=' + id + '&number=' + number, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.list[key].goods[index].number = number;
                    })
                    //     if (res.data.status_code != 1) {
                    //         this.list[key].goods[index].number--;
                    //         $toast.show(res.data.message)
                    //     } else {
                    //         $loading.hide()
                    //     }
                    // }, error => {
                    //     this.list[key].goods[index].number--;
                })

            },
            cut_goods_num(key, index) {
                if (this.list[key].goods[index].number === 1) {
                    $toast.show("受不鸟了，宝贝不能再减少了哦");
                    return
                }
                this.list[key].goods[index].number--;
                $loading.show("");
                let number = this.list[key].goods[index].number;
                let id = this.list[key].goods[index].id;
                if (number < 1) {
                    $toast.show("受不鸟了，宝贝不能再减少了哦");
                    this.list[key].goods[index].number = 1;
                    return
                }
                this.$api.userAuthGet('cart/update?id=' + id + '&number=' + number, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.list[key].goods[index].number = number;
                    })
                    //     if (res.data.status_code !== 1) {
                    //         this.list[key].goods[index].number++;
                    //         $toast.show(res.data.message)
                    //     } else {
                    //         $loading.hide()
                    //     }
                    // }, error => {
                    //     this.list[key].goods[index].number++
                })
            },
            changeCount(key, index) {
                let number = this.list[key].goods[index].number;
                let id = this.list[key].goods[index].id;
                if (number < 1) {
                    $toast.show("受不鸟了，宝贝不能再减少了哦");
                    this.list[key].goods[index].number = 1;
                    number = 1
                }
                $loading.show("");
                this.$api.userAuthGet('cart/update?id=' + id + '&number=' + number, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.list[key].goods[index].number = number;
                    })
                    //     if (res.data.status_code != 1) {
                    //         $toast.show(res.data.message)
                    //     } else {
                    //         $loading.hide()
                    //     }
                    // }, error => {
                    //     this.list[key].goods[index].number = 1
                })
            },
            del_cart(id, key, index) {
                $dialog.confirm({
                    title: '确认要删除这个宝贝吗?'
                }).then((res) => {
                    if (res) {
                        $loading.show("");
                        this.$api.userAuthGet('cart/delete?status=-1&id=' + id, rps => {
                            this.$api.responseFilter(rps.data, data => {
                                this.$delete(this.list[key].goods, index);
                            })
                            //     if (res.data.status_code == 1) {
                            //         this.$delete(this.list[key].goods, index);
                            //         $loading.hide()
                            //     } else if (res.data.status_code == -1) {
                            //         $toast.show(res.data.message);
                            //         this.$delete(this.list[key].goods, index)
                            //     } else {
                            //         $toast.show(res.data.message)
                            //     }
                            // }, error => {
                            //     $toast.show('请求错误')
                        })
                    }
                })
            },
            submit_cart() {
                if (this.total.num > 0) {
                    let goods = [];
                    for (let key in this.list) {
                        this.list[key].goods.filter(function (item) {
                            return item.is_check === true;
                        }).map(function (item) {
                            // let c_p = item.id + '|' + item.number;
                            // goods.push({
                            //     cart_id: item.id,
                            //     goods_id: item.goods_id,
                            //     stock_id: item.stock_id,
                            // });
                            // goods.push([
                            //     item.id,
                            //     // item.goods_id,
                            //     item.stock_id,
                            //     item.number
                            // ]);item.id + '|' + item.number + '|' + item.stock_id
                            goods.push(item.id)
                        })
                    }
                    $router.push({
                        name: 'order_buynow',
                        params: {goods: goods.join(','), is_cart: 1},
                    })
                }
            },
            // neck_voucher(list, name) {
            //     this.voucher_list = list;
            //     this.voucher_store_name = name;
            //     this.popupVisible = true
            // },
            go_goods(id) {
                $router.push({
                    name: 'goods_detail',
                    params: {
                        id: id,
                    }
                });
            }
        }
    }
</script>
