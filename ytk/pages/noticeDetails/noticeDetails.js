const api = require("../util/api.js");
Page({
    data: {

    },
    onLoad: function (option) {
        // 监听页面加载的生命周期函数
        console.log("获取通知详情");
        var userinfo = swan.getStorageSync("userinfo");
        var noticeId=option.noticeId     //获取通知列表页面传过来的通知id；
        var params = {
            sessionid: userinfo.sessionid,
            uid: userinfo.uid,
            noticeId:noticeId
        };

        var url = "/notice/getNoticeDetail";
        var that = this;
        api.sendPosts(params, url, function (res) {
            console.log(params);
            that.setData({ "noticeInfo": res.noticeInfo });
            console.log("noticeInfo" + res);
         
        });
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function (options) {
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