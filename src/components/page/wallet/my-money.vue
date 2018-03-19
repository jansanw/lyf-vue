<style lang="scss" scoped>
    @import "../../../assets/config.scss";

    .yue-info {
        padding: 25px 15px 35px;
        background: $color-theme;
        color: #fff;

    }

    .yue-number {
        font-size: 28px;
        padding-top: 10px;
    }

    .yue-title {
        color: #888;
        font-size: 12px;
        padding: 15px;
    }

    .top-fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9;
    }

    .page-content {
        margin-top: 70px;
    }

    .list strong {
        float: right;
    }

    .red {
        color: #F23030;
    }
</style>

<template lang="html">
    <div class="page">
        <div class="top-fixed">
            <div class="yue-info hm-flex">
                <div class="hm-flex-4">
                    当前余额
                    <div class="yue-number">￥{{ balance.toFixed(2) }}</div>
                </div>
                <!--<div class="hm-flex-1" style="display: flex;align-items: flex-end ;">-->
                <!--<div class="aui-btn aui-btn-danger"-->
                <!--style="background: #fff !important;color:red !important;width: 100%;">提现-->
                <!--</div>-->
                <!--</div>-->
            </div>
        </div>
        <scroll class="page-content" :on-refresh="onRefresh" :on-infinite="onInfinite">
            <list v-for="(item, index) in list" :key="item.id">
                <item thin>
                    {{ item.subject }}
                    <!---->
                    <strong :class="{ 'red' : item.type % 2 }">￥：
                        {{ item.type % 2 ? '+' : '-' }}
                        {{ item.amount.toFixed(2) }}</strong>
                </item>
                <item>
                    [{{ channel[item.channel] }}] / {{ item.order_number }}
                    <br>
                    <br>
                    <!--交易号：-->
                    {{ item.trade_no }}
                    <span class="item-note">
                        {{ item.payment_time }}
                        <!--详情 <i class="icon ion-ios-arrow-right"></i>-->
                    </span>
                </item>
            </list>
            <div v-if="page >= pageCount" slot="infinite" class="text-center">没有更多数据</div>
        </scroll>
        <!--<div class="yue-title">余额明细</div>-->
    </div>

</template>
<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        data() {
            return {
                list: [],
                page: 1,
                pageCount: 0,
                channel: {wx_charge: '微信支付', ali_charge: '支付宝支付', wallet: '钱包支付', backend: '后台充值'}
            }
        },

        computed: {
            ...mapState({
                balance: state => state.common.balance,
            }),
        },

        mounted() {
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getData(() => {
                });
            })
        },

        methods: {
            getData(done) {
                this.$api.userAuthGet('/payment/page?page=' + this.page, rps => {
                    this.$api.responseFilter(rps.data, data => {
                        if (data.page === 1)
                            this.list = data.list;
                        else
                            data.list.map(item => {
                                this.list.push(item);
                            });
                        this.page++;
                        this.pageCount = data.pageCount;
                        done();
                    })
                })
            },
            onRefresh(done) {
                this.page = 1;
                this.list = [];
                this.getData(done);
            },

            onInfinite(done) {
                this.getData(done);
            },

            onItemClick(index) {
                console.log(index)
            }
        }
    }
</script>
