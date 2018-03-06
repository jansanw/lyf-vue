<template lang="html">
    <div class="page">
        <div class="order-manage list">
            <div class="top-fixed">
                <div class="nav-tab-top">
                    <ul class="aui-border-b">
                        <template v-for="(item,index) in tabs">
                            <li :class="{'cur':index==active}" @click="go_orderlist(index)">{{item}}</li>
                        </template>
                    </ul>
                </div>
            </div>

            <scroll class="page-content" ref="lyf_scroll" :on-refresh="onRefresh" :on-infinite="onInfinite"
                    v-show="init">
                <div class="">
                    <ul class="order-list" v-if="order_list.length>0">
                        <li v-for="order in order_list" style="margin-bottom:.27rem;" class="aui-border-b">
                            <div class="module storage"></div>
                            <div class="module seller">
                                <div class="o-t-title-shop">
                                    <div class="tcont">
                                        <div class="ico" style="width:auto">
                                            单号：{{order.order_number}}
                                            <!--<img v-lazy="order.order_store.store_avatar">-->
                                        </div>
                                        <div class="contact">
                                            <a>
                                                <!--<p class="title">{{order.order_store.store_name}}</p>-->
                                                <p class="" style="margin-left:.13rem;">

                                                    <!--<span class="ion-chevron-right"></span>-->
                                                </p>
                                            </a>
                                        </div>
                                        <div class="state">
                                            <div class="state-cont">
                                                <p class="h" style="width:auto;" v-if="!order.if_lock">
                                                    <!--{{status_text[order.status]}}</p>-->
                                                    {{order.status|order_status}}</p>
                                                <p class="h" style="width:auto;" v-else>退款退货中</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="module" @click="go_order_detail(order.id)"
                                 v-for="goods in order.goods" style="border-bottom:1px solid #ffffff;">
                                <div class="item-list o-t-item">
                                    <div class="item-img">
                                        <p><img class="" :src="goods.cover"></p>
                                    </div>
                                    <div class="item-info">
                                        <h3 class="title">{{goods.name}}</h3>
                                        <p class="sku" style="min-height:0;">{{goods.stock_name}}</p>
                                    </div>
                                    <div class="item-pay">
                                        <div class="item-pay-data">
                                            <p class="price">￥{{goods.price}}</p>
                                            <p class="price">
                                                <del class="">￥{{goods.price_market}}</del>
                                            </p>
                                            <p class="nums">x{{goods.number}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="module serviceinfo" id="serviceinfo6"></div>-->
                            <!--<div class="module"></div>-->
                            <div class="module pay">
                                <div class="o-total-price">
                                    <div class="cont"><span>共
                                        <b>{{order.goods.length}}</b>件商品</span>
                                        <span>合计:<b>￥{{order.total}}</b></span>
                                        <span>(含运费<b>￥{{order.freight}}</b>)</span></div>
                                </div>
                            </div>
                            <div class="module orderop" v-if="order.status !=2">
                                <div class="o-tab-btn">
                                    <ul>
                                        <li class="h" v-if="order.status==3"
                                            @click="order_receive(order.id)"> 确认收货
                                        </li>
                                        <li class="h" v-if="order.status==4"
                                            @click="$router.push({name:'order_rate',params:{id:order.id}})">
                                            评价订单
                                        </li>
                                        <li class="" v-if="order.status==3 || order.status==4"
                                            @click="$router.push({name:'order_logistics',params:{id:order.id}})">
                                            查看物流
                                        </li>
                                        <li class="h" v-if="order.status==1" @click="buy_now(order.id)"> 立即付款 </li>
                                        <li class="" v-if="order.status==1" @click="order_cancel(order.id)">
                                            取消订单
                                        </li>
                                        <li class="" v-if="order.status==0"> 删除订单</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div v-else class="text-center" style="margin-top:200px;">
                        <p><i class="ion-ios-list-outline color-royal text-80"></i></p>
                        <p>暂无数据</p>
                    </div>
                </div>
                <div v-if="!load_more" slot="infinite" class="text-center">
                    <template v-if="order_list.length>0">
                        没有更多数据
                    </template>
                    <!--<template v-else>暂无数据...</template>-->
                </div><!--要放在scroll内最外层-->
            </scroll>
        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex';
    import "../../../assets/order.scss";

    export default {
        name: "order_list",
        data() {
            return {
                //订单状态 1：待支付； 2：待发货； 3：待收货； 4：待评价； 5：已完成； 6：申请退款；7：已退款；
                tabs: ['全部', '待付款', '待发货', '待收货', '待确认'],
                // state_type: ['all', 'dfk', 'dfh', 'dsh', 'dpj'],
                status_text: ["交易关闭", "等待买家付款", "等待卖家发货", "卖家已发货", "交易成功"],
//      active:0,
//      order_list: [],
//      pages:[1,1,1,1,1],
//      load_more: [true,true,true,true,true],
                loading: false,
//      st:0,
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                let id = vm.$route.params.type;
                // vm.active = id;
                vm.$store.commit('ORDERLIST_UPDATE', {active: id});
//      vm.loading=true
                vm.getData(() => {
                    //vm.$refs.lyf_scroll.infiniteDone()
                });
            })
        },
        mounted() {
//    $loading.show()
        },
        computed: {
            ...mapState({
                active: state => state.orderlist.active,
                order_list: state => state.orderlist.list[state.orderlist.active].order_list,
                page: state => state.orderlist.list[state.orderlist.active].page,
                load_more: state => state.orderlist.list[state.orderlist.active].load_more,
                init: state => state.orderlist.list[state.orderlist.active].init,
            })
        },
        methods: {
            getData(done) {
                // this.loading = false;
                // this.$store.commit('ORDERLIST_GETDATA_CALLBACK', {
                //     //mock
                //     //state.list[state.active].order_list = payload.ret.data.data.data
                //     ret: {
                //         data: {
                //             data: {
                //                 data: [
                //                     {
                //                         order_store: {
                //                             store_avatar: "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/bad7373fe7d6e15364d74ae0473358d7_121_121.jpg",
                //                             store_name: "苏宁"
                //                         },
                //                         if_lock: 0,
                //                         status: 20, /*30:确认收货,40:评价订单,10:取消订单,0:删除订单*/
                //                         id: 666,
                //                         order_goods: [
                //                             {
                //                                 goods_image_url: "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/bad7373fe7d6e15364d74ae0473358d7_121_121.jpg",
                //                                 goods_name: "抱枕",
                //                                 goods_spec: "红色，大大的",
                //                                 goods_price: 99,
                //                                 goods_marketprice: 999,
                //                                 goods_num: 1
                //                             }
                //                         ],
                //                         goods_count: 1,
                //                         order_amount: 99,
                //                         shipping_fee: 8,
                //                     }
                //                 ]
                //             }
                //         }
                //     }
                // });
                // this.loading = false;
                // this.$nextTick(() => {
                //     $loading.hide();
                //     done()
                // });
                // return;
                if (!this.load_more) return;
                $loading.show();
                // console.log('!load_more=', !this.load_more, 'loading=', this.loading, 'pages=', this.page);
//      if (this.page == 1) {
//        $loading.show()
//      }
//                 let condition = '&state_type=' + this.active || '';
                //console.log('this.active=',this.active,'condition=',condition)
                this.$api.userAuthGet("order/page?page=" + this.page + '&status=' + this.active || '',
                    rps => {
                        this.$api.responseFilter(rps.data, data => {
                            this.$store.commit('ORDERLIST_GETDATA_CALLBACK', {data: data});
                            this.loading = false;
                            this.$nextTick(() => {
                                $loading.hide();
                                done();
                            });
                        });
//                     res => {
//                         console.log(res);
//
//                         if (res.data.status_code === 1) {
//                             this.$store.commit('ORDERLIST_GETDATA_CALLBACK', {ret: res});
// //          if (this.page == 1) {
// //            this.order_list = res.data.data.data
// //          } else {
// //            for(var i in res.data.data.data){
// //              this.order_list.push(res.data.data.data[i])
// //            }
// //
// //          }
// //          if(res.data.data.last_page==res.data.data.current_page){
// //            this.$set(this.load_more,this.active,false)
// //          }else{
// //            this.$set(this.load_more,this.active,true)
// //          }
//                         }
//                         this.loading = false;
//                         this.$nextTick(() => {
//                             $loading.hide();
//                             done()
//                         })
//                     }, error => {

                    })

            },
            onRefresh(done) {
                if (this.loading) return;
//      this.page = 1
//      this.load_more = true
                this.$store.commit('ORDERLIST_UPDATE_LIST', {page: 1});
                this.$store.commit('ORDERLIST_UPDATE_LIST', {load_more: true});
                this.getData(done)
            },
            onInfinite() {
//      this.$set(this.pages,this.active,this.page+1)
                this.$store.commit('ORDERLIST_UPDATE_LIST', {page: this.page + 1});
                console.log('pages=', this.page, 'load_more=', this.load_more);
                if (this.load_more) {
                    this.getData(() => {
                        //this.$refs.lyf_scroll.infiniteDone()
                    })
                }
            },
//    onScrollListener(res) {
//      this.st = res
//    },
            go_order_detail(id) {
                $router.push({
                    name: "order_detail",
                    params: {
                        id: id
                    }
                })
            },
            order_cancel(id, text = '', show = true) { //取消订单
                if (show) {
                    $actionSheet.show({
                        // theme: 'weixin',
                        title: '请点击取消理由',
                        cancelText: '取消',
                        buttons: {
                            '我不想买了': () => {
                                this.order_cancel(id, '我不想买了', false)
                            },
                            '信息填写错误，重新拍': () => {
                                this.order_cancel(id, '信息填写错误，重新拍', false)
                            },
                            // '卖家缺货': () => {
                            //     this.order_cancel(id, '卖家缺货', false)
                            // },
                            // '同城见面交易': () => {
                            //     this.order_cancel(id, '同城见面交易', false)
                            // },
                            '其他原因': () => {
                                this.order_cancel(id, '其他原因', false)
                            }
                        }
                    })
                } else {
                    $actionSheet.hide();
                    $loading.show();
                    this.$api.userAuthPost("order/cancel", {
                        id: id,
                        note: text
                    }, rps => {
                        this.$api.responseFilter(rps.data, data => {
                            this.$store.commit('ORDER_LIST_UPDATE_LIST_STATUS', {id: id, value: 0});
                        })
                        // }, res => {
                        //     if (res.data.status_code == 1) {
                        //         $loading.hide();
                        //         this.order_list.filter(a => {
                        //             return a.id === id
                        //         }).map(a => {
                        //             a.status = 0
                        //         })
                        //     } else {
                        //         $toast.show(res.data.message)
                        //     }
                        // }, error => {
                        //     $toast.show(error.message)
                    })
                }
            },
            order_receive(id) { //确认收货
                $dialog.confirm({
                    // theme: 'ios',
                    title: '确认收货?',
                    // cancelText: '取消',
                    // okText: '确定'
                }).then((res) => {
                    if (res) {
                        $loading.show();
                        this.$api.userAuthGet("order/receive?id=" + id,
                            rps => {
                                this.$api.responseFilter(rps.data, data => {
                                    this.$store.commit('ORDER_LIST_UPDATE_LIST_STATUS', {id: id, value: 5});
                                })
                            })
                    }
                })
            },
            go_orderlist(id) {
                //this.active=id
                this.$store.commit('ORDERLIST_UPDATE', {active: id})
            },
            buy_now(id){
                $router.push({
                    name: 'order_buynow',
                    params: {
                        goods: id,
                        is_cart: 3,
                        address_id: 0
                    }
                });
            }
//    go_orderlist(id) {
//      $router.push({
//        name: 'order_list',
//        params: {
//          type: id
//        }
//      })
//    }
        },
        watch: {
            active(val, oldVal) {
                if (!this.init) {
                    this.loading = true;
                    this.getData(() => {
                        // this.$refs.lyf_scroll.infiniteDone()
                    })
                }

            }
        },
        filters: {
            order_status(val, typr = 1) {
                let text = '';
                let class_name = '';
                switch (val) {
                    case 0:
                        text = '交易关闭';
                        break;
                    case 1:
                        text = '等待买家付款';
                        break;
                    case 2:
                        text = '等待卖家发货';
                        break;
                    case 3:
                        text = '卖家已发货';
                        break;
                    case 4:
                        text = '交易成功';
                        break;
                }
                return text
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/config.scss";

    .top-fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9;
    }

    .order-manage .nav-tab-top ul {
        display: flex;
        /*background: #fff;
        border-bottom: 0.01rem solid #e7e7e7;*/
    }

    .order-manage .nav-tab-top ul li {
        height: 1.067rem;
        line-height: 1.067rem;
        /*margin-bottom: -0.01rem;*/
        text-align: center;
        font-size: 0.37rem;
        font-weight: 400;
        flex-grow: 1;
        flex-shrink: 0;
    }

    .order-manage .nav-tab-top ul .cur {
        border-bottom: 0.01rem solid $color-theme;
        box-sizing: border-box;
        color: $color-theme;
        font-weight: bold;
    }
</style>
