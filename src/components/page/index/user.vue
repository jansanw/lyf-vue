<template lang="html">
    <div class="page has-tabbar">
        <scroll class="page-content" style="top: -1.1rem;" :on-refresh="onRefresh" v-if="page_show">
            <div class="personal-head head-bg-img">
                <img alt="" v-lazy="data.user.avatar">
                <div class="p-head-info">
                    <p class="p-nickname">{{data.user.name}}
                        <span class="von-badge" @click="loginOut()">
                            <div class="von-badge-num">注 销</div>
                        </span>
                    </p>
                    <p class="p-platform">
                        普通会员
                        <template v-if="$api.l_get('token')">@微信</template>
                    </p>
                    <!--<p class="p-platform" v-else>未绑定微信</p>-->
                </div>
            </div>

            <div class="personal-numbers hm-margin-b">
                <!-- @click='this.$router.push({name:"message_list"})'-->
                <div class="personal-numbers-item">
                    <div class="number"><span>￥</span>{{(data.user.consume || 0).toFixed(2)}}</div>
                    <div class="number-title">消费</div>
                </div>
                <div class="personal-numbers-item" @click='this.$router.push({name:"my_money"})'>
                    <div class="number"><span>￥</span>{{(data.user.balance || 0).toFixed(2)}}</div>
                    <div class="number-title">钱包</div>
                </div>
                <!--<div class="personal-numbers-item" id="friend" @click='go_friend_list(0)'>-->
                <!--<div class="number">256</div>-->
                <!--<div class="number-title">好友</div>-->
                <!--</div>-->
            </div>

            <ul class="aui-list aui-list-in">
                <li class="aui-list-item " style="min-height: 44px;">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-title">订 单</div>
                        <!--<div class="aui-list-item-right" @click="go_order_list(0)"-->
                        <!--style="color: #aaa;display: flex;align-items: center;">查看更多 -->
                        <!--<i class="ion-ios-arrow-right" style="color: #DDD;margin-left: 5px;"></i>-->
                        <!--</div>-->
                    </div>
                </li>
            </ul>

            <!--<div class="personal-orders">-->
            <!--<div class="p-orders">-->
            <!--<span class="p-all-orders">我的订单</span>-->
            <!--<span class="p-all-orders-span" @click="go_order_list(0)">查看更多 <i class="ion-ios-arrow-right"></i></span>-->
            <!--</div>-->
            <!--</div>-->
            <div class="personal-wrapper-1 hm-margin-b">
                <div class="p-wrapper-1-item" @click="go_order_list(0)">
                    <div class="p-grouping"><i class="iconfont icon-yichengtuan"></i></div>
                    <p class="p-wrap-1-title">
                        全部订单
                    </p>
                </div>
                <div class="p-wrapper-1-item" @click="go_order_list(1)">
                    <div class="p-unpaid">
                        <i class="iconfont icon-daifukuan"></i>
                        <span v-if="data.order_count[1] > 0">{{data.order_count[1]}}</span>
                    </div>
                    <p class="p-wrap-1-title">
                        待付款
                    </p>
                </div>
                <div class="p-wrapper-1-item" @click="go_order_list(2)">
                    <div class="p-unshipping">
                        <i class="iconfont icon-wuliu"></i>
                        <span v-if="data.order_count[2] > 0">{{data.order_count[2]}}</span>
                    </div>
                    <p class="p-wrap-1-title">
                        待发货
                    </p>
                </div>
                <div class="p-wrapper-1-item" @click="go_order_list(3)">
                    <div class="p-unreceived">
                        <i class="iconfont icon-daishouhuo"></i>
                        <span v-if="data.order_count[3] > 0">{{data.order_count[3]}}</span>
                    </div>
                    <p class="p-wrap-1-title">
                        待收货
                    </p>
                </div>
                <div class="p-wrapper-1-item" @click="go_order_list(4)">
                    <div class="p-unrated">
                        <i class="iconfont icon-daipingjia"></i>
                        <span v-if="data.order_count[4] > 0">{{data.order_count[4]}}</span>
                    </div>
                    <p class="p-wrap-1-title">
                        待评价
                    </p>
                </div>
            </div>

            <!--<ul class="aui-list aui-list-in">-->
            <!--<li class="aui-list-item " style="min-height: 44px;">-->
            <!--<div class="aui-list-item-inner">-->
            <!--<div class="aui-list-item-title">工 具</div>-->
            <!--<div class="aui-list-item-right" @click="go_order_list(0)"-->
            <!--style="color: #aaa;display: flex;align-items: center;">查看更多 -->
            <!--<i class="ion-ios-arrow-right" style="color: #DDD;margin-left: 5px;"></i>-->
            <!--</div>-->
            <!--</div>-->
            <!--</li>-->
            <!--</ul>-->

            <div class="personal-wrapper-2" style="margin-top: 0">
                <!--<div class="p-wrapper-2-item" @click='this.$router.push({name:"message_list"})'>-->
                <!--<div class="p-messages"><i class="iconfont icon-xiaoxi1 color-assertive"></i></div>-->
                <!--<p class="p-wrap-2-title">我的消息</p>-->
                <!--</div>-->
                <div class="p-wrapper-2-item" @click='this.$router.push({name:"charge"})'>
                    <div class="p-coupons"><i class="iconfont icon-coupon color-positive"></i></div>
                    <p class="p-wrap-2-title">钱包充值</p>
                </div>
                <!--<div class="p-wrapper-2-item" @click='this.$router.push({name:"my_voucher"})'>-->
                <!--<div class="p-coupons"><i class="iconfont icon-coupon color-positive"></i></div>-->
                <!--<p class="p-wrap-2-title">我的优惠券</p>-->
                <!--</div>-->
                <div class="p-wrapper-2-item" @click='this.$router.push({name:"favorite"})'>
                    <div class="p-likes"><i class="iconfont icon-ai-mark color-calm"></i></div>
                    <p class="p-wrap-2-title">收藏夹</p>
                </div>
                <div class="p-wrapper-2-item" @click='this.$router.push({name:"order_refund_list"})'>
                    <div class="p-after-sales"><i class="iconfont icon-tuikuan1 color-balanced"></i></div>
                    <p class="p-wrap-2-title">退款/售后</p>
                </div>
            </div>
            <!--<div class="personal-wrapper-2 hm-margin-b" style="margin-top: 0">-->
            <!--<div class="p-wrapper-2-item" @click='this.$router.push({name:"message_list"})'>-->
            <!--<div class="p-messages"><i class="iconfont icon-gerenzhongxin color-assertive"></i></div>-->
            <!--<p class="p-wrap-2-title">旧版会员中心</p>-->
            <!--</div>-->

            <!--</div>-->
            <!--<div class="" style="margin-bottom:.8rem;">-->
            <!--<div class="item item-divider">-->
            <!--必备工具-->
            <!--</div>-->
            <!--<item class="item-icon-left item-icon-right" style="padding-left: 11px;" @click.native='this.$router.push({name:"address"})'>-->
            <!--<i class="iconfont icon-dizhi"></i> 收货地址-->
            <!--<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>-->
            <!--</item>-->
            <!--<item class="item-icon-left item-icon-right" style="padding-left: 11px;">-->
            <!--<i class="iconfont icon-shezhi"></i> 设置-->
            <!--<i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>-->
            <!--</item>-->

            <!--</div>-->

            <!--<div class="item item-divider">-->
            <!--必备工具-->
            <!--</div>-->

            <ul class="aui-list hm-margin-b" style="margin-bottom:.8rem;"><!--@click="add"-->
                <li class="aui-list-item aui-list-item-middle" @click='this.$router.push({name:"address"})'>
                    <div class="aui-list-item-label-icon">
                        <i class="iconfont icon-dizhi"></i>
                    </div>
                    <div class="aui-list-item-inner ">
                        收货地址
                        <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
                    </div>
                </li>
                <li class="aui-list-item aui-list-item-middle" @click='this.$router.push({name:"setting"})'>
                    <div class="aui-list-item-label-icon">
                        <i class="iconfont icon-shezhi"></i>
                    </div>
                    <div class="aui-list-item-inner ">
                        设置
                        <i class="icon ion-ios-arrow-right" style="color: #DDD;"></i>
                    </div>
                </li>
            </ul>
        </scroll>
        <footnav :active="3"></footnav>
    </div>
