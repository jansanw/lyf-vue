import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Vonic from 'vonic'

Vue.use(Vonic);
import BUS from './bus.js'

//popup插件.
import {
    Popup, Picker
} from 'mint-ui';

Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);


import 'lib-flexible/flexible'
import './assets/common.scss'
//图标
import './assets/icon/iconfont.css'

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    try: 3,
});

//路由 懒加载
// Page Components
let Index = resolve => require(['./components/Index'], resolve);
let Home = resolve => require(['./components/page/index/home.vue'], resolve);
let discovery = resolve => require(['./components/page/index/discovery.vue'], resolve);
let Cart = resolve => require(['./components/page/index/cart.vue'], resolve);
let User = resolve => require(['./components/page/index/user.vue'], resolve);
let ClassAll = resolve => require(['./components/page/index/category.vue'], resolve);
let goods_detail = resolve => require(['./components/page/mall/goods_detail.vue'], resolve);
let comment_list = resolve => require(['./components/page/mall/comment-list.vue'], resolve);
let catgoods = resolve => require(['./components/page/mall/catgoods.vue'], resolve);
let address = resolve => require(['./components/page/user/address.vue'], resolve);
let order_buynow = resolve => require(['./components/page/order/buy-now.vue'], resolve);
let order_list = resolve => require(['./components/page/order/order-list.vue'], resolve);
let order_detail = resolve => require(['./components/page/order/order-detail.vue'], resolve);
let order_logistics = resolve => require(['./components/page/order/order-logistics.vue'], resolve);
let order_rate = resolve => require(['./components/page/order/order-rate.vue'], resolve);
let order_pay_success = resolve => require(['./components/page/order/order-pay-success.vue'], resolve);
let store_home = resolve => require(['./components/page/mall/store_home.vue'], resolve);
let favorite = resolve => require(['./components/page/user/favorite.vue'], resolve);
let my_voucher = resolve => require(['./components/page/user/my-voucher.vue'], resolve);
let message_list = resolve => require(['./components/page/user/message-list.vue'], resolve);
let message_detail = resolve => require(['./components/page/user/message-detail.vue'], resolve);
let setting = resolve => require(['./components/page/user/setting.vue'], resolve);
let question_list = resolve => require(['./components/page/user/question-list.vue'], resolve);
let question_detail = resolve => require(['./components/page/user/question-detail.vue'], resolve);
let order_refund_start = resolve => require(['./components/page/order/order-refund-start.vue'], resolve);
let order_refund_return = resolve => require(['./components/page/order/order-refund-return.vue'], resolve);
let order_refund = resolve => require(['./components/page/order/order-refund.vue'], resolve);
let order_refund_list = resolve => require(['./components/page/order/order-refund-list.vue'], resolve);
let news_detail = resolve => require(['./components/page/news/news-detail.vue'], resolve);
let friend_list = resolve => require(['./components/page/user/friend-list.vue'], resolve);
let login = resolve => require(['./components/page/login.vue'], resolve);
let auth = resolve => require(['./components/page/auth.vue'], resolve);
let wallet = resolve => require(['./components/page/wallet/wallet.vue'], resolve);
let transaction_list = resolve => require(['./components/page/wallet/transaction-list.vue'], resolve);
let my_money = resolve => require(['./components/page/wallet/my-money.vue'], resolve);

