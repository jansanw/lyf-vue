<style lang="css">
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

    .scb-content .activate-box .amount {
        color: #ff464e;
        text-align: center;
        height: 2.07rem;
        font-size: 1.5rem;
    }

    .amount::-webkit-input-placeholder {
        font-size: .5rem;
    }
</style>

<template lang="html">
    <div class="page">
        <div class="page-content" style="margin-bottom:1.33rem">
            <div class="nav-tab-top">
                <ul>
                    <li class="cur">钱包充值</li>
                </ul>
            </div>
            <section class="shopping-confirm-box">
                <div class="scb-list" id="scbList" style="display: block;">
                    <!--入仓商品列表-->
                    <div class="scb-content">
                        <div class="activate-box">
                            <!--:name="key" v-model="pay_massage[key]"-->
                            <input type="number" class="activate-key amount" v-model.number="amount"
                                   maxlength="50" placeholder="输入充值金额" autocomplete="off">
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
                </ul>
            </div>
        </div>
        <div class="bag-total order_temai">
            <a class="go_pay" @click="go_pay()">去付款</a>
        </div>
    </div>
</template>

<script>
    import "../../../assets/buy-now.scss";

    export default {
        name: "charge",
        data() {
            return {
                amount: '',
                order_amount: 0,
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
        mounted() {
            //微信需获取openId
            if (this.is_wechat && !this.$api.l_get('open_id')) {
                this.$api.l_remove('token');
                this.$api.ck_login();
            }

            this.payment_channel(this.is_wechat ? "wxpay" : "alipay");
        },
        watch: {
            amount(val) {
                if (!val)
                    return;
                if (val < 0)
                    this.amount = '';
                if (!/\d+\.\d{2}/.test(val.toString()))
                    this.amount = val.toFixed(2);
            }
        },
        computed: {
            is_wechat() {
                return /MicroMessenger/.test(window.navigator.userAgent);
            }
        },
        methods: {
            payment_channel($channel) {
                if (this.payment.flag) {
                    $toast.show("支付启动中，请稍等...");
                    return;
                }
                if ($channel === "wxpay")
                    this.payment.channel = this.is_wechat ? "wxpay" : "alipay";
                else if ($channel === "alipay")
                    this.payment.channel = this.is_wechat ? "wxpay" : "alipay";
                else
                    this.payment.channel = "wallet";
            },
            go_pay() {
                if (parseFloat(this.amount || 0) <= 0) {
                    $toast.show("请输入金额");
                    return;
                }
                if (this.order_number) {
                    $toast.show("正在启动支付");
                    this.payment_create();
                    return;
                }
                $loading.show();
                this.payment.flag = true;
                this.$api.userAuthPost("/wallet/create", {
                    amount: parseFloat(this.amount)
                }, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.order_number = data.order_number;
                        this.$store.commit('UPDATE_COMMON_DATA', {cart_view_data_reload: true});
                        $toast.show("下单成功，正在启动支付");
                        this.payment_create();
                    })
                })
            },
            payment_create() {
                if (this.payment.ticket[this.payment.channel]) {
                    $toast.show("支付启动中，请稍等...");
                    this.payment_driver();
                    return;
                }
                let url = "/payment/" + this.payment.channel;
                if (this.is_wechat)
                    url += '?open_id=' + this.$api.l_get('open_id');
                this.$api.userAuthPost(url,
                    {order_number: this.order_number, type: 1},
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
                            $router.replace({
                                name: 'order_pay_success',
                                params: {type: 1, channel: 'wxpay', order_number: this.order_number}
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
        }
    }
</script>
