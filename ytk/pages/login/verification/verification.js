const api = require("../../util/api.js");

Page({
    data: {
        time: 60,
        timer: '',
        obtain: false
    },
    sendotp() {
        //重置密码    重新获取验证码
        if (this.data.yzmtype == 255) {
            //修改密码验证码判断
            url = "/findPwd/sendinfo";
            params = {
                type: 1,
                infoid: this.data.infoid,
                market: "baiduapp_ytk"
            }
            var that = this;
            api.sendPosts(params, url, function (result) {
                if (result.errcode == "0") {
                    swan.showToast({
                        title: '验证码已发送到您的手机',
                        icon: 'none'
                    });
                    //需要重新启动定时器
                    that.setData({
                        time: 60
                    })
                    var olddate = new Date();
                    swan.setStorageSync("olddate", olddate);
                    that.setData({
                        timer: setInterval(() => {
                            that.countDown();
                        }, 1000),
                        obtain: !that.data.obtain
                    })
                } else {
                    swan.showToast({
                        title: '60秒内只能一次验证码'
                    });
                }
            });
            return;
        }

        //登陆     重新获取验证码
        var url = "/userInfo/sendsms";
        var params = {
            sendsms_token: this.data.sendsms_token,
            mobile: this.data.mobile,
            market: "baiduapp_ytk"
        };
        var that = this;
        api.sendPosts(params, url, function (res) {
            if (res.errcode == "0") {
                swan.showToast({
                    title: '验证码已发送',
                    icon: 'none'
                });

                //需要重新启动定时器
                that.setData({
                    time: 60
                });
                var olddate = new Date();
                swan.setStorageSync("olddate", olddate);
                that.setData({
                    timer: setInterval(() => {
                        that.countDown();
                    }, 1000),
                    obtain: !that.data.obtain
                })
            } else {
                //验证码发送失败
                swan.showToast({
                    title: res.errmsg,
                    icon: "none"
                });
            }
        });

    },
    //验证码登陆
    login(e) {
        console.log(e);
        var length = e.detail.cursor;
        var yzm = e.detail.value;
        if (this.data.yzmtype == 255) {
            //修改密码验证码判断
            if (length == 6) {
                var url = "/findPwd/checkcode";
                var params = {
                    code: yzm,
                    infoid: this.data.infoid
                }
                var that = this;
                console.log(params);
                api.sendPosts(params, url, function (res) {
                    console.log(res);
                    if (res.errcode == "0") {
                        console.log("res.errcode == 0");
                        console.log(that.data.infoid);
                        swan.redirectTo({
                            url: '../newpassword/newpassword?infoid=' + that.data.infoid
                        });

                    } else {
                        swan.showToast({
                            title: res.errmsg,
                            icon: "none"
                        });
                    }
                    console.log(res.errcode);
                });
            }
            return;
        }
        //手机登录验证码判断


        if (length == 6) {
            var url = "/userInfo/checksms";

            try {
                const resultSync = swan.getSystemInfoSync();

                this.data.model = resultSync.model;
                this.data.system = resultSync.system;
            } catch (e) {
                console.log('getSystemInfoSync fail', e);
            }
            console.log(this.data.model);
            var params = {
                mobile: this.data.mobile,
                "from": "baiduapp",
                market: "baiduapp_ytk",
                "yzm": yzm,
                "mobiletype": this.data.model,
                "mobileos": this.data.system
            };
            api.sendPosts(params, url, function (res) {
                if (res.errcode == "0") {
                    //手机验证码验证成功
                    swan.setStorageSync("loginsuccess", { data: true });
                    swan.setStorageSync("userinfo", res);
                    getApp().globalData.timerName = setInterval(function () {
                        var url = "/userInfo/refreshSession";
                        params = { "sessionid": res.sessionid, "from": "baiduapp" };
                        api.sendPosts(params, url, function () {
                        })
                    }, 2.5 * 1000 * 60 * 60);

                    var url = "/userInfo/refreshSession";
                    params = { "sessionid": res.sessionid, "from": "baiduapp" };
                    api.sendPosts(params, url, function () {
                    });


                    swan.reLaunch({
                        url: '../../index/index'
                    });
                } else {
                    swan.showToast({
                        title: '验证码错误',
                        icon: "none"
                    });
                }
            });
        }




    },
    //倒计时
    countDown() {
        if (this.data.time == 0) {
            clearInterval(this.data.timer);
            this.setData({
                obtain: !this.data.obtain
            })
            return;
        }
        this.setData({
            time: this.data.time - 1
        })
    },
    onLoad: function (e) {
        //设置计时器初始时间
        var olddate = swan.getStorageSync("olddate");
        if (olddate != null && olddate != "") {
            var nowdate = new Date();
            olddate = new Date(olddate)
            var time = 60 - (nowdate.getTime() - olddate.getTime()) / 1000
            time = parseInt(time)
            if (time <= 60) {
                this.data.time = time
            }
        }


        if (e.yzmtype == 255) {
            this.data.yzmtype = e.yzmtype;
            this.data.infoid = e.infoid;
            return;
        }

        this.data.mobile = e.mobile;
        this.data.sendsms_token = e.sendsms_token;


    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {

        this.setData({
            timer: setInterval(() => {
                this.countDown();
            }, 1000)
        })




        // 监听页面显示的生命周期函数

    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        clearInterval(this.data.timer);
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

});