// Routes
let routes = [{
    path: '/',
    redirect: '/home',
    component: Index,
    children: [
        {
            path: '/home',
            name: 'home',
            meta: {title: '首页'},
            component: Home
        },
        {
            path: 'discovery',
            name: 'discovery',
            meta: {title: '发现'},
            component: discovery
        },
        {
            path: 'category',
            name: "category",
            meta: {title: '全部分类'},
            component: ClassAll
        },
        {
            path: 'cart',
            name: 'cart',
            meta: {title: '购物车'},
            component: Cart
        },
        {
            path: 'user',
            name: 'user',
            meta: {title: '个人中心'},
            component: User
        },
        {
            path: '/goods/:id',
            name: 'goods_detail',
            meta: {title: '商品详情'},
            component: goods_detail
        },
        {
            path: '/comment-list/:id',
            name: 'comment_list',
            meta: {title: '买家口碑'},
            component: comment_list
        },
        {
            path: '/category/:category_id',
            name: 'catgoods',
            meta: {title: '分类'},
            component: catgoods
        },
        {
            path: '/address',
            name: 'address',
            meta: {title: '收货地址'},
            component: address
        },
        {
            //（购物车，快速购买）下单第一步  参数格式  :cart_id（产品ID|购买数量）  :ifcart  (true or false) 是否从购物车
            path: '/order_buynow/:goods-:is_cart',
            name: 'order_buynow',
            meta: {title: '下单'},
            component: order_buynow
        },
        {
            path: '/order-list/:type',
            name: 'order_list',
            meta: {title: '订单列表'},
            component: order_list
        },
        {
            path: '/order-detail/:order_id',
            name: 'order_detail',
            meta: {title: '订单详情'},
            component: order_detail
        },
        {
            path: '/order-logistics/:order_id',
            name: 'order_logistics',
            meta: {title: '物流详情'},
            component: order_logistics
        },
        {
            path: '/order-rate/:order_id',
            name: 'order_rate',
            meta: {title: '订单评价'},
            component: order_rate
        },
        {
            path: '/order-refund-start/:order_id/:goods_id',
            name: 'order_refund_start',
            meta: {title: '选择退款/退货'},
            component: order_refund_start
        },
        {
            path: '/order-refund-return/:return_id',
            name: 'order_refund_return',
            meta: {title: '上传退货快递单号'},
            component: order_refund_return
        },
        {
            path: '/order-refund/:order_id/:goods_id',
            name: 'order_refund',
            meta: {title: '申请退款/退货'},
            component: order_refund
        },
        {
            path: '/order-refund-list',
            name: 'order_refund_list',
            meta: {title: '退款列表'},
            component: order_refund_list
        },
        {
            path: "/order-pay-success/:pay_sn",
            name: "order_pay_success",
            meta: {title: '支付成功'},
            component: order_pay_success
        },
        {
            path: '/store/:store_id',
            name: 'store_home',
            meta: {title: '商家首页'},
            component: store_home
        },
        {
            path: '/login',
            name: 'login',
            meta: {title: '登录'},
            component: login
        },
        {
            path: '/auth/:token',
            name: 'auth',
            meta: {title: '授权'},
            component: auth
        },
        {
            path: '/favorite',
            name: 'favorite',
            meta: {title: '收藏夹'},
            component: favorite
        },
        {
            path: '/my-voucher',
            name: 'my_voucher',
            meta: {title: '我的优惠券'},
            component: my_voucher
        },
        {
            path: '/message',
            name: 'message_list',
            meta: {title: '我的消息'},
            component: message_list
        },
        {
            path: '/message/:id',
            name: 'message_detail',
            meta: {title: '消息详情'},
            component: message_detail
        },
        {
            path: '/setting',
            name: 'setting',
            meta: {title: '设置'},
            component: setting
        },
        {
            path: '/question',
            name: 'question_list',
            meta: {title: '常见问题'},
            component: question_list
        },
        {
            path: '/question/:id',
            name: 'question_detail',
            meta: {title: '问题详情'},
            component: question_detail
        },
        {
            path: '/news/:id',
            name: 'news_detail',
            meta: {title: '资讯详情'},
            component: news_detail
        },
        {
            path: '/friend-list/:id',
            name: 'friend_list',
            meta: {title: '好友列表'},
            component: friend_list
        },
        {
            path: '/wallet',
            name: 'wallet',
            meta: {title: '我的钱包'},
            component: wallet
        },
        {
            path: '/transaction-list/:id',
            name: 'transaction_list',
            meta: {title: '交易明细'},
            component: transaction_list
        },
        {
            path: '/my-money',
            name: 'my_money',
            meta: {title: '我的余额'},
            component: my_money
        },
    ]
},];
//******************************//
import sess from './api/sess'

Vue.prototype.$sess = sess;
let beforeEach = (toRoute, fromRoute, next) => {
    let to = toRoute.path;
    let from = fromRoute.path;
    let scrollTop = Vonic.app.pageContentScrollTop();

    let h = sess.get(to);
    if (h && h.history) {
        Vonic.app.nextDirection(''); //back
        h.history = true;
        sess.set(to, h)
    } else {
        sess.set(from || '/', {
            history: true,
            scrollTop: scrollTop
        });
        Vonic.app.nextDirection('') //forward
    }
    next()
};
let afterEach = (toRoute, fromRoute) => {
    let to = toRoute.path;
    let from = fromRoute.path;
    let h = sess.get(to);
    if (h && h.scrollTop) {
        Vue.nextTick(() => {
            Vonic.app.pageContentScrollTop(h.scrollTop)
        })
    }
    //修改页面标题为路由标题
    document.title = toRoute.meta.title ? toRoute.meta.title + '-' + TITLE : TITLE;
    //console.log('toRoute.title=',toRoute.meta.title)
};
Vonic.app.setConfig('beforeEach', beforeEach);
Vonic.app.setConfig('afterEach', afterEach);

//注册全局方法
import api from './api/methods'

Vue.prototype.$api = api;

//过滤器
import filters from './api/filter'
import store from './store'

Vue.use(Vonic.app, {
    store,
    routes
});
