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
                    <!--<i class="fr ion-chevron-up">&nbsp;</i>-->
                </p>
                <div class="scb-list" id="scbList" style="display: block;">
                    <!--入仓商品列表-->
                    <div class="scb-content">
                        <p class="seller">
                            <i class="iconfont ion-ios-cart color-dark"></i>
                            <!--<span color="#4a4a4a"> 宝贝由{{store.store_name}} 发货</span>-->
                            <!--<span v-if="address_api.content[key] > 0" style="color:#ff464e">运费：￥{{address_api.content[key]}}</span>-->
                            <!--<span v-else>运费：包邮</span>-->
                            <span>运费：{{data.freight | price_jiao}}</span>
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
                    <li :class="{'active' : payment.channel === 'wxpay'}"
                        @click="payment_channel('wxpay')">
                        <img src="../../../assets/images/icon_wx.png">
                        <span>微信</span>
                        <span class="payway-tips-ad">推荐</span>
                        <i class="pay-type-radio"></i>
                    </li>
                    <li :class="{'active' : payment.channel === 'alipay'}"
                        @click="payment_channel('alipay')">
                        <img src="../../../assets/images/icon_ali.png">
                        <span>支付宝</span>
                        <!--<span class="payway-tips-text"></span>-->
                        <i class="pay-type-radio"></i>
                    </li>
                    <li :class="{'active' : payment.channel === 'wallet'}"
                        @click="payment_channel('wallet')">
                        <img style="border-radius: 5px;" src="../../../assets/images/icon_wallet.png">
                        <span>钱包</span>
                        <badge :num="'￥:' + (this.balance || 0).toFixed(2)"></badge>
                        <!--<span class="payway-tips-text h">(余额：￥{{(this.balance || 0).toFixed(2)}})</span>-->
                        <i class="pay-type-radio"></i>
                    </li>
                </ul>
            </div>
            <div class="order_total order-amount-total">
                <div class="total-title">
                    应付金额
                    <span>¥：{{data.amount | price_jiao}}</span>
                </div>
                <p class="clear">
                    <span class="sp1">商品总额</span>
                    <span class="sp2">¥：{{data.total | price_jiao}}</span>
                </p>
                <p class="clear">
                    <span class="sp1">总运费</span>
                    <span class="sp2">¥：{{data.freight | price_jiao}}</span>
                </p>
            </div>
        </div>
        <div class="bag-total order_temai" v-if="page_show">
            <a class="go_pay" @click="go_pay()">去付款</a>
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
                data: {
                    total: 0,
                    freight: 0,
                    weight: 0,
                    goods: [],
                },
                balance: 0,
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
                payment: {
                    type: 2,
                    flag: false,
                    order_number: '',
                    channel: 'alipay',
                    ticket: {
                        alipay: null,
                        wxpay: null
                    }
                },
            }
        },
        filters: {
            // goods_spec: function (val) {
            //     if (val != null) {
            //         return val.join(";")
            //     }
            //
            // }
            price_jiao(value) {
                return parseFloat(value).toFixed(2);
            }
        },
        mounted() {
            //微信需获取openId
            if (this.is_wechat && !this.$api.l_get('open_id')) {
                this.$api.l_remove('token');
                this.$api.ck_login();
            }

            this.payment_channel(this.is_wechat ? "wxpay" : "alipay");
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
            is_wechat() {
                return /MicroMessenger/.test(window.navigator.userAgent);
            }
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
                this.$api.userAuthPost("order/resolve", {
                    goods: this.goods,
                    is_cart: this.is_cart,
                    // address_id: this.address.address_id,
                    // voucher: JSON.stringify(this.voucher)
                }, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.data = data;
                        this.page_show = true;
                        if (this.is_cart == 3)
                            this.order_number = data.order_number;
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
                });
                this.$api.userAuthGet('/user/info', rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.balance = data.balance;
                    })
                })
            },
            select_address() {
                this.modal.show()
            },
            payment_channel($channel) {
                if (this.payment.flag) {
                    $toast.show("支付启动中，请稍等...");
                    return;
                }
                if ($channel === "wxpay")
                    this.payment.channel = this.is_wechat ? "wxpay" : "alipay";
                else if ($channel === "alipay")
                    this.payment.channel = this.is_wechat ? "wxpay" : "alipay";//"alipay";
                else if ($channel === "wallet") {
                    if (this.data.amount > this.balance)
                        $toast.show("余额不足");
                    else
                        this.payment.channel = "wallet";
                }
            },
            go_pay() {
                if (!this.address) {
                    $toast.show("请选择收货地址");
                    return
                }
                if (this.order_number) {
                    $toast.show("正在启动支付");
                    if (this.payment.channel === "wallet")
                        this.payment_wallet();
                    else
                        this.payment_create();
                    return;
                }
                $loading.show();
                this.payment.flag = true;
                this.$api.userAuthPost("/order/create", {
                    goods: this.goods,
                    is_cart: this.is_cart,
                    // voucher: JSON.stringify(this.voucher),
                    address_id: this.address.id,
                    note: this.note
                }, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.order_number = data.order_number;
                        this.$store.commit('UPDATE_COMMON_DATA', {cart_view_data_reload: true});
                        $toast.show("下单成功，正在启动支付");
                        if (this.payment.channel === "wallet")
                            this.payment_wallet();
                        else
                            this.payment_create();
                    })
                })
            },
            payment_wallet() {
                this.$api.userAuthPost("/wallet/payment", {
                    order_number: this.order_number
                }, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        $router.replace({
                            name: 'order_pay_success',
                            params: {type: 2, channel: 'wallet', order_number: this.order_number}
                        });
                    }, err => {
                        this.payment.flag = false;
                    });
                });

            },
            payment_create() {
                // if (this.payment.flag) {
                //     $toast.show("支付启动中，请稍等...");
                //     return;
                // }
                // this.payment.flag = true;
                if (this.payment.ticket[this.payment.channel]) {
                    $toast.show("支付启动中，请稍等...");
                    this.payment_driver();
                    return;
                }
                let url = "/payment/" + this.payment.channel;
                if (this.is_wechat)
                    url += '?open_id=' + this.$api.l_get('open_id');
                this.$api.userAuthPost(url,
                    {order_number: this.order_number, type: 2},
                    rps => {
                        this.$api.responseFilter(rps.data, data => {
                            this.payment.flag = false;
                            if (this.payment.channel === "wxpay")
                                this.payment.ticket.wxpay = data.ticket;
                            else
                                this.payment.ticket.alipay = data.ticket;
                            this.payment_driver();
                        })
                    })
            },
            payment_driver() {
                if (this.payment.channel === "alipay") {
                    location.href = this.payment.ticket.alipay;
                    return;
                }
                //微信支付
                WeixinJSBridge.invoke("getBrandWCPayRequest",
                    // JSON.parse(JSON.stringify(this.payment.ticket.wxpay)),
                    this.payment.ticket.wxpay,
                    res => {
                        if (res.err_msg === "get_brand_wcpay_request:ok") {
                            // location.href = '/payment/info/wxpay/' + this.order_number;
                            $router.replace({
                                name: 'order_pay_success',
                                params: {type: 2, channel: 'wxpay', order_number: this.order_number}
                            });
                        } else if (res.errMsg) {
                            alert(res.errMsg);
                            this.payment.flag = false;
                        } else {
                            // alert("支付遇到错误");
                            alert(JSON.stringify(res));
                            this.payment.flag = false;
                        }
                    }
                );
            }
            // select_order_voucger(list, store_voucher_info, store_id, store_name) {
            //     this.order_store_voucher_list_data = list;
            //     this.order_store_voucher_info = store_voucher_info;
            //     this.order_store_voucher_list_name = store_name;
            //     this.order_store_voucher_list_show = true
            // }
        }
    }
</script>
