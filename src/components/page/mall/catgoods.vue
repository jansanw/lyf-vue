<template lang="html">
    <div class="page">
        <!--固定不动的元素 要放到page-content的外面-->
        <div class="download-app">
            <i class="iconfont icon-houtui2" @click="goback"></i>
        </div>
        <div class="topbar">
            <div ref="list_top_menu" class="top-menu aui-border-b hm-flex-1">
                <ul ref="list_top_menu_list" class="top-menu-list" :style="'width:'+m_w+'px'">
                    <!--:style="'width:'+m_w+'px'"-->
                    <li ref="list_top_menu_item" class="top-menu-item" :class="index == active ? 'active' : ''"
                        v-for="(item,index) in category" @click="changeMenu(index,item.id)">{{item.name}}
                    </li>
                </ul>
            </div>
            <a class="search-btn J_search-btn  aui-border-b" @click="go_search()">
                <i class="iconfont icon-sousuo"></i>
            </a>
        </div>
        <scroll ref="lyf_scroll" class="index-scroll page-content" style="top: 1.07rem;" :on-infinite="onInfinite"
                v-show="page_show">
            <div class="goods-list clear">
                <div class="hm-list hm-flex" style="flex-wrap:wrap">
                    <div style="width: 49.4%;margin:0.3%;background: #fff;" v-for="item in goods">
                        <div class="hm-list-item" style="padding:0" @click="goodsClick(item.id)">
                            <div class="hm-list-inner" style="padding:0">
                                <img v-lazy="item.cover" style="width: 100%;">
                                <div style="padding:.13rem .08rem .13rem .08rem;">
                                    <div class="hm-list-title-2 goods-name"
                                         style=" height:1.17rem; line-height:.59rem; font-size:.37rem; color:#333;">
                                        {{item.name}}
                                    </div>
                                    <div class="hm-list-price hm-flex"
                                         style=" margin-top:.07rem;justify-content: space-between;">
                                        <div class="" style="color: #ee2e3a;font-weight: 700;">
                                            <!--<span>￥<b><big style="font-size:.48rem;">{{item.goods_price}}</big></b></span>-->
                                            <span>￥
                                                <b><strong
                                                        style="font-size:.48rem;">{{item.price|price_yuan}}</strong></b>
                                                {{item.price|price_jiao}}
                                            </span>
                                        </div>
                                        <div class="hm-color-gray" style="color:#9c9c9c;">
                                            <small>已售</small>
                                            {{item.sale}}
                                            <small>件</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!load_more" slot="infinite" @click="goLoad" class="text-center">{{more_data}}</div>
        </scroll>

    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import scroll from '../../layout/scroll.vue';
    import {
        mapState,
        mapActions
    } from 'vuex'

    export default {
        name: "catgoods",
        components: {
            scroll
        },
        data() {
            return {
                category: [],
                goods: [],
                m_w: 0,
                page: 1,
                is_load: false,
                load_more: true,
                more_data: '-- 没有更多了 --',
                page_show: false,
                list_top_menu: null,
            }
        },
        computed: {
            ...mapState({
                cat_goods_list_class_id: state => state.common.cat_goods_list_class_id,
                cat_goods_list_class_init_menu: state => state.common.cat_goods_list_class_init_menu,
                active: state => state.common.cat_goods_list_class_active,
            }),
        },
        watch: {
            cat_goods_list_class_id: function (val, oldVal) {
                if (val !== oldVal) {
                    this.page = 1;
//        this.m_w = 0
                    this.load_more = true;
                    this.page_show = false;
                    this.$refs.lyf_scroll.setscrollTop(0);
                    $loading.show();
                    // this.getData(() => {
                    //
                    // })
                }
            }
        },
        mounted() {
            this.category_id = this.$route.params.category_id;
            if (this.category_id > 0) {
                this.$store.commit('UPDATE_COMMON_DATA', {
                    cat_goods_list_class_id: this.category_id
                })
            }
            // this.getData(() => {
            // })
        },
        methods: {
            getData(done) {
                this.is_load = true;
                this.$api.userGet('goods/page_goods_category?categoryId='
                    + this.cat_goods_list_class_id + '&page=' + this.page + '&category='
                    + (!this.cat_goods_list_class_init_menu ? 1 : 0), rps => {
                    this.$api.responseFilter(rps.data, data => {
                        if (data.goods.page == 1) {
                            if (!this.cat_goods_list_class_init_menu) {
                                this.category = data.category;
                            }
                            this.goods = data.goods.list;
                        } else {
                            for (let index in data.goods.list) {
                                this.goods.push(data.goods.list[index])
                            }
                        }
                        if (this.page === data.goods.pageCount || data.goods.count === 0) {
                            this.load_more = false
                        }

                        this.$nextTick(() => {
                            if (!this.cat_goods_list_class_init_menu) {
                                this._initScroll();
                                this._setMenuW();
                                this.$store.commit('UPDATE_COMMON_DATA', {
                                    cat_goods_list_class_init_menu: true
                                })
                            }
                            $loading.hide();
                            done();
                            this.$refs.lyf_scroll.infiniteDone();
                            this.is_load = false;
                            this.page_show = true
                        })
                    });
                }, error => {
                    $toast.show(error.message);
                    this.$refs.lyf_scroll.infiniteDone();
                    this.is_load = false;
                    this.load_more = false;
                    this.more_data = "加载失败，点击重新加载"
                })
            },
            _initScroll() {
                if (this.list_top_menu) {
                    this.list_top_menu.refresh()
                } else {
                    this.list_top_menu = new BScroll(this.$refs.list_top_menu, {
                        startX: 0,
                        startY: 0,
                        scrollX: true,
                        click: true
                    })
                }
            },
            _setMenuW() {
                let items = this.$refs.list_top_menu_item;
                let a = 0;
                for (let index in items) {
                    a = a + items[index].clientWidth
                }
                this.m_w = a;
                this.$nextTick(() => {
                    this._initScroll()
                })
            },
            changeMenu(index, category_id) {
                if (this.active == index)
                    return;
                this.$store.commit('UPDATE_COMMON_DATA', {
                    cat_goods_list_class_id: category_id,
                    cat_goods_list_class_active: index
                });
                this.page = 1;
                this.is_load = false;
                this.load_more = true;
                this.more_data = "没有更多数据";
                $loading.show("加载中");
                this.getData(() => {
                    $loading.hide();
                    this.$refs.lyf_scroll.setscrollTop(0)
                })

            },
            goLoad() {
                if (this.is_load || !this.load_more) return;
                $loading.show('拼命加载中..');
                this.more_data = "没有更多数据";
                this.load_more = true;
                this.getData(() => {
                })
            },
            onInfinite(done) {
                if (this.is_load || !this.load_more) return;
                this.page = this.page + 1;
                this.getData(done)
            },
            goodsClick(id) {
                $router.push({
                    name: 'goods_detail',
                    params: {
                        id: id,
                    }
                });
            },
            go_search() {
                $router.push({
                    name: 'category',
                    params: {
                        show_search: 0,
                    }
                });
            },
            goback() {
                this.$router.go(-1)
            },
        },
        beforeRouteEnter(to, from, next) {
            console.log('catgoods beforeRouteEnter from=', from.name);
            next(vm => {
                //从首页进入则要刷新分类
                if (from.name == 'home') {
                    console.log('cat_goods_list_class_init_menu: false');
                    vm.$store.commit('UPDATE_COMMON_DATA', {
                        cat_goods_list_class_init_menu: false
                    })
                }
                vm.category_id = vm.$route.params.category_id;
                if (vm.category_id > 0) {
                    vm.$store.commit('UPDATE_COMMON_DATA', {
                        cat_goods_list_class_id: vm.category_id
                    })
                }
                vm.getData(() => {
                });
                //清零active
                vm.$store.commit('UPDATE_COMMON_DATA', {
                    cat_goods_list_class_active: 0
                })
            })
        }
    }