</template>

<script>
    import footnav from '../../layout/footnav';

    export default {
        components: {
            footnav
        },
        data() {
            return {
                data: {
                    user: {},
                    order_count: {},
                },
                page_show: false,
                is_load: false
            }
        },
        mounted() {
            this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
                user: true,
            });
            // this.getData(() => {
            // });
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getData(() => {
                });
            })
        },
        methods: {
            loginOut() {
                this.$api.l_remove('token');
                this.$api.l_remove('open_id');
                $router.push('home');
            },
            getData(done) {
                this.is_load = true;
                this.is_load = false;
                this.page_show = true;
                //mock
                // let _user = {
                //     user: {
                //         avatar: "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/bad7373fe7d6e15364d74ae0473358d7_121_121.jpg",
                //         nickname: "jansanw",
                //         user_wx: "888"
                //     },
                //     order_count: {
                //         order_no_pay_count: 1,
                //         order_no_send_count: 1,
                //         order_no_receipt_count: 1,
                //         order_no_eval_count: 1
                //     }
                // };
                // this.user = _user;
                //  return;
                this.$api.userAuthGet("user/info?brief=0", rps => {
                    this.$api.responseFilter(rps.data, function (data) {
                        if (!data.user.avatar)
                            data.user.avatar = "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/bad7373fe7d6e15364d74ae0473358d7_121_121.jpg";
                        this.data = data;
                        $loading.hide();
                        this.is_load = false;
                        this.page_show = true;
                        this.$store.commit('UPDATE_COMMON_DATA', {balance: data.user.balance});
                        done();
                    }.bind(this));
                }, error => {
                    $toast.show("加载失败")
                });
            },
            go_order_list(id) {
                $router.push({
                    name: 'order_list',
                    params: {
                        type: id
                    }
                })
            },
            go_friend_list(id) {
                $router.push({
                    name: 'friend_list',
                    params: {
                        id: id
                    }
                })
            },
            onRefresh(done) {
                if (this.is_load) return;
                this.getData(done)
            },
        }
    }
