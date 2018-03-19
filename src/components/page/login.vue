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

    .get-code {
        right: 0;
        top: 0;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        color: #999;
    }

    #code_btn img {
        padding: 0;
        width: 90px;
        height: 34px;
        line-height: 34px;
        margin-right: 30px;
        vertical-align: middle;
    }

    .btn-code {
        border: 1px solid #ccc;
        padding: 8px 10px;
        border-radius: 4px;
    }

    .enable-code {
        color: #ff464e;
        border-color: #ff464e;
    }
</style>

<template lang="html">
    <div class="page has-navbar">
        <von-header class="fx">
            <button class="button button-icon ion-ios-arrow-back" slot="left" @click="$router.go(-1)"></button>
            <span slot="title">登 录</span>
        </von-header>
        <div class="page-content" style="background:#ffffff;">
            <div class="wap-login">
                <ul id="login_switch" class="login-txt">
                    <li :class="{'active' : type == 1}" @click="type = 1">手机快捷登录</li>
                    <li :class="{'active' : type == 2}" @click="type = 2" style="display: none">账号登录</li>
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
                           :class="{sub:true, 'disable-btn':!validate}"
                           rel="nofollow"
                           @click="validate && login()">登 录</a>
                        <div id="login_l" class="other-action">
                            <label class="freeLogin on" style="line-height:.99rem;">
                                <input type="checkbox" class="ck" name="auto" v-model="remember">
                                <i :class="{before:true, 'un-remember':!remember}"><img :src="lable_on"></i>两周内免登录
                            </label>
                        </div>
                    </div>
                </form>
                <form id="quick-login" method="post" v-if="type==1"
                      enctype="application/x-www-form-urlencoded">
                    <div class="login-info">
                        <ul class="info-input clear">
                            <li>
                                <input type="tel" pattern="[0-9]*" placeholder="手机号" name="mobile"
                                       class="normalInput" v-model="account">
                            </li>
                            <li>
                                <div class="quickLoginHmtl clear">
                                    <input type="tel" class="code-txt normalInput fl" placeholder="图形验证码"
                                           name="code" v-model="captcha">
                                    <a id="code_btn" href="javascript:;">
                                        <img class="btn-code get-code" id="captcha-code" :src="captchaSrc"
                                             @click="captchaImage()"/>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="quickLoginHmtl clear">
                                    <input type="tel" class="code-txt normalInput fl" id="code" placeholder="短信验证码"
                                           name="code" v-model="code" autocomplete="off">
                                    <a :class="{'btn-code':true, 'get-code':true, 'enable-code':validateCode}"
                                       @click="smsCode()">
                                        <template v-if="codeCountDown > 0">已发送({{codeCountDown}}s)</template>
                                        <template v-else>获取验证码</template>
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <a id="btn_quick_login" :class="{sub:true, codeBtn:true, 'disable-btn':!validate}"
                           rel="nofollow" @click="validate && login()">登 录</a>
                        <!--<a style="display:none;" id="normal_login" class="sub disable-btn" rel="nofollow">登 录</a>-->
                        <div id="quick_l" class="other-action">
                            <label class="freeLogin on" style="line-height:.99rem;">
                                <input type="checkbox" class="ck" name="auto" v-model="remember">
                                <i :class="{before:true, 'un-remember':!remember}"><img :src="lable_on"></i>两周内免登录
                            </label>
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
                type: 1,
                account: '',//"15889933997",
                password: '',//"123456",
                captcha: "",
                captchaId: "",
                captchaSrc: '',
                remember: false,
                lable_on: require("../../assets/images/label_on.png"),
                openId: '',
                code: '',
                codeCountDown: 0,
                interval: null
            }
        },
        mounted() {
            this.captchaImage();

            this.openId = this.$route.params.openId || '';
            if (this.isWechat && !this.openId)
                this.wechatAuth();
            this.$api.l_set('open_id', this.openId);
        },
        computed: {
            isWechat() {
                return /MicroMessenger/.test(window.navigator.userAgent);
            },
            validate() {
                if (!/^1((3|5|8){1}\d{1}|70)\d{8}$/.test(this.account))
                    return false;
                if (this.type === 1 && /\d{3,6}/.test(this.code))
                    return true;
                else if (this.type === 2 && this.password)
                    return true;
                return false;
            },
            validateCode() {
                if (!/^1((3|5|8){1}\d{1}|70)\d{8}$/.test(this.account))
                    return false;
                if (!/\d{3,6}/.test(this.captcha))
                    return false;
                if (this.codeCountDown > 0)
                    return false;
                return true;
            }
        },
        methods: {
            smsCode() {
                if (!this.validateCode || this.codeCountDown > 0)
                    return;
                this.codeCountDown = 60;
                $loading.show();
                this.$api.userGet("/sms_code?" + Qs.stringify({
                    template: "login",
                    mobile: this.account,
                    captcha_id: this.captchaId,
                    captcha: this.captcha
                }), rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.interval = setInterval(() => {
                            this.codeCountDown--;
                            if (this.codeCountDown <= 0)
                                clearInterval(this.interval);
                        }, 1000);
                    }, err => {
                        this.codeCountDown = 0;
                        this.captcha = '';
                    });
                });
            },
            login() {
                $loading.show();
                this.$api.userGet("/user/login?" + Qs.stringify({
                    account: this.account,
                    password: this.password,
                    remember: this.remember,
                    code: this.code
                }), rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.$api.l_set('token', data.token);
                        $router.replace(this.$api.s_get("login_back") || "home");
                    });
                });
            },
            wechatAuth() {
                window.location.href = "/wechat/auth?targetUrl=/wechat/login";
            },
            captchaImage() {
                this.$api.userGet('/captcha?width=100&height=30&size=17', rps => {
                    this.$api.responseFilter(rps.data, data => {
                        this.captchaId = data.id;
                        this.captchaSrc = data.captcha;
                        this.captcha = '';
                    })
                })
            }
        }
    }

</script>
