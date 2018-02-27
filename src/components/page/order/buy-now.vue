<style lang="css">

</style>

<template lang="html">
    <div class="page">
        <div class="page-content" v-if="page_show" style="margin-bottom:1.33rem">
            <div id="confirmOrder_1" class="order-confirmOrder" @click="select_address()">
                <div class="order-address mui-flex align-center" id="address_1">
                    <div class="cell fixed align-center">
                        <div class="icon"></div>
                    </div>
                    <div class="cell content" v-if="address">
                        <div class="info">
                            <span>收货人：</span>
                            <span>{{address.name}}</span>
                            <span> </span>
                            <span class="tel">{{address.mobile}}</span>
                        </div>
                        <div class="detail" id="addressTop">
                            <span>收货地址：</span>
                            <span></span>
                            <span>{{address.area}} </span>
                            <span>{{address.street}} </span>
                        </div>
                    </div>
                    <div class="cell content" v-else>
                        添加收货地址
                    </div>
                    <div class="cell fixed align-center">
                        <div class="nav"></div>
                    </div>
                    <b class="s1-borderB"></b>
                </div>
            </div>

            <section class="shopping-confirm-box">
                <p class="scb-title" id="shoppingSwitch">商品清单
                    <i class="fr ion-chevron-up">&nbsp;</i>
                </p>
                <div class="scb-list" id="scbList" style="display: block;">
                    <!--入仓商品列表-->
                    <div class="scb-content">
                        <p class="seller">
                            <i class="iconfont ion-ios-cart color-dark"></i>
                            <!--<span color="#4a4a4a"> 宝贝由{{store.store_name}} 发货</span>-->
                            <!--<span v-if="address_api.content[key] > 0" style="color:#ff464e">运费：￥{{address_api.content[key]}}</span>-->
                            <!--<span v-else>运费：包邮</span>-->
                            <span>运费：包邮</span>
                        </p>
                        <ul class="bag-list" style="background:#f7f7f7;">
                            <li v-for="item in data.goods">
                                <a class="orderlist-box clear js-active-goods">
                                    <div class="pic fl">
                                        <img v-lazy="item.cover">
                                    </div>
                                    <div class="ob-info">
                                        <div class="obi-first">
                                            <p class="title fl">{{item.name}}</p>
                                            <p class="current fr">￥:{{item.price}}</p>
                                        </div>
                                        <div class="obi-second">
                                            <p class="type fl">{{item.stock_name}}</p>
                                            <p class="old fr">×{{item.quantity}}</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <!--<div class="user-coupon no-coupon" v-if="store.store_voucher_list != null">-->
                        <!--<h2 @click="select_order_voucger(store.store_voucher_list,store.store_voucher_info,store.store_id,store.store_name)"-->
                        <!--class="uc-title" id="default-coupon-title" style="margin-bottom:0;">-->
                        <!--<span class="cp-title">店铺优惠</span>-->
                        <!--<span class="iconfont ion-chevron-right"></span>-->
                        <!--<span class="fr coupon-status" v-if="store.store_voucher_info.voucher_id > 0"><font-->
                        <!--color="#ff464e">{{store.store_voucher_info.name}}</font></span>-->
                        <!--<span class="fr coupon-status" v-else>不使用优惠券</span>-->
                        <!--</h2>-->
                        <!--</div>-->
                        <!--<p class="seller">-->
                        <!--<span>-->
                        <!--小计：<strong style="color:#ff464e">￥{{store_final_total_list[key]}}</strong>-->
                        <!--</span>-->
                        <!--</p>-->
                        <div class="activate-box">
                            <!--:name="key" v-model="pay_massage[key]"-->
                            <input type="text" class="activate-key js-user-note" v-model="note"
                                   maxlength="50" placeholder="留言(50字以内)" autocomplete="off">
                        </div>
                    </div>
                    <div class="bg"></div>
                </div>
            </section>

            <div class="pay-type" style="margin-bottom: .27rem;">
                <h5>支付方式<span class="needMoney fr"></span></h5>
                <ul class="type" id="pay-type-list">
                    <li :class="{'active' : pay.type === 'wechat'}" @click="pay.type = 'wechat'">
                        <img src="//jp.juancdn.com/jpwebapp/images/shopping/icon_wx.png">
                        <span>微信</span>
                        <span class="payway-tips-ad">推荐</span>
                        <i class="pay-type-radio"></i>
                    </li>
                    <li :class="{'active' : pay.type === 'alipay'}" @click="pay.type = 'alipay'">
                        <img src="//jp.juancdn.com/jpwebapp/images/shopping/icon_ali.png">
                        <span>支付宝</span>
                        <!--<span class="payway-tips-text"></span>-->
                        <i class="pay-type-radio"></i>
                    </li>
                    <li :class="{'active' : pay.type === 'balance'}" @click="pay.type = 'balance'">
                        <img src="//jp.juancdn.com/jpwebapp/images/shopping/icon_ali.png">
                        <span>余额</span>
                        <!--<span class="payway-tips-text"></span>-->
                        <i class="pay-type-radio"></i>
                    </li>
                </ul>
            </div>
            <div class="order_total order-amount-total">
                <div class="total-title">应付金额<span>¥：{{data.total}}</span></div>
                <p class="clear"><span class="sp1">商品总额</span><span class="sp2">¥：{{data.total_market}}</span></p>
                <p class="clear"><span class="sp1">总运费</span><span class="sp2">¥：{{data.freight}}</span></p>
            </div>
        </div>
        <div class="bag-total order_temai" v-if="page_show">
            <a href="javascript:;" class="go_pay" @click="go_pay()">去付款</a>
        </div>

        <!--<order-store-voucher-list :popupVisible="order_store_voucher_list_show"-->
        <!--:voucherlist="order_store_voucher_list_data" :voucherInfo="order_store_voucher_info"-->
        <!--:storename="order_store_voucher_list_name"></order-store-voucher-list>-->
    </div>
