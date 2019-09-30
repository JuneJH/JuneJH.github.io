const api = require("../../util/api.js")
Page({
    data: {
        length: 0,
        existUser: false,

    },

    onShow: function () {
        this.setData({ existUser: false });
    },

    tel(event) {
        this.setData({
            length: event.detail.cursor,
            tel: event.detail.value
        })
    },
    btn() {
        var params = {
            username: this.data.tel
        };
        var url = "/findPwd/finduser";
        var that = this;

        api.sendPosts(params, url, function (res) {
            if (res.errcode == "0") {
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
                            url: '../verification/verification?infoid=' + res.infoid +
                                "&yzmtype=255"
                        });
                        return;
                    }
                }




                url = "/findPwd/sendinfo";
                params = {
                    type: "1",
                    infoid: res.infoid,
                    market: "baiduapp_ytk"
                }


                api.sendPosts(params, url, function (result) {


                    if (result.errcode == "0") {
                        var olddate = new Date();
                        swan.setStorageSync("olddate", olddate);
                        swan.showToast({
                            title: '验证码已发送到您的手机',
                            icon: 'none'
                        });

                        swan.navigateTo({
                            url: '../verification/verification?infoid=' + res.infoid +
                                "&yzmtype=255"
                        });
                    } else {
                        swan.showToast({
                            title: result.errmsg,
                            icon: 'none'
                        });
                    }
                });
            } else if (res.errcode == "40027") {
                //账号不存在
                that.setData({
                    "existUser": true
                })
            } else {
                swan.showToast({
                    title: '重置密码请求验证码失败',
                    icon: 'none'
                });
            }
        });

    }
});