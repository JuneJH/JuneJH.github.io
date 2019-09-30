const api = require("../../util/api.js")
Page({
    data: {
    },
    onLoad: function (e) {
        console.log(e);
        this.data.infoid = e.infoid;
    },
    password(e) {
        console.log(e)
        this.data.newpassword = e.detail.value;
        this.setData({length:e.detail.cursor});
    },
    comit(e) {
        var params = {
            infoid: this.data.infoid,
            newpwd: this.data.newpassword
        };
        console.log(params);
        var url = "/findPwd/resetpwd";
        api.sendPosts(params, url, function (res) {
            if (res.errcode == 0) {
                swan.showToast({
                    title: "新密码设置成功",
                    icon: "none"
                });
                swan.switchTab({
                    url: "../login"
                });
            } else {
                swan.showToast({
                    title: res.errmsg,
                    icon: "none"
                });
                swan.navigateBack({
                    url: "../retrieve/retrieve"
                });
            }
        });
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
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
    }
});