</template>

<script>
    import "../../../assets/buy-now.scss";
    import 'lib-flexible/flexible';
    import address_modal from "../user/address.vue";
    // import orderStoreVoucherList from "../../layout/order-store-voucher-list.vue";
    import bus from "../../../bus.js";
    // import {mapState, mapActions} from 'vuex';

    export default {
        name: "order_buynow",
        // components: {
        //     orderStoreVoucherList
        // },
        data() {
            return {
                page_show: false,
                goods: '',
                pay: {
                    type: 'alipay'//wechat
                },
                data: {
                    total: 0,
                    freight: 0,
                    weight: 0,
                    goods: [],
                },
                is_cart: false,
                note: '',
                // voucher: {},
                address: false,
                // store_cart_list: [],
                // address_api: [],
                // store_final_total_list: [],
                order_amount: 0,
                pay_massage: [],
                modal: undefined,
                // order_store_voucher_list_data: [],
                // order_store_voucher_info: null,
                // order_store_voucher_list_show: false,
                // order_store_voucher_list_name: "店铺优惠",
            }
        },
        filters: {
            // goods_spec: function (val) {
            //     if (val != null) {
            //         return val.join(";")
            //     }
            //
            // }
        },
        mounted() {
            this.goods = this.$route.params.goods;
            this.is_cart = this.$route.params.is_cart;
            this.getData();
            $modal.fromComponent(address_modal, {
                title: '地址管理',
                theme: 'default'
            }).then((modal) => {
                this.modal = modal
            });
            bus.$on("onChangeAddress", address => {
                /*if(this.address == null){
                  this.getData()
                }else{
                  this.address = address
                  this.getData()
                }*/
                this.address = address;
                // this.getData();
                this.modal.hide();
            });
            // bus.$on("onBuyVoucherState", res => {//打开关闭优惠券选择弹窗
            //     this.order_store_voucher_list_show = res
            // });
            // bus.$on("onBuyVoucherselect", res => {
            //     console.log(res);
            //     this.$set(this.voucher, res.store_id, res.voucher_id);
            //     console.log(this.voucher);
            //     this.order_store_voucher_list_show = false;
            //     this.getData()
            // })
        },
        computed: {
            // total() {
            //     return this.data.goods.reduce((sum, item) => {
            //         return sum + parseFloat(item.price) * item.quantity;
            //     }, 0);
            // },
            // total_market() {
            //     return this.data.goods.reduce((sum, item) => {
            //         return sum + parseFloat(item.price_market || item.price) * item.quantity;
            //     }, 0);
            // }
            //     ...mapState({
            //         address: state => state.common.default_address
            //     })
            // goods_total: {
            //     get() {
            //         let total = 0;
            //         for (let key in this.store_final_total_list) {
            //             total = total + parseFloat(this.store_final_total_list[key])
            //         }
            //         return total - this.freight_total
            //     },
            //     set() {
            //
            //     }
            // },
            // freight_total: {
            //     get() {
            //         let total = 0;
            //         for (let key in this.address_api.content) {
            //             total = total + parseFloat(this.address_api.content[key])
            //         }
            //         return total
            //     },
            //     set() {
            //
            //     }
            // }
        },
        destroyed() {
            if (this.modal)
                $modal.destroy(this.modal)
        },
        methods: {
            getData() {
                $loading.show();
                //mock
                // let step1_data = {
                //     "status_code": 1,
                //     "message": "",
                //     "data": {
                //         "store_cart_list": {
                //             "1": {
                //                 "goods_list": [{
                //                     "goods_num": 1,
                //                     "goods_id": 1168,
                //                     "goods_commonid": 557,
                //                     "gc_id": 54,
                //                     "store_id": 1,
                //                     "commis_rate": "20.00",
                //                     "goods_name": "2017\u65b0\u6b3e\u5973\u88c5\u6c14\u8d28\u906e\u809a\u5b50\u96ea\u7eba\u886b\u77ed\u8896\u590f\u88c5\u97e9\u7248\u788e\u82b1\u886c\u886b\u5bbd\u677e\u8d85\u957f\u4e0a\u8863 \u5bbd\u6761 S",
                //                     "goods_price": "150.00",
                //                     "goods_marketprice": "169.00",
                //                     "goods_spec": {"1107": "\u5bbd\u6761", "487": "S"},
                //                     "goods_spec_text": "\u5bbd\u6761;S",
                //                     "store_name": "\u8001\u53cb\u7c89",
                //                     "goods_image": "goods_image\/ydJrzExB4zqZ0e6brn0sAra4gb54fHAm4cHqKRD8.jpeg",
                //                     "transport_id": 0,
                //                     "goods_freight": "0.00",
                //                     "goods_vat": 0,
                //                     "goods_storage": 73,
                //                     "goods_storage_alarm": 0,
                //                     "is_fcode": 0,
                //                     "have_gift": 0,
                //                     "state": true,
                //                     "storage_state": true,
                //                     "groupbuy_info": null,
                //                     "xianshi_info": null,
                //                     "cart_id": 1168,
                //                     "bl_id": 0,
                //                     "goods_total": "150.00",
                //                     "goods_image_url": "http:\/\/lyfimg.gxlyf.cn\/goods_image\/ydJrzExB4zqZ0e6brn0sAra4gb54fHAm4cHqKRD8.jpeg!310x310"
                //                 }],
                //                 "store_goods_total": "150.00",
                //                 "store_mansong_rule_list": null,
                //                 "store_voucher_info": [],
                //                 "store_voucher_list": [],
                //                 "store_name": "\u8001\u53cb\u7c89",
                //                 "store_id": 1
                //             }
                //         },
                //         "freight_hash": "eyJpdiI6IlNJdXRnd1NvOGkra3I1dXNqWnA2elE9PSIsInZhbHVlIjoieW9yUWEwNXNCMUhIYlJyZWdiV3VNQnNlZEFMVkJEQnQyTGJkaWtvaVdRQmpJTmNEUlJzSWx6SzBZVHQxWGM5TVwvTGd4SlwvMTZRelpTSVVaZWVJZ0RhUT09IiwibWFjIjoiOWNhNDdjZmJhY2Q5OGU5N2FkYzI4ZGE1OWRmMGEwZjcwMDQyZDRmOWUyZDViOWIxYzljNWM5OGVmNDlkMTY1OSJ9",
                //         "address": null,
                //         "ifshow_offpay": null,
                //         "vat_hash": null,
                //         "inv_info": null,
                //         "available_predeposit": null,
                //         "available_rc_balance": null,
                //         "rpt_list": [],
                //         "zk_list": null,
                //         "order_amount": "150.00",
                //         "rpt_info": [],
                //         "address_api": "",
                //         "store_final_total_list": {"1": "150.00"}
                //     }
                // };
                // let user_address = {
                //     "status_code": 1,
                //     "message": "",
                //     "data": [{
                //         "address_id": 95,
                //         "member_id": 289150,
                //         "true_name": "\u5c71",
                //         "area_id": 3036,
                //         "city_id": 289,
                //         "province_id": 19,
                //         "area_info": "\u5e7f\u4e1c\u5e7f\u5dde\u5e02\u841d\u5c97\u533a",
                //         "address": "\u79d1\u5b66\u57ce",
                //         "tel_phone": "15889933997",
                //         "mob_phone": "15889933997",
                //         "is_default": 1,
                //         "dlyp_id": 0
                //     }]
                // };

                this.$api.userAuthPost("order/resolve", {
                    goods: this.goods,
                    is_cart: this.is_cart,
                    // address_id: this.address.address_id,
                    // voucher: JSON.stringify(this.voucher)
                }, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.data = data;
                        this.page_show = true;
                    }, err => {
                        // setTimeout(() => {
                        //     $router.go(-1)
                        // }, 1500)
                    })
                    // }, res => {
                    //     if (res.data.status_code === 1) {
                    //         this.address = res.data.data.address;
                    //         this.store_cart_list = res.data.data.store_cart_list;
                    //         this.address_api = res.data.data.address_api;
                    //         this.store_final_total_list = res.data.data.store_final_total_list;
                    //         this.order_amount = res.data.data.order_amount;
                    //         this.page_show = true;
                    //         for (let key in this.store_cart_list) {
                    //             this.$set(this.pay_massage, key, '');
                    //             if (this.store_cart_list[key].store_voucher_info !== '') {
                    //                 this.$set(this.voucher, key, this.store_cart_list[key].store_voucher_info.voucher_id)
                    //             }
                    //         }
                    //         $loading.hide()
                    //     } else {
                    //         $toast.show(res.data.message);
                    //         setTimeout(() => {
                    //             $router.go(-1)
                    //         }, 1500)
                    //     }
                    // }, error => {
                    //     $loading.hide()
                })
            },
            select_address() {
                this.modal.show()
            },
            go_pay() {
                if (this.address === '' || this.address == null) {
                    $toast.show("请选择收货地址");
                    return
                }
                // let msg = [];
                // for (let store_id in this.pay_massage) {
                //     let c_p = store_id + '|' + this.pay_massage[store_id];
                //     msg.push(c_p)
                // }msg.join(",")
                $loading.show();
                this.$api.userAuthPost("/order/create", {
                    goods: this.goods,
                    is_cart: this.is_cart,
                    // voucher: JSON.stringify(this.voucher),
                    address_id: this.address.id,
                    note: this.note
                }, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.$store.commit('UPDATE_COMMON_DATA', {cart_view_data_reload: true});
                        $toast.show("下单成功，正在启动支付");
                    })
                    // }, res => {
                    //     this.$store.commit('UPDATE_COMMON_DATA', {
                    //         cart_view_data_reload: true
                    //     });
                    //     if (res.data.status_code === 1) {
                    //         $loading.hide();
                    //         window.location.href = res.data.data
                    //     } else {
                    //         $toast.show(res.data.message);
                    //         setTimeout(function () {
                    //             $router.go(-1)
                    //         }, 1500);
                    //     }
                    // }, error => {
                    //     $toast.show("支付失败");
                    //     setTimeout(function () {
                    //         $router.go(-1)
                    //     }, 1500);
                })
            },
            // select_order_voucger(list, store_voucher_info, store_id, store_name) {
            //     this.order_store_voucher_list_data = list;
            //     this.order_store_voucher_info = store_voucher_info;
            //     this.order_store_voucher_list_name = store_name;
            //     this.order_store_voucher_list_show = true
            // }
        }
    }
</script>
