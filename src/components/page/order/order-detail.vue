<style lang="css">


</style>

<template lang="html">

    <div class="page">
        <div class="">
            <div class="order-manage detail" v-if="page_show">
                <div class="order">
                    <ul class="order-list">
                        <li>
                            <div class="module status">
                                <div class="seller-state" style="background: #EA5A49;">
                                    <div class="state-cont">
                                        <p class="h text-0" v-if="!order_info.if_lock">
                                            {{status_text[order_info.status]}}</p>
                                        <p class="h text-0" v-else>
                                            退款退货中..
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!--快递-->
                            <div class="module logisticsholder" v-if="false">
                                <div class="o-t-contmsg express">
                                    <div class="ico"><span class="ion-planet"></span></div>
                                    <div class="cont">
                                        <h5>
                                            <div>[南宁市]【已签收，签收人是拍照签收】，感谢使用百世快递，期待再次为您服务</div>
                                            <div></div>
                                        </h5>
                                        <div class="subtime">2017-05-17 10:00:53</div>
                                    </div>
                                    <div class="arrow">
                                        <p><span class="icon-right"></span></p>
                                    </div>
                                </div>
                            </div>

                            <div class="module address">
                                <div class="o-t-contmsg">
                                    <div class="ico"><span class="ion-location"></span></div>
                                    <div class="cont">
                                        <h5 class="">
                                            <span>收货人：{{order_info.address.name}}</span>
                                            <span>{{order_info.address.mobile}}</span>
                                        </h5>
                                        <div class="submsg">收货地址：{{order_info.address.area}}
                                            {{order_info.address.street}}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--<div class="module seller">-->
                            <!--<div class="o-t-title-shop">-->
                            <!--<div class="tcont">-->
                            <!--<div class="ico">-->
                            <!--<img :src="order_info.store_info.store_avatar">-->
                            <!--</div>-->
                            <!--<div class="contact">-->
                            <!--<a>-->
                            <!--<p class="title">{{order_info.store_info.store_name}}</p>-->
                            <!--<p class="" style="margin-left:.13rem;"><span-->
                            <!--class="ion-chevron-right"></span></p>-->
                            <!--</a>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->

                            <div class="module o_item">
                                <div class="item-list o-t-item" v-for="goods in order_info.goods">
                                    <div class="item-img">
                                        <p><img class="" v-lazy="goods.cover" data-src-checked="true"></p>
                                    </div>
                                    <div class="item-info">
                                        <h3 class="title">{{goods.name}}</h3>
                                        <p class="sku">{{goods.stock_name}}</p>
                                    </div>
                                    <div class="item-pay">
                                        <div class="item-pay-data">
                                            <p class="price">￥{{goods.price}}</p>
                                            <p class="price">
                                                <del class="">￥{{goods.price_market}}</del>
                                            </p>
                                            <p class="nums">x{{goods.number}}</p>
                                        </div>
                                        <div class="item-pay-btn">
                                            <!--<a class="h" v-if="order_info.status==20" @click="go_refund_start(order_info.id,goods.goods_id,'tuikuan')"> 退款 </a>-->
                                            <a class="h" v-if="order_info.status==3"
                                               @click="go_refund_start(order_info.id,goods.id,'tuihuo')">
                                                退货 </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="module  paydetail">
                                <div class="order-price-freight">
                                    <dl>
                                        <dt>运费：</dt>
                                        <dd>￥{{order_info.freight}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>实付款（含运费）：</dt>
                                        <dd class="h">￥{{order_info.total}}</dd>
                                    </dl>
                                    <dl>
                                        <dt style="width: 10%">备注：</dt>
                                        <dd style="text-align: left">{{order_info.note_buy}}</dd>
                                    </dl>
                                </div>
                            </div>

                            <!--<div class="module  talkseller" v-if="false">-->
                            <!--<div class="order-tablink o-t-tablink">-->
                            <!--<div class="cont ww" data-nick="">-->
                            <!--<p><span class="ico ion-chatbubbles"></span></p>-->
                            <!--<p><span>联系卖家</span></p>-->
                            <!--</div>-->
                            <!--<a class="cont phone" href="tel:">-->
                            <!--<p><span class="ico ion-ipad"></span></p>-->
                            <!--<p><span>卖家电话</span></p>-->
                            <!--</a>-->
                            <!--</div>-->
                            <!--</div>-->

                            <div class="module  orderinfo" style="padding-bottom: 70px;">
                                <div class="order-box order-message">
                                    <p class="">订单编号：{{order_info.order_number}}</p>
                                    <p class="">支付方式：{{order_info.trade_no}}</p>
                                    <p class="">交易号：{{order_info.trade_no}}</p>
                                    <p class="">创建时间：{{order_info.create_time}}</p>
                                    <p class="" v-if="order_info.payment_time != ''">
                                        付款时间：{{order_info.payment_time}}</p>
                                    <p class="" v-if="order_info.finnshed_time != ''">
                                        收货时间：{{order_info.finnshed_time}}</p>
                                </div>
                            </div>

                            <div class="module orderop" style="background:#f7f7f7;" v-if="!order_info.if_lock">
                                <div class="o-tab-btn">
                                    <ul>
                                        <li class="h" v-if="order_info.status==3"
                                            @click="order_receive(order_info.id)"> 确认收货
                                        </li>
                                        <li class="h" v-if="order_info.status==4"
                                            @click="$router.push({name:'order_rate',params:{id:order_info.id}})">
                                            评价订单
                                        </li>
                                        <li class="" v-if="order_info.status==3 || order_info.status==4"
                                            @click="$router.push({name:'order_logistics',params:{id:order_info.id}})">
                                            查看物流
                                        </li>
                                        <li class="" v-if="order_info.status==2"
                                            @click="confirm_cancel(order_info.id)"> 取消订单全部退款
                                        </li>
                                        <li class="h" v-if="order_info.status==1" @clik="buy_now(order_info.id)"> 立即付款</li>
                                        <li class="" v-if="order_info.status==1"
                                            @click="order_cancel(order_info.id)"> 取消订单
                                        </li>
                                        <li class="" v-if="order_info.status==0"> 删除订单</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import "../../../assets/order.scss"

    export default {
        name: "order_detail",
        data() {
            return {
                order_info: [],
                id: 63,
                page_show: false,
                status_text: ["交易关闭", "等待买家付款", "等待卖家发货", "卖家已发货", "交易成功"],
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            $loading.show();
            this.getData()
        },
        methods: {
            getData() {
                // //mock
                //
                // this.order_info = {
                //
                //     order_number: "6666666",
                //     order_pay: {
                //         pay_sn: "alipay999999999"
                //     },
                //     order_amount: 99,
                //     shipping_fee: 8,
                //     add_time: "09:50",
                //     payment_time: "09:55",
                //     finnshed_time: "09:55",
                //     status: 40,
                //     if_lock: 0,
                //     order_text: "订单完成~",
                //     reciver_name: "收货人",
                //     reciver_phone: "1588********",
                //     reciver_addr: "广州科密...",
                //     store_info: {
                //         store_avatar: "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/bad7373fe7d6e15364d74ae0473358d7_121_121.jpg",
                //         store_name: "苏宁"
                //     },
                //     order_goods: [
                //         {
                //             goods_image_url: "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/bad7373fe7d6e15364d74ae0473358d7_121_121.jpg",
                //             goods_name: "抱枕",
                //             goods_spec: "红色，大大的",
                //             goods_price: 99,
                //             goods_marketprice: 999,
                //             goods_num: 1
                //         }
                //     ],
                //
                //
                // };
                // this.page_show = true;
                // $loading.hide();
                //
                //
                // return;
                this.$api.userAuthGet("order/detail?id=" + this.id,
                    rps => {
                        this.$api.responseFilter(rps.data, data => {
                            this.order_info = data;
                            this.page_show = true;
                        });
                        //     res => {
                        //     if (res.data.status_code === 1) {
                        //         this.order_info = res.data.data;
                        //         this.page_show = true;
                        //     }
                        //     $loading.hide();
                        // }, error => {
                        $loading.hide();
                    })
            },
            go_refund(id, goods_id, type) {
                $router.push({
                    name: "order_refund",
                    params: {
                        id: id,
                        goods_id: goods_id
                    },
                    query: {
                        type: type
                    }
                });
            },
            go_refund_start(id, goods_id, type) {
                $router.push({
                    name: "order_refund_start",
                    params: {
                        id: id,
                        goods_id: goods_id
                    },
                    //        query:{
                    //          type:type
                    //        }
                });
            },
            confirm_cancel(id) {
                $dialog.confirm({
                    theme: 'ios',
                    title: '确定要取消订单全部退款吗？',
                    cancelText: '取消',
                    okText: '确定'
                }).then((res) => {
                    console.log('confirm result: ', res);
                    if (res === true) {
                        //取消订单
                        this.cancel(id)
                    }
                })
            },
            cancel(id) {
                $loading.show('');
                this.$api.userAuthPost("add_refund_all", {
                    id: id,
                    buyer_message: ''
                }, res => {
                    $loading.hide();
                    if (res.data.status_code === 1) {
                        //          $toast.show('取消订单全部退款申请成功',2000)
                        /* Alert 警告框 */
                        $dialog.alert({
                            theme: 'ios',
                            title: '取消订单全部退款申请成功!',
                            okText: '确定',
                            okTheme: 'assertive'
                        }).then(() => {
                            this.$router.go(-1)
                        });
                    }

                }, error => {
                    $loading.hide()
                })
            },
            buy_now(id){
                $router.push({
                    name: 'order_buynow',
                    params: {
                        goods: this.id,
                        is_cart: 3,
                        address_id: 0
                    }
                });
            }

        }
    }
</script>
