import axios from 'axios';

axios.defaults.baseURL = HOST + '/api/';
export default {
    //http
    userGet(url, cb, error) {
        axios.get(url).then(res => {
            cb(res)
        }).catch(err => {
            // error(err)
            this.errorFilter(err, error);
        });
    },
    userPost(url, data, cb, error) {
        axios.post(url, data).then(res => {
            cb(res)
        }).catch(err => {
            // error(err)
            this.errorFilter(err, error);
        });
    },
    //判断登录的请求
    userAuthGet(url, cb, error) {
        if (this.ck_login()) {
            axios.get(url, {
                headers: {
                    'Authorization': this.l_get("token")
                }
            }).then(res => {
                // if (res.data.status_code <= -10000) {
                //     $toast.show("登录信息已过期");
                //     this.l_remove("token");
                //     this.ck_login()
                // }
                cb(res);
            }).catch(err => {
                // $loading.hide();
                //TODO 判断是否登录
                // error(err)
                this.errorFilter(err, error);
            });
        } else {
            $toast.show("未登录");
            return false;
        }
    },
    userAuthPost(url, data, cb, error) {
        if (this.ck_login()) {
            axios.create({
                headers: {
                    'Authorization': this.l_get("token")
                }
            }).post(url, data).then(res => {
                // if (res.data.status_code <= -10000) {
                //     $toast.show("登录信息已过期");
                //     this.l_remove("token");
                //     this.ck_login()
                // }
                cb(res)
            }).catch(err => {
                // $loading.hide();
                //TODO 判断是否登录
                // error(err)
                this.errorFilter(err, error);
            });
        } else {
            $toast.show("未登录");
            return false;
        }
    },
    //json输出默认弹出消息和动作
    responseFilter(data, success, error) {
        // console.log(data);
        if (Object.prototype.toString.call(data) !== "[object Object]") {
            $dialog.alert({
                content: "数据异常，请联系管理员",
                okTheme: 'assertive'
            });
            if (this.is_function(error))
                error(data);
        }

        switch (data.react.type) {
            case "tip": {
                if (data.msg)
                    $toast.show(data.msg);
                // if (data.react.url)
                // setTimeout(function () {
                //     window.location.href = data.react.url;
                // }, 1500);
                break;
            }
            case "alert": {
                if (data.msg)
                    $dialog.alert({
                        content: data.msg,
                    }).then(() => {
                        // if (data.react.url)
                        //     window.location.href = data.react.url;
                    });
                break;
            }
        }

        // if (data.react.__token__)
        //     window.__token__ = data.react.__token__;
        //执行回调
        if (data.code === 0/* && data.data && data.data.length*/ && this.is_function(success))
            success(data.data, data.msg);
        else if (data.code !== 0 && this.is_function(error))
            error(data);
    },
    errorFilter(error, err) {
        $loading.hide();
        console.log(error.response);
        if (error.response.status && error.response.status === 401) {
            $toast.show("登录信息已过期");
            this.l_remove("token");
            this.ck_login()
        } else if (this.is_function(err)) {
            err(error.response);
        } else {
            $dialog.alert({content: "网络异常，请重试"});
        }
    },
    is_function(func) {
        return Object.prototype.toString.call(func) === '[object Function]';
    },
    ck_login() {
        let token = this.l_get("token");
        if (!token) {
            $loading.hide();
            //记录登录前地址
            this.s_set("login_back", window.location.hash.replace(/#/g, ''));
            // let login_url = "http://lyf.aoyi.com/home/wx/login_v2?back=" + encodeURIComponent("http://" + window.location.host + "/#/auth");
            // login_url
            // window.location.href = "/#/login";
            $router.replace("/login");
            return false
        } else {
            return true
        }
    },
    //session
    s_get(name) {
        let value = sessionStorage.getItem(name);
        if (/^(\{.*\})|(\[.*\])$/.test(value)) value = JSON.parse(value);
        return value
    },
    s_set(name, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value);
        return sessionStorage.setItem(name, value)
    },
    remove(name) {
        return sessionStorage.removeItem(name)
    },
    l_get(name) {
        let value = localStorage.getItem(name);
        if (/^(\{.*\})|(\[.*\])$/.test(value)) value = JSON.parse(value);
        return value
    },
    l_set(name, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value);
        return localStorage.setItem(name, value)
    },
    l_remove(name) {
        return localStorage.removeItem(name)
    },
    //fanction
    fmoney(s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        let l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        let t = "";
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
        }
        return '<span class="major" >' + t.split("").reverse().join("") + "</span><span class='point'>.</span><span class='minor'>" + r + "</span>";
    },
    isCon(arr, val) { //检测数组是否存在某个值
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === val)
                return true;
        }
        return false;
    },
    unique_arr(data) {
        data = data || [];
        let a = {};
        let len = data.length;
        for (let i = 0; i < len; i++) {
            let v = data[i];
            if (typeof(a[v]) === 'undefined') {
                a[v] = 1;
            }
        }
        data.length = 0;
        for (let i in a) {
            data[data.length] = i;
        }
        return data;
    }
}