</script>

<style lang="scss">
    .head-bg-img {
        position: relative;
        background-image: url("../../../assets/images/personal_sprite_v10-59e86df834.png");
    }

    .bg-img,
    .head-bg-img,
    .personal-download-app .p-download-txt:before {
        background-repeat: no-repeat;
        background-size: 10.53rem 6.67rem;
    }

    .personal-head {
        background-position: 0 0;
        font-size: 0;
        height: 3.6rem;
        padding: 0.88rem 0 0 0.45rem;
        position: relative;
        width: 100%;
    }

    .personal-head img {
        border: 0.015rem solid rgba(255, 255, 255, .5);
        border-radius: 100%;
        display: inline-block;
        height: 1.71rem;
        position: relative;
        width: 1.71rem;
        vertical-align: top;
    }

    .personal-head .p-head-info {
        display: inline-block;
        margin: 0.4rem 0 0 0.43rem;
    }

    .personal-head .p-head-info .p-nickname {
        color: #fff;
        font-size: 0.43rem;
        line-height: 0.43rem;
    }

    .personal-head .p-head-info .p-platform {
        color: #e5e5e5;
        font-size: 0.29rem;
        line-height: 0.29rem;
        margin-top: 0.16rem;
    }

    .personal-head .p-head-refresh {
        background-position: -3.2rem -4.8rem;
        height: 0.73rem;
        position: absolute;
        right: 0.45rem;
        top: 0.4rem;
        width: 0.73rem;
    }

    .personal-orders {
        background-color: #fff;
        position: relative;
        width: 100%;
    }

    .personal-orders .p-orders {
        height: 1.2rem;
        line-height: 1.2rem;
        margin-left: 0.32rem;
        overflow: hidden;
        position: relative;
        border-bottom: 0.025rem solid #ededed;
    }

    .personal-orders .p-orders .p-all-orders {
        color: #151516;
        float: left;
        font-size: 0.43rem;
    }

    .personal-orders .p-orders .p-all-orders-span,
    .personal-orders .p-orders .p-unpaied-orders {
        color: #9c9c9c;
        float: right;
        font-size: 0.35rem;
        margin-right: 0.27rem;
    }

    .personal-orders .p-orders .p-unpaied-orders b {
        color: #e02e24;
        font-weight: 500;
    }

    .personal-orders .p-orders .p-unpaied-orders:before {
        width: 0.16rem;
        height: 0.16rem;
        background-color: #f8453e;
        content: '';
        display: inline-block;
        margin-right: 0.05rem;
        border-radius: 0.08rem;
    }

    .p-bubble,
    .personal-list,
    .personal-logout,
    .personal-wrapper-1,
    .personal-wrapper-2,
    .personal-wrapper-3 {
        background-color: #fff;
    }

    .personal-wrapper-1 {
        height: 1.76rem;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .personal-wrapper-1 .p-wrapper-1-item {
        position: relative;
        display: inline-block;
        float: left;
        height: inherit;
        text-align: center;
        width: 20%;
    }

    .personal-wrapper-1 .p-wrapper-1-item .p-complaint,
    .personal-wrapper-1 .p-wrapper-1-item .p-grouping,
    .personal-wrapper-1 .p-wrapper-1-item .p-unpaid,
    .personal-wrapper-1 .p-wrapper-1-item .p-unrated,
    .personal-wrapper-1 .p-wrapper-1-item .p-unreceived,
    .personal-wrapper-1 .p-wrapper-1-item .p-unshipping {
        height: 0.67rem;
        margin: 0.32rem auto 0.19rem;
        width: 0.67rem;
        i {
            font-size: 0.67rem;
            color: #666;
        }
    }

    .personal-wrapper-1 .p-wrapper-1-item .p-wrap-1-title {
        font-size: 12px;
        line-height: 1;
        position: relative;
        color: #666;
    }

    .personal-wrapper-2 {
        height: 2.03rem;
        margin-top: 0.27rem;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .personal-wrapper-2 .p-wrapper-2-item {
        display: inline-block;
        float: left;
        height: inherit;
        text-align: center;
        width: 25%;
    }

    .personal-wrapper-2 .p-wrapper-2-item .p-after-sales,
    .personal-wrapper-2 .p-wrapper-2-item .p-coupons,
    .personal-wrapper-2 .p-wrapper-2-item .p-footprint-big,
    .personal-wrapper-2 .p-wrapper-2-item .p-likes,
    .personal-wrapper-2 .p-wrapper-2-item .p-lotteries,
    .personal-wrapper-2 .p-wrapper-2-item .p-messages {
        height: 0.77rem;
        margin: 0.35rem auto 0.15rem;
        width: 0.77rem;
        i {
            font-size: 0.67rem;
        }
    }

    .personal-wrapper-2 .p-wrapper-2-item .p-wrap-2-title {
        font-size: 12px;
        line-height: 1;
        position: relative;
        color: #666;
    }

    .p-unpaid,
    .p-unrated,
    .p-unreceived,
    .p-unshipping {
        span {
            color: #ffffff;
            line-height: 0.37rem;
            padding: 0.0rem 0.11rem;
            border-radius: 0.13rem;
            position: absolute;
            background: #EA5A49;
            font-size: 0.27rem;
            top: 0.08rem;
            right: 20px;
            animation: myfirst 0.5s linear infinite;
            @keyframes myfirst {
                0% {
                    transform: translate(0px, 0px);
                }
                50% {
                    transform: translate(0px, -2px);
                }
                100% {
                    transform: translate(0px, 0px);
                }
            }
        }
    }

    .personal-numbers {
        display: flex;
        width: 100%;

        .personal-numbers-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #fff;
            /*height:70px;*/
            padding: 15px 0 10px;
            .number {
                font-size: 18px;
                margin-bottom: 2px;
                span {
                    font-size: 12px;
                }
            }
            .number-title {
                color: #333;
            }
        }

        #friend {
            display: none;
        }
    }
</style>
