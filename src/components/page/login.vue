<style lang="css" scoped>
    .fx {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
    }

    .other-action .freeLogin.on .before.un-remember {
        background: white;
    }

    .normalInput {
        padding: 0 .2rem;
    }
</style>

<template lang="html">
    <div class="page has-navbar">
        <von-header class="fx">
            <button class="button button-icon ion-ios-arrow-back" slot="left" @click="$router.go(-1)"></button>
            <span slot="title">登录</span>
        </von-header>
        <div class="page-content" style="background:#ffffff;">
            <div class="wap-login">
                <ul id="login_switch" class="login-txt">
                    <li :class="{'active' : type == 1}" @click="type = 2">手机快捷登录</li>
                    <li :class="{'active' : type == 2}" @click="type = 2">账号登录</li>
                </ul>
                <form id="normal-logo" action="/user/login" method="post" enctype="application/x-www-form-urlencoded"
                      v-if="type == 2">
                    <input name="return_url" type="hidden" value="//m.juanpi.com/order">
                    <div class="login-info">
                        <ul class="info-input">
                            <li>
                                <input type="text" name="account" id="account" placeholder="手机号/邮箱/用户名" value=""
                                       class="normalInput" v-model="account">
                            </li>
                            <li>
                                <input type="password" name="password" id="password" placeholder="密码"
                                       class="normalInput" v-model="password">
                            </li>
                        </ul>
                        <a id="btn_login"
                           :class="{sub:true, 'disable-btn':!(account.length > 5 && password.length > 5)}"
                           rel="nofollow"
                           @click="login">登 录</a>
                        <div id="login_l" class="other-action">
                            <label class="freeLogin on" style="line-height:.99rem;">
                                <input type="checkbox" class="ck" name="auto" v-model="remember">
                                <i :class="{before:true, 'un-remember':!remember}"><img :src="lable_on"></i>两周内免登录
                            </label>
                        </div>
                    </div>
                </form>
                <form id="quick-login" action="/muser/password" method="post" v-if="type==1"
                      enctype="application/x-www-form-urlencoded">
                    <div class="login-info">
                        <ul class="info-input clear">
                            <li>
                                <input type="tel" pattern="[0-9]*" placeholder="手机号" id="mobile" name="mobile"
                                       class="normalInput">
                            </li>
                            <li>
                                <div class="quickLoginHmtl clear">
                                    <input type="tel" class="code-txt normalInput fl" id="code" placeholder="验证码"
                                           name="code">
                                    <a class="btn_get get-code disable-code" id="code_btn" href="javascript:;">获取验证码</a>
                                </div>
                            </li>
                        </ul>
                        <input type="hidden" name="mtoken" value="2dee9a13913334435eb81a6efd3e61ac" id="mtoken">
                        <input type="hidden" name="mtokenact" value="quick" id="mtokenact">
                        <a id="btn_quick_login" class="sub codeBtn disable-btn" rel="nofollow">登 录</a>
                        <a style="display:none;" id="normal_login" class="sub disable-btn" rel="nofollow">登 录</a>
                        <div id="quick_l" class="other-action">
                            <label class="freeLogin on" style="line-height:.99rem;">
                                <input type="checkbox" class="ck" name="auto_quick" checked="checked"><i class="before"><img
                                    :src="lable_on"></i>两周内免登录</label>
                        </div>
                    </div>
                </form>
                <div class="wap-app" v-if="isWechat && false">
                    <h3 class="third-txt">第三方账号快速登录</h3>
                    <div class="third-app clear">
                        <a class="wechat" href="/wechat/auth?targetUrl=/wechat/login">
                            <img src="../../assets/images/icon_wx.png">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "../../assets/user-login.scss";
    import Qs from 'Qs';

    export default {
        name: "login",
        data() {
            return {
                type: 2,
                account: '',//"18126417044",
                password: '',//"1234567",
                remember: false,
                lable_on: require("../../assets/images/label_on.png"),
                openId: ''
            }
        },
        mounted() {
            this.openId = this.$route.params.openId || false;
            if (this.isWechat && !this.openId)
                this.wechatAuth();
            this.$api.l_set('open_id', this.openId);
            // console.log(this.openId);
        },
        computed: {
            isWechat() {
                return /MicroMessenger/.test(window.navigator.userAgent);
            }
        },
        methods: {
            login() {
                $loading.show();
                this.$api.userGet("/user/login?" + Qs.stringify({
                    account: this.account,
                    password: this.password,
                    remember: this.remember
                }), rps => {
                    this.$api.responseFilter(rps.data, function (data) {
                        this.$api.l_set('token', data.token);
                        $router.replace(this.$api.s_get("login_back") || "home");
                    }.bind(this));
                });
            },
            wechatAuth() {
                window.location.href = "/wechat/auth?targetUrl=/wechat/login";
            }
        }
    }

</script>
