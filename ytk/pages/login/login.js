const api = require("../util/api.js");

Page({
    data: {
        ready: "",
        mode: {
            message: "t",
            password: "",
        },
        btn: true,
        login: true,
        user: {
            user: 0,
            password: 0
        },
        value: {
            tel: '',
            user: '',
            password: ''
        },
        tips: '未注册的手机号码验证后将自动创建账号',
        errors: '',
        eye: true
    },
    goUserRegisterAgreement: function () {
        swan.navigateTo({
            url: '/pages/login/userRegisterAgreement/userRegisterAgreement'
        });
    },
    goPrivacyPolicy: function () {
        swan.navigateTo({
            url: '/pages/login/privacyPolicy/privacyPolicy'
        });

    },
    onLoad: function () {

    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        var loginsuccess = swan.getStorageSync("loginsuccess");
        this.data.loginsuccess = loginsuccess.data;
        this.setData({
            "loginsuccess": loginsuccess.data
        });

        //我的页面
        if (this.data.loginsuccess) {
            var userinfo = swan.getStorageSync("userinfo");
            var params = { sessionid: userinfo.sessionid, uid: userinfo.uid, market: 'baiduapp_ytk' };
            var url = "/userInfo/findUserInfo";
            var that = this;
            api.sendPosts(params, url, function (res) {
                that.setData({ userInfo: res.userInfo, contact: res.contact });
            });
        }
    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    },
    ready(event) {

        if (event.detail.value.length == 11) {
            this.setData({
                ready: 'ready',
                btn: false
            })

        } else {
            this.setData({
                ready: '',
                btn: true
            })

        }
        this.setData({
            value: {
                tel: event.detail.value,
                user: this.data.value.user,
                password: this.data.value.password
            }
        })
    },
    cleantel(event) {
        this.setData({
            value: {
                tel: '',
                user: this.data.value.user,
                password: this.data.value.password
            }
        })
    },
    cleanuser(event) {
        this.setData({
            value: {
                tel: this.data.value.tel,
                user: "",
                password: this.data.value.password
            },
            user: {
                user: 0,
                password: this.data.user.password
            }
        })
    },
    cleanpassword(event) {
        this.setData({
            value: {
                tel: this.data.value.tel,
                user: this.data.value.user,
                password: ""
            },
            user: {
                user: this.data.user.user,
                password: 0
            }
        })
    },
    eye() {
        this.setData({
            eye: !this.data.eye
        })
    },
    passwordLogin() {
        this.setData({
            mode: {
                message: !this.data.mode.message,
                password: !this.data.mode.password,
            }
        })
    },
    messageLogin() {
        this.setData({
            mode: {
                message: !this.data.mode.message,
                password: !this.data.mode.password,
            }
        })
    },
    //手机验证码登陆
    verificationCode() {
        const pattern = /0?(13|14|15|18|17|19)[0-9]{9}/
        var tel = this.data.value.tel;
        if (pattern.test(tel)) {
            this.setData({
                errors: "",
                tips: '未注册的手机号码验证后将自动创建账号',
            })

            // 第一步获取sendsms_token
            var params = {
                ip: ""
            }
            var that = this;
            var url = "/userInfo/getrandom";
            //获取验证码
            api.sendPosts(params, url, function (res) {



                //验证码时间间隔判断
                var olddate = swan.getStorageSync("olddate");
                if (olddate != null && olddate != "") {
                    olddate = new Date(olddate);
                    var nowdate = new Date();
                    if (parseInt((nowdate.getTime() - olddate.getTime()) / 1000) < 60) {
                        swan.showToast({
                            title: '验证码60秒内，只能发送一次',
                            icon: 'none'
                        });
                        swan.navigateTo({
                            url: 'verification/verification?mobile=' +
                                tel + '&sendsms_token=' + res.sendsms_token
                        });
                        return;
                    }
                }

                //发送验证码
                if (res.errcode == "0") {
                    url = "/userInfo/sendsms";
                    params = {
                        sendsms_token: res.sendsms_token,
                        mobile: tel,
                        market: "baiduapp_ytk"
                    };
                    api.sendPosts(params, url, function (result) {
                        if (result.errcode == "0") {
                            var olddate = new Date();
                            swan.setStorageSync("olddate", olddate);

                            swan.showToast({
                                title: '验证码已发送到您的手机',
                                icon: 'none'
                            });
                            swan.navigateTo({
                                url: 'verification/verification?mobile=' +
                                    tel + '&sendsms_token=' +
                                    res.sendsms_token
                            });
                        } else if (result.errcode == "40001") {
                            swan.showToast({
                                title: result.errmsg,
                                icon: "none"
                            });
                            return;
                        } else {
                            swan.showToast({
                                title: result.errmsg,
                                icon: "none"
                            })
                            swan.navigateTo({
                                url: 'verification/verification?mobile=' +
                                    tel + '&sendsms_token+' +
                                    res.sendsms_token
                            });
                        }
                    });
                } else {
                    swan.showToast({
                        title: '验证码请求失败'
                    })
                }
            });

        } else {
            this.setData({
                tips: "手机号格式错误，请重新输入",
                ready: '',
                btn: true,
                errors: 'errors'
            })
        }
    },
    goindex() {
        //账户密码登陆
        var info = this.data.value;
        if ((info.password == null || info.password == "") &&
            (info.user == null || info.user == "")) {
            swan.showToast({
                title: '账户名和密码不能为空',
                icon: "none"
            });
            return;
        }
        url = "/userInfo/applogin";
        params = { pwd: info.password, user: info.user, from: 'baiduapp' };
        api.sendPosts(params, url, function (res) {
            if (res.errcode != 0) {
                swan.showToast({
                    title: res.errmsg,
                    icon: "none"
                });
                return;
            }
            var url = "/userInfo/refreshSession";
            params = { "sessionid": res.sessionid, "from": "baiduapp" };
            api.sendPosts(params, url, function () {

            });

            swan.setStorageSync("userinfo", res);
            swan.setStorageSync("loginsuccess", { data: true });
            getApp().globalData.timerName = setInterval(function () {
                var url = "/userInfo/refreshSession";
                params = { "sessionid": res.sessionid, "from": "baiduapp" };
                api.sendPosts(params, url, function () {

                });
            }, 2.5 * 1000 * 60 * 60)


            swan.reLaunch({
                url: '../index/index'

            });
        });

    },
    retrieve() {

        swan.navigateTo({
            url: '/pages/login/retrieve/retrieve'
        });
    },
    user(event) {
        this.setData({
            user: {
                user: event.detail.value.length,
                password: this.data.user.password,
            },
            value: {
                tel: this.data.value.tel,
                user: event.detail.value,
                password: this.data.value.password
            }
        })

    },
    password(event) {
        this.setData({
            user: {
                user: this.data.user.user,
                password: event.detail.value.length
            },
            value: {
                tel: this.data.value.tel,
                user: this.data.value.user,
                password: event.detail.value
            }
        })

    },
    inputUpdata(e) {
    },
    //我的页面
    listenerButton: function () {
        swan.showModal({
            title: "拨打客户电话",
            content: "400-660-1360",
            showCancel: true,
            confirmText: "立即拨打",
            confirmColor: "#FECC34",
            success: function (res) {
                if (res.confirm == true) {
                    swan.makePhoneCall({
                        phoneNumber: '400-660-1360',

                    });
                }
            }
        });

    }
});