</script>

<style lang="scss">
    .search-btn {
        line-height: 1.07rem;
        padding: 0 0.27rem;
        text-align: center;
        display: inline-block;
    }

    .search-btn i {
        font-size: 0.59rem;
        color: #333;
    }

    .goods-list {
        width: 10rem;
    }

    .goods-list .goods-item {
        width: 5rem;
        float: left;
    }

    .goods-list .goods-item .goods-item-image img {
        width: 100%;
    }

    .goods-item-content {
        background: #ffffff;
    }

    .goods-item-l {
        margin-right: 0.05rem;
        margin-top: 0.05rem;
    }

    .goods-item-r {
        margin-left: 0.05rem;
        margin-top: 0.05rem;
    }

    .goods-name {
        overflow: hidden;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .download-app {
        padding-top: 1.11rem;
        height: 1.28rem;
        background-color: transparent;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        vertical-align: middle;
        display: block;
        i {
            display: block;
            float: left;
            color: #fff;
            background: rgba(0, 0, 0, 0.3);
            margin: 0.13rem 0.27rem;
            font-size: 0.48rem;
            width: 0.85rem;
            height: 0.85rem;
            line-height: 0.85rem;
            border-radius: 50%;
            text-align: center;
            z-index: 100;
        }
    }
</